'use client';

import { useHexclaveApp } from '@hexclave/next';
import { useState, Suspense } from 'react';

function EbookCtaInner() {
  const app = useHexclaveApp();
  const user = app.useUser();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  // Not signed in — send them to Hexclave's hosted sign-in page, then bounce
  // back to this exact section once they're authenticated.
  if (!user) {
    return (
      <a
        href="/handler/sign-in?after_auth_return_to=%2F%23pricing"
        className="inline-block mt-5 rounded-full bg-forest text-linen px-6 py-3 font-semibold hover:bg-forestDark transition-colors"
      >
        Sign In to Grab Our Free Ebook
      </a>
    );
  }

  const handleDownload = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.primaryEmail,
          name: user.displayName,
          source: 'final_cta',
          offerTag: 'free_ebook',
          authUserId: user.id,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mt-5">
      <button
        onClick={handleDownload}
        disabled={status === 'loading' || status === 'done'}
        className="inline-block rounded-full bg-forest text-linen px-6 py-3 font-semibold hover:bg-forestDark transition-colors disabled:opacity-60"
      >
        {status === 'done' ? 'Check your email!' : status === 'loading' ? 'Sending…' : 'Grab Our Free Ebook'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">Something went wrong — try again in a moment.</p>
      )}
    </div>
  );
}

export default function EbookCta() {
  return (
    <Suspense fallback={<div className="mt-5 text-inkMuted">Loading...</div>}>
      <EbookCtaInner />
    </Suspense>
  );
}
