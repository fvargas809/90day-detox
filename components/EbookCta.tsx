'use client';

import { useHexclaveApp } from '@hexclave/next';
import { useState } from 'react';

export default function EbookCta() {
  const app = useHexclaveApp();
  const user = app.useUser();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const LangToggle = (
    <div className="flex gap-2 mb-3" role="radiogroup" aria-label="Ebook language">
      {(['en', 'es'] as const).map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
            lang === l
              ? 'bg-forest text-linen border-forest'
              : 'bg-transparent text-inkMuted border-sage hover:border-forest'
          }`}
        >
          {l === 'en' ? 'English' : 'Español'}
        </button>
      ))}
    </div>
  );

  if (!user) {
    return (
      <div className="mt-5">
        {LangToggle}
        <a
          href="/handler/sign-in?after_auth_return_to=%2F%23ebook"
          className="inline-block rounded-full bg-forest text-linen px-6 py-3 font-semibold hover:bg-forestDark transition-colors"
        >
          Sign In to Grab Our Free Ebook
        </a>
      </div>
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
          language: lang,
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
      {status !== 'done' && LangToggle}
      {status === 'done' ? (
        <a
          href={`/api/ebook/download?lang=${lang}`}
          className="inline-block rounded-full bg-ochre text-forestDark px-6 py-3 font-semibold hover:bg-ochreLight transition-colors"
        >
          Download Now &darr;
        </a>
      ) : (
        <button
          onClick={handleDownload}
          disabled={status === 'loading'}
          className="inline-block rounded-full bg-forest text-linen px-6 py-3 font-semibold hover:bg-forestDark transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Preparing…' : 'Grab Our Free Ebook'}
        </button>
      )}
      {status === 'done' && (
        <p className="text-sm text-inkMuted mt-2">
          We also sent a copy of this link to your email.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">Something went wrong — try again in a moment.</p>
      )}
    </div>
  );
}