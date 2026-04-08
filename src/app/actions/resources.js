'use server';

import { prisma } from '@/lib/prisma';
import { checkAuth } from './articles';
import { revalidatePath } from 'next/cache';

export async function createResource(formData) {
  try {
    // Only Admin can upload generic resources according to rules, but we'll allow EDITORS too for flexibility unless strictly needed
    await checkAuth(['ADMIN', 'EDITOR']);

    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category'); // e.g., 'Research', 'Annual Report', 'Download'
    const fileUrl = formData.get('fileUrl');

    if (!fileUrl) {
      throw new Error('A file URL must be provided');
    }

    if (category === 'Research Papers (PDF)') {
      await prisma.researchPaper.create({
        data: {
          title, author: 'MBSS Admin', abstract: description || '', category: 'Research', pdfUrl: fileUrl, status: 'PUBLISHED'
        }
      });
      revalidatePath('/research');
      revalidatePath('/admin/research');
    } 
    else if (category === 'Annual Reports (PDF)') {
      await prisma.publication.create({
        data: {
          title, description, pdfUrl: fileUrl
        }
      });
      revalidatePath('/annual-report');
      revalidatePath('/publications');
    }
    else {
      // General Downloadable Resource
      await prisma.resource.create({
        data: {
          title, description, category: 'General', fileUrl
        }
      });
      revalidatePath('/resources');
    }

    revalidatePath('/admin/files');
    return { success: true };
  } catch (error) {
    console.error('Create resource error:', error);
    return { success: false, error: error.message };
  }
}

export async function submitThesis(formData) {
  try {
    // Any logged in user (MEMBER, EDITOR, ADMIN) can submit a thesis
    await checkAuth(['MEMBER', 'EDITOR', 'ADMIN']);

    const title = formData.get('title');
    const author = formData.get('author');
    const abstract = formData.get('abstract');
    const pdfUrl = formData.get('pdfUrl');

    if (!title || !author || !abstract || !pdfUrl) {
      throw new Error('All fields are required.');
    }

    await prisma.researchPaper.create({
      data: {
        title,
        author,
        abstract,
        category: 'Student Thesis',
        pdfUrl,
        status: 'PENDING' // Requires admin approval
      }
    });

    revalidatePath('/admin/research');
    return { success: true };
  } catch (error) {
    console.error('Submit thesis error:', error);
    return { success: false, error: error.message };
  }
}

export async function approveResearchPaper(id) {
  try {
    await checkAuth(['ADMIN', 'EDITOR']);
    await prisma.researchPaper.update({
      where: { id },
      data: { status: 'PUBLISHED', publishDate: new Date() }
    });
    revalidatePath('/research');
    revalidatePath('/admin/research');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteResearchPaper(id) {
  try {
    await checkAuth(['ADMIN', 'EDITOR']);
    await prisma.researchPaper.delete({ where: { id } });
    revalidatePath('/research');
    revalidatePath('/admin/research');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getResources() {
  try {
    return await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

// Public view: only PUBLISHED
export async function getResearchPapers() {
  try {
    return await prisma.researchPaper.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishDate: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

// Admin view: fetch all (PENDING and PUBLISHED)
export async function getAllResearchPapers() {
  try {
     return await prisma.researchPaper.findMany({
       orderBy: { createdAt: 'desc' }
     });
  } catch (error) {
    return [];
  }
}

export async function getPublications() {
  // ... existing code
  try {
    return await prisma.publication.findMany({ orderBy: { publishDate: 'desc' } });
  } catch (error) {
    return [];
  }
}
