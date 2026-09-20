import { NextResponse } from 'next/server';

export async function GET(request) {
  // Jika user mengunggah versi terbaru ke Vercel Blob dan menyetel URL-nya di env:
  const cvUrl =
    process.env.NEXT_PUBLIC_CV_URL ||
    process.env.CV_BLOB_URL ||
    '/komponen/Final Portfolio_Imam Ariadi.pdf';

  // Redirect ke URL CV terkini
  return NextResponse.redirect(new URL(cvUrl, request.url));
}
