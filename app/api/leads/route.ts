import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, phone, source, offerTag, authUserId, language } = body;

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  const lead = await prisma.lead.upsert({
    where: { email },
    update: { name, phone, source, offerTag, authUserId },
    create: { email, name, phone, source, offerTag, authUserId },
  });

  await prisma.funnelEvent.create({
    data: {
      leadId: lead.id,
      step: offerTag ? `opt_in_${offerTag}` : 'opt_in',
      metadata: { source, authUserId: authUserId ?? null, language: language ?? 'en' },
    },
  });

  await prisma.emailSequenceStatus.upsert({
    where: { leadId: lead.id },
    update: {},
    create: { leadId: lead.id, sequenceName: 'welcome_series', currentStep: 1, lastSentAt: new Date() },
  });

  try {
    const siteUrl = req.nextUrl.origin;
    await resend.emails.send({
      from: 'The Healing Detox Lab <hello@90daydetoxnow.com>',
      to: email,
      subject: 'Your guide is on its way 🌿',
      html: `<p>Hi ${name || 'there'},</p>
        <p>Thanks for joining! Your free ebook is ready to download.</p>
        <p><a href="${siteUrl}/#ebook">Click here to grab your download</a> (you may need to sign in again if you're on a different device or browser).</p>
        <p>Over the next few days I'll send a few short emails on why the liver comes first in real healing.</p>`,
    });
  } catch (err) {
    console.error('Email send failed:', err);
  }

  return NextResponse.json({ success: true, leadId: lead.id });
}