import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { stackServerApp } from '@/lib/stack';

// Allowlist only — never build the file path from user input directly,
// or a request like ?lang=../../.env could read arbitrary files off disk.
const FILES: Record<string, { filename: string; downloadName: string }> = {
  en: { filename: 'doTERRA-90Day-Reset.pdf', downloadName: 'doTERRA-90Day-Reset.pdf' },
  es: { filename: 'spanish-doTERRA-90day-reset.pdf', downloadName: 'doTERRA-Reinicio-90-Dias.pdf' },
};

export async function GET(req: NextRequest) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to download this file.' }, { status: 401 });
  }

  const langParam = req.nextUrl.searchParams.get('lang');
  const lang = langParam && langParam in FILES ? langParam : 'en';
  const { filename, downloadName } = FILES[lang];
  const filePath = path.join(process.cwd(), 'assets', 'ebook', filename);

  let file: Buffer;
  try {
    file = await readFile(filePath);
  } catch (err) {
    console.error('Ebook file not found at', filePath, err);
    return NextResponse.json({ error: 'The file is temporarily unavailable.' }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${downloadName}"`,
      'Content-Length': String(file.length),
      'Cache-Control': 'private, no-store',
    },
  });
}