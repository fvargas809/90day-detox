import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stackServerApp } from '@/lib/stack';
import { isAdminEmail } from '@/lib/admin';
import { slugify } from '@/lib/slugify';

const OFFER_TAG_PATTERN = /^[a-z0-9_]+$/;
const VALID_VARIANTS = ['forest', 'ochre', 'outline'];

async function requireAdmin() {
  const user = await stackServerApp.getUser();
  if (!user || !isAdminEmail(user.primaryEmail)) {
    return null;
  }
  return user;
}

async function uniqueOfferTag(base: string): Promise<string> {
  let candidate = base;
  let suffix = 2;
  while (await prisma.funnel.findUnique({ where: { offerTag: candidate } })) {
    candidate = `${base}_${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [funnels, counts] = await Promise.all([
    prisma.funnel.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.lead.groupBy({ by: ['offerTag'], _count: { offerTag: true } }),
  ]);
  const countMap: Record<string, number> = {};
  for (const c of counts) {
    if (c.offerTag) countMap[c.offerTag] = c._count.offerTag;
  }
  const withCounts = funnels.map((f: { offerTag: string }) => ({ ...f, responseCount: countMap[f.offerTag] ?? 0 }));
  return NextResponse.json({ funnels: withCounts });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { ctaLabel, offerTag: manualOfferTag } = body;

  if (!ctaLabel || typeof ctaLabel !== 'string' || ctaLabel.trim().length === 0) {
    return NextResponse.json({ error: 'Button text is required.' }, { status: 400 });
  }

  let offerTag: string;
  if (manualOfferTag && typeof manualOfferTag === 'string' && manualOfferTag.trim()) {
    if (!OFFER_TAG_PATTERN.test(manualOfferTag.trim())) {
      return NextResponse.json(
        { error: 'Identifier must be lowercase letters, numbers, and underscores only.' },
        { status: 400 }
      );
    }
    const exists = await prisma.funnel.findUnique({ where: { offerTag: manualOfferTag.trim() } });
    if (exists) {
      return NextResponse.json({ error: 'That identifier is already in use.' }, { status: 409 });
    }
    offerTag = manualOfferTag.trim();
  } else {
    offerTag = await uniqueOfferTag(slugify(ctaLabel));
  }

  try {
    const funnel = await prisma.funnel.create({
      data: {
        name: ctaLabel.trim(),
        offerTag,
        ctaLabel: ctaLabel.trim(),
        variant: VALID_VARIANTS[0],
        collectPhone: true,
        active: true,
      },
    });
    return NextResponse.json({ funnel: { ...funnel, responseCount: 0 } });
  } catch (err) {
    console.error('Failed to create funnel:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}