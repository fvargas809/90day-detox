import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { offerTag: string } }) {
  const funnel = await prisma.funnel.findUnique({ where: { offerTag: params.offerTag } });

  if (!funnel) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    active: funnel.active,
    label: funnel.ctaLabel,
    successMessage: funnel.successMessage,
    variant: funnel.variant,
    collectPhone: funnel.collectPhone,
  });
}