'use server';

import { put } from '@vercel/blob';
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

  try {
    // Determine file extension and generate a secure unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const uniqueName = `mbss-uploads/${Date.now()}-${originalName}`;

    // Upload directly to Vercel Blob Storage
    const blob = await put(uniqueName, file, {
      access: 'public',
      // Vercel blob will automatically use process.env.BLOB_READ_WRITE_TOKEN
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    return { success: false, error: 'Failed to upload file to cloud storage.' };
  }
}
