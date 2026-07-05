import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, phone, source, offerTag, authUserId } = body;

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  // Upsert: if this email already exists, update it instead of erroring
  const lead = await prisma.lead.upsert({
    where: { email },
    update: { name, phone, source, offerTag, authUserId },
    create: { email, name, phone, source, offerTag, authUserId },
  });

  await prisma.funnelEvent.create({
    data: {
      leadId: lead.id,
      step: offerTag ? `opt_in_${offerTag}` : 'opt_in',
      metadata: { source, authUserId: authUserId ?? null },
    },
  });

  await prisma.emailSequenceStatus.upsert({
    where: { leadId: lead.id },
    update: {},
    create: { leadId: lead.id, sequenceName: 'welcome_series', currentStep: 1, lastSentAt: new Date() },
  });

  try {
    await resend.emails.send({
      from: 'The Healing Detox Lab <hello@90daydetoxnow.com>',
      to: email,
      subject: 'Your guide is on its way 🌿',
      html: `<p>Hi ${name || 'there'},</p><p>Thanks for joining! Your free ebook is attached — and over the next few days I'll send a few short emails on why the liver comes first in real healing.</p>`,
    });
  } catch (err) {
    // Don't fail the whole request if the email fails — the lead is already saved
    console.error('Email send failed:', err);
  }

  return NextResponse.json({ success: true, leadId: lead.id });
}
