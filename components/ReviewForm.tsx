'use client';

import { useState } from 'react';
import StarRating from './StarRating';

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setError('Something went wrong — try again in a moment.');
      setStatus('error');
    }
  };

  if (!open) {
    return (
      <div className="text-center mt-8">
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-forest text-forest px-6 py-2.5 font-semibold hover:bg-forest hover:text-linen transition-colors"
        >
          Leave a Review
        </button>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="max-w-md mx-auto mt-8 text-center bg-surface rounded-2xl p-6">
        <p className="font-display text-lg">Thank you!</p>
        <p className="text-inkMuted mt-1 text-sm">
          Your review has been submitted and will appear here once it&rsquo;s approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 bg-surface rounded-2xl p-6 space-y-4">
      <div>
        <label htmlFor="review-name" className="text-sm font-medium text-ink">Your name</label>
        <input
          id="review-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={80}
          className="mt-1 w-full rounded-lg border border-sage/60 px-3 py-2 bg-white"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-1">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} stars`}
              className="p-0.5"
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill={n <= rating ? '#C68A42' : 'none'}
                stroke="#C68A42"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-body" className="text-sm font-medium text-ink">Your review</label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          className="mt-1 w-full rounded-lg border border-sage/60 px-3 py-2 bg-white"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-forest text-linen px-6 py-2.5 font-semibold hover:bg-forestDark transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Review'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-inkMuted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
