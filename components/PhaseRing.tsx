'use client';

import { useEffect, useState } from 'react';

const PHASES = [
  { key: 'cleanse', label: 'Cleanse', days: 'Days 1–30', color: '#0E6B55' },
  { key: 'rebuild', label: 'Rebuild', days: 'Days 31–60', color: '#C68A42' },
  { key: 'thrive', label: 'Thrive', days: 'Days 61–90', color: '#B98A6E' },
] as const;

/**
 * The Phase Ring is the site's signature device: a circular progress
 * indicator split into the program's three real phases. It fills as
 * the visitor scrolls the page, mirroring the 90-day journey itself
 * rather than acting as decoration.
 */
export default function PhaseRing({ size = 220 }: { size?: number }) {
  const [progress, setProgress] = useState(0); // 0 - 1

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / 3;
  const gap = 6;

  const activePhaseIndex = Math.min(2, Math.floor(progress * 3));

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E4E3DB"
          strokeWidth={10}
        />
        {PHASES.map((phase, i) => {
          const segStart = i * segmentLength;
          const filled = Math.max(0, Math.min(segmentLength - gap, progress * circumference - segStart));
          return (
            <circle
              key={phase.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={phase.color}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={`${filled} ${circumference}`}
              strokeDashoffset={-segStart}
              className="transition-[stroke-dasharray] duration-150 ease-out"
            />
          );
        })}
      </svg>
      <div className="flex gap-5 -mt-2">
        {PHASES.map((phase, i) => (
          <div
            key={phase.key}
            className={`text-center transition-opacity ${i <= activePhaseIndex ? 'opacity-100' : 'opacity-40'}`}
          >
            <p className="font-display text-sm font-semibold" style={{ color: phase.color }}>
              {phase.label}
            </p>
            <p className="text-[11px] text-inkMuted">{phase.days}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
