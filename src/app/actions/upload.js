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
    // Check if token exists
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is missing in environment variables');
      return { success: false, error: 'Cloud storage is not configured. Please add BLOB_READ_WRITE_TOKEN to Vercel environment variables.' };
    }

    // Determine file extension and generate a secure unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const uniqueName = `mbss-uploads/${Date.now()}-${originalName}`;

    // Upload directly to Vercel Blob Storage
    const blob = await put(uniqueName, file, {
      access: 'public',
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    return { success: false, error: `Upload failed: ${error.message}` };
  }
}
