'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function uploadFile(formData) {
  // Ensure the user is an authenticated admin/editor
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { success: false, error: 'Unauthorized' };
  }

  const file = formData.get('file');
  if (!file) {
    return { success: false, error: 'No file explicitly provided.' };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Santize file name, add timestamp to prevent collisions
  const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
  const uniqueName = `${Date.now()}-${originalName}`;
  
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  // Ensure uploads directory exists
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error('Error creating upload dir', err);
  }

  const filePath = join(uploadDir, uniqueName);

  try {
    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${uniqueName}`;
    return { success: true, url: fileUrl };
  } catch (error) {
    console.error('Error writing file:', error);
    return { success: false, error: 'Failed to write file to disk' };
  }
}
