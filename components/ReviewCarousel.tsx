'use client';

import { useEffect, useState, useCallback } from 'react';
import StarRating from './StarRating';

type Review = {
  id: string;
  name: string;
  rating: number;
  body: string;
  createdAt?: string;
  isSample?: boolean;
};

// Clearly-labeled placeholders — shown ONLY when there are zero approved
// real reviews yet, so the section doesn't look empty before launch.
// Replace by collecting real testimonials; do not present these as real.
const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'sample-1',
    name: 'Sample Client — replace with a real testimonial',
    rating: 5,
    body: 'This is placeholder text showing how a review will look and how long it typically runs. Swap this out once you collect real feedback from clients.',
    isSample: true,
  },
  {
    id: 'sample-2',
    name: 'Sample Client — replace with a real testimonial',
    rating: 5,
    body: 'Another placeholder entry. Real reviews submitted through the form on this page will appear here automatically once approved.',
    isSample: true,
  },
];

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews?.length ? data.reviews : SAMPLE_REVIEWS);
      })
      .catch(() => setReviews(SAMPLE_REVIEWS));
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (!reviews?.length) return;
      setIndex((i) => (i + dir + reviews.length) % reviews.length);
    },
    [reviews]
  );

  useEffect(() => {
    if (!reviews?.length || reviews.length < 2) return;
    const timer = setInterval(() => advance(1), 6000);
    return () => clearInterval(timer);
  }, [reviews, advance]);

  if (!reviews) {
    return <div className="h-48 rounded-3xl bg-surface animate-pulse" />;
  }

  const current = reviews[index];

  return (
    <div className="max-w-2xl mx-auto text-center">
      {current.isSample && (
        <p className="text-xs uppercase tracking-wide text-ochre font-semibold mb-3">
          Sample content — not a real review
        </p>
      )}
      <div className="bg-white rounded-3xl border border-sage/40 p-8 min-h-[220px] flex flex-col items-center justify-center">
        <StarRating rating={current.rating} />
        <p className="font-display text-lg mt-4 leading-relaxed text-ink">
          &ldquo;{current.body}&rdquo;
        </p>
        <p className="text-inkMuted text-sm mt-4 font-medium">{current.name}</p>
      </div>

      {reviews.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => advance(-1)}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full border border-sage/60 flex items-center justify-center hover:bg-surface transition-colors"
          >
            &larr;
          </button>
          <div className="flex gap-1.5">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? 'bg-forest' : 'bg-sage'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => advance(1)}
            aria-label="Next review"
            className="w-9 h-9 rounded-full border border-sage/60 flex items-center justify-center hover:bg-surface transition-colors"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
