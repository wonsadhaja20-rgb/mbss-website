'use server';

import { prisma } from '@/lib/prisma';
import slugify from 'slugify';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export async function checkAuth(allowedRoles = ['ADMIN', 'EDITOR']) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error('Unauthorized: You must be logged in.');
  }
  
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Forbidden: Insufficient permissions to perform this action.');
  }
  
  return session;
}

export async function createArticle(formData) {
  try {
    await checkAuth(['ADMIN', 'EDITOR']);

    const title = formData.get('title');
    const author = formData.get('author');
    const category = formData.get('category');
    const content = formData.get('content');
    const featuredImage = formData.get('featuredImage') || null;
    
    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        author,
        category,
        content,
        featuredImage,
        status: 'PUBLISHED',
      },
    });

    revalidatePath('/');
    revalidatePath('/articles');
    
    return { success: true, article };
  } catch (error) {
    console.error('Create article error:', error);
    return { success: false, error: error.message };
  }
}

export async function getArticles(query = '', filterCategory = 'All') {
  try {
    const whereClause = {
      status: 'PUBLISHED'
    };

    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { content: { contains: query } },
        { author: { contains: query } }
      ];
    }

    if (filterCategory && filterCategory !== 'All') {
      whereClause.category = filterCategory;
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      orderBy: { publishDate: 'desc' },
    });
    return articles;
  } catch (error) {
    console.error('Get articles error:', error);
    return [];
  }
}

export async function getArticleBySlug(slug) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug }
    });
    return article;
  } catch (error) {
    return null;
  }
}

export async function deleteArticle(id) {
  try {
    await checkAuth(['ADMIN', 'EDITOR']);
    await prisma.article.delete({ where: { id } });
    revalidatePath('/articles');
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
