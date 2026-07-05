import PlaceholderFrame from './PlaceholderFrame';

const OUTCOMES = [
  {
    tag: 'Reset your metabolism',
    title: 'When your liver heals, your face tells the story.',
    placeholder: 'Two-person "aha" moment photo \u2014 her with a client, genuine reaction',
  },
  {
    tag: 'Glow from within',
    title: 'Clearer skin, calmer mind, consistent energy.',
    placeholder: 'Client testimonial-style selfie with a short quote overlay space',
  },
  {
    tag: 'Release toxins',
    title: 'Metabolism restored, inflammation reduced.',
    placeholder: 'Before/after body composition or energy-log photo',
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl text-center max-w-2xl mx-auto">
          You can keep nurturing your symptoms, or you can start healing today.
        </h2>
        <p className="text-center text-inkMuted mt-4 max-w-xl mx-auto">
          Because staying stuck in fatigue, bloat, and inflammation isn&rsquo;t an option anymore.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {OUTCOMES.map((o) => (
            <div key={o.tag} className="text-center">
              <PlaceholderFrame label={o.placeholder} aspect="aspect-[4/5]" shape="arch" tone="ochre" />
              <p className="eyebrow mt-5">{o.tag}</p>
              <p className="font-display text-lg mt-2 leading-snug">{o.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
