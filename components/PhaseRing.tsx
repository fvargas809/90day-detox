'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const PHASES = [
  {
    key: 'cleanse',
    label: 'Cleanse',
    days: 'Days 1–30',
    color: '#0E6B55',
    description: 'Reduce toxic load and inflammation with gentle liver support and a real-food reset.',
  },
  {
    key: 'rebuild',
    label: 'Rebuild',
    days: 'Days 31–60',
    color: '#C68A42',
    description: 'Restore gut and hormone balance while your body adjusts to its new baseline.',
  },
  {
    key: 'thrive',
    label: 'Thrive',
    days: 'Days 61–90',
    color: '#B98A6E',
    description: 'Lock in steady energy and habits that hold up long after the program ends.',
  },
] as const;

/**
 * The Phase Ring is the site's signature device: a circular progress
 * indicator split into the program's three real phases. It fills as the
 * visitor scrolls through THIS section specifically (not the whole page),
 * and any phase can be clicked to preview it directly.
 */
export default function PhaseRing({ size = 220 }: { size?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 - 1, from scroll
  const [selected, setSelected] = useState<number | null>(null); // manual click override

  useEffect(() => {
    const onScroll = () => {
      // Walk up to the nearest ancestor <section> so progress is measured
      // against this component's own container, not the full document.
      const el = sectionRef.current?.closest('section');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // 0 when the section's top just reaches the top of the viewport,
      // 1 when the section's bottom reaches the bottom of the viewport —
      // i.e. progress tracks exactly how far you've scrolled through it.
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      const pct = total > 0 ? scrolled / total : scrolled > 0 ? 1 : 0;
      setScrollProgress(Math.min(1, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollActiveIndex = Math.min(2, Math.floor(scrollProgress * 3));
  const activeIndex = selected ?? scrollActiveIndex;

  // When a phase is clicked, light up that segment fully rather than
  // trying to fake a scroll position — simpler and always looks correct.
  const displayProgress = selected !== null ? (selected + 1) / 3 : scrollProgress;

  const handleSelect = useCallback((i: number) => {
    setSelected((prev) => (prev === i ? null : i));
  }, []);

  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / 3;
  const gap = 6;

  return (
    <div ref={sectionRef} className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E4E3DB" strokeWidth={10} />
        {PHASES.map((phase, i) => {
          const segStart = i * segmentLength;
          const filled =
            i < Math.floor(displayProgress * 3)
              ? segmentLength - gap
              : i === Math.floor(displayProgress * 3)
              ? Math.max(0, displayProgress * circumference - segStart)
              : 0;
          return (
            <circle
              key={phase.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={phase.color}
              strokeWidth={i === activeIndex ? 13 : 10}
              strokeLinecap="round"
              strokeDasharray={`${filled} ${circumference}`}
              strokeDashoffset={-segStart}
              className="transition-all duration-200 ease-out"
            />
          );
        })}
      </svg>

      <div className="flex gap-5 -mt-2">
        {PHASES.map((phase, i) => (
          <button
            key={phase.key}
            onClick={() => handleSelect(i)}
            className={`text-center transition-opacity rounded-md px-1 focus-visible:outline focus-visible:outline-2 ${
              i <= activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            }`}
            aria-pressed={selected === i}
          >
            <p className="font-display text-sm font-semibold" style={{ color: phase.color }}>
              {phase.label}
            </p>
            <p className="text-[11px] text-inkMuted">{phase.days}</p>
          </button>
        ))}
      </div>

      <p className="text-sm text-inkMuted text-center max-w-[240px] min-h-[40px]">
        {PHASES[activeIndex].description}
      </p>
      {selected !== null && (
        <button
          onClick={() => setSelected(null)}
          className="text-xs text-ochre font-medium hover:underline -mt-2"
        >
          Follow scroll again
        </button>
      )}
    </div>
  );
}
