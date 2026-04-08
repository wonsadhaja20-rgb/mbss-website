'use server';

import { prisma } from '@/lib/prisma';
import { checkAuth } from './articles'; // Reuse auth checker
import { revalidatePath } from 'next/cache';

export async function createEvent(formData) {
  try {
    await checkAuth(['ADMIN', 'EDITOR']);

    const title = formData.get('title');
    const description = formData.get('description');
    const dateStr = formData.get('date');
    const location = formData.get('location');
    const coverImage = formData.get('coverImage') || null;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(dateStr),
        location,
        coverImage,
        status: 'UPCOMING',
      },
    });

    revalidatePath('/');
    revalidatePath('/events');
    
    return { success: true, event };
  } catch (error) {
    console.error('Create event error:', error);
    return { success: false, error: error.message };
  }
}

export async function getEvents() {
  try {
    return await prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error('Get events error:', error);
    return [];
  }
}

export async function getEventById(id) {
  try {
    return await prisma.event.findUnique({
      where: { id }
    });
  } catch (error) {
    return null;
  }
}

export async function deleteEvent(id) {
  try {
    await checkAuth(['ADMIN', 'EDITOR']);
    await prisma.event.delete({ where: { id } });
    revalidatePath('/events');
    revalidatePath('/admin/events');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
