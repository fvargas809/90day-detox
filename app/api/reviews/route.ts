import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, rating: true, body: true, createdAt: true },
  });
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, rating, body: reviewText } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length < 10) {
    return NextResponse.json({ error: 'Review must be at least 10 characters.' }, { status: 400 });
  }
  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return NextResponse.json({ error: 'Rating must be an integer from 1 to 5.' }, { status: 400 });
  }

  // approved defaults to false — the site owner reviews and approves
  // submissions (e.g. via Prisma Studio) before they appear publicly.
  const review = await prisma.review.create({
    data: {
      name: name.trim().slice(0, 80),
      rating: numericRating,
      body: reviewText.trim().slice(0, 1000),
      approved: false,
    },
  });

  return NextResponse.json({ success: true, id: review.id });
}
