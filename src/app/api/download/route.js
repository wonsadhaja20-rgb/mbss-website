import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('file');
  const title = searchParams.get('title') || 'MBSS_Document';

  if (!fileUrl) {
    return new NextResponse('Missing file parameter', { status: 400 });
  }

  // Ensure fileUrl is safe (only from /uploads/)
  if (!fileUrl.startsWith('/uploads/')) {
    return new NextResponse('Invalid file path', { status: 400 });
  }

  const filePath = join(process.cwd(), 'public', fileUrl);

  if (!existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  try {
    const fileBuffer = await readFile(filePath);
    
    // Create a safe title for the filename
    const safeTitle = title.replace(/[^a-zA-Z0-9\-_]/g, '_');
    const filename = `${safeTitle}.pdf`;

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        // Include Content-Length for progress bars
        'Content-Length': fileBuffer.length.toString()
      },
    });
  } catch (error) {
    return new NextResponse('Error reading file', { status: 500 });
  }
}
