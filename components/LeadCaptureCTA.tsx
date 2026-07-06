'use client';

import { useState } from 'react';

type Variant = 'forest' | 'ochre' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
  forest: 'bg-forest text-linen hover:bg-forestDark',
  ochre: 'bg-ochre text-forestDark hover:bg-ochreLight',
  outline: 'border border-forest text-forest hover:bg-forest hover:text-linen',
};

export default function LeadCaptureCTA({
  label,
  offerTag,
  source,
  successMessage = "Thanks! We'll be in touch shortly.",
  variant = 'forest',
  showPhone = true,
  className = '',
}: {
  label: string;
  offerTag: string;
  source: string;
  successMessage?: string;
  variant?: Variant;
  showPhone?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, source, offerTag }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <p className={`text-center rounded-full px-6 py-3 font-semibold bg-surface text-forest ${className}`}>
        {successMessage}
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className={`text-center rounded-full px-6 py-3 font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      >
        {label}
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl border border-sage/40 p-5 space-y-3 text-left ${className}`}
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={80}
        className="w-full rounded-lg border border-sage/60 px-3 py-2 text-sm text-ink"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-sage/60 px-3 py-2 text-sm text-ink"
      />
      {showPhone && (
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-sage/60 px-3 py-2 text-sm text-ink"
        />
      )}
      {status === 'error' && (
        <p className="text-xs text-red-600">Something went wrong — try again.</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${VARIANT_CLASSES[variant]}`}
        >
          {status === 'loading' ? 'Sending…' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-inkMuted hover:text-ink px-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}