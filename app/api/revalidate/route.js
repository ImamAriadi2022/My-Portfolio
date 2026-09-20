import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  return handleRevalidate(request);
}

export async function POST(request) {
  return handleRevalidate(request);
}

async function handleRevalidate(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';
  const tag = searchParams.get('tag');

  const validSecret = process.env.REVALIDATE_SECRET || 'imam_portfolio_secret_2026';

  // Validate security token if secret is configured or passed
  if (secret && secret !== validSecret) {
    return NextResponse.json(
      { success: false, message: 'Invalid revalidation secret token.' },
      { status: 401 }
    );
  }

  try {
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        success: true,
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      });
    }

    revalidatePath(path);

    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to revalidate cache.',
      },
      { status: 500 }
    );
  }
}
