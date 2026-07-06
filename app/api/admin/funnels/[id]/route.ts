import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stackServerApp } from '@/lib/stack';
import { isAdminEmail } from '@/lib/admin';

const VALID_VARIANTS = ['forest', 'ochre', 'outline'];

async function requireAdmin() {
  const user = await stackServerApp.getUser();
  if (!user || !isAdminEmail(user.primaryEmail)) {
    return null;
  }
  return user;
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, ctaLabel, successMessage, variant, collectPhone, active } = body;

  if (variant && !VALID_VARIANTS.includes(variant)) {
    return NextResponse.json({ error: 'Invalid style variant.' }, { status: 400 });
  }

  try {
    const funnel = await prisma.funnel.update({
      where: { id: params.id },
      data: {
        ...(ctaLabel !== undefined && { ctaLabel: String(ctaLabel).trim(), name: String(ctaLabel).trim() }),
        ...(name !== undefined && ctaLabel === undefined && { name: String(name).trim() }),
        ...(successMessage !== undefined && { successMessage: String(successMessage).trim() }),
        ...(variant !== undefined && { variant }),
        ...(collectPhone !== undefined && { collectPhone: Boolean(collectPhone) }),
        ...(active !== undefined && { active: Boolean(active) }),
      },
    });
    return NextResponse.json({ funnel });
  } catch (err) {
    console.error('Failed to update funnel:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.funnel.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to delete funnel:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}