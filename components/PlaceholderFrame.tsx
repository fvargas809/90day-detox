type Shape = 'arch' | 'rounded' | 'circle';

export default function PlaceholderFrame({
  label,
  aspect = 'aspect-[4/5]',
  shape = 'arch',
  tone = 'sage',
}: {
  /** Tells the site owner exactly what photo belongs here */
  label: string;
  aspect?: string;
  shape?: Shape;
  tone?: 'sage' | 'clay' | 'ochre';
}) {
  const radius =
    shape === 'circle' ? 'rounded-full' : shape === 'arch' ? 'rounded-arch' : 'rounded-3xl';

  const toneClasses = {
    sage: 'border-sage bg-sageLight/40',
    clay: 'border-clayDark bg-clay/30',
    ochre: 'border-ochre bg-ochreLight/20',
  }[tone];

  return (
    <div
      className={`relative ${aspect} ${radius} border-2 border-dashed ${toneClasses} flex flex-col items-center justify-center gap-2 p-6 text-center overflow-hidden`}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-50">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
        <path d="M3 16l5-4 4 3 4-5 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-xs font-semibold uppercase tracking-wide text-inkMuted">Photo placeholder</p>
      <p className="text-sm text-inkMuted leading-snug max-w-[220px]">{label}</p>
    </div>
  );
}
