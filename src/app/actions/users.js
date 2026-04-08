'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Helper for checking auth and roles
async function checkAuth(allowedRoles = ['ADMIN']) {
  const session = await getServerSession(authOptions);
  if (!session || !allowedRoles.includes(session.user.role)) {
    throw new Error('Unauthorized access');
  }
  return session;
}

export async function getUsers() {
  try {
    await checkAuth(['ADMIN']); // Only ADMIN can view all users
    
    // Fetch users but exclude passwords
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return users;
  } catch (error) {
    console.error('Get users error:', error);
    return [];
  }
}

export async function updateUserRole(userId, newRole) {
  try {
    const session = await checkAuth(['ADMIN']); // Only ADMIN can change roles
    
    // Prevent admin from downgrading themselves to avoid lockout
    if (session.user.id === userId && newRole !== 'ADMIN') {
      return { success: false, error: 'You cannot remove your own ADMIN role.' };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Update user role error:', error);
    return { success: false, error: 'Failed to update user role.' };
  }
}

export async function deleteUser(userId) {
  try {
    const session = await checkAuth(['ADMIN']); // Only ADMIN can delete users
    
    // Prevent admin from deleting themselves
    if (session.user.id === userId) {
      return { success: false, error: 'You cannot delete your own account.' };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Delete user error:', error);
    return { success: false, error: 'Failed to delete user.' };
  }
}
