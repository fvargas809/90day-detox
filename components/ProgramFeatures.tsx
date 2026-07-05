import PhaseRing from './PhaseRing';

const FEATURES = [
  {
    title: 'Nutrition Plans',
    body: 'A simple, delicious 30-day plan designed to balance blood sugar, reduce inflammation, and reset your metabolism \u2014 without restriction. Real food that supports your hormones and liver every day.',
  },
  {
    title: '1:1 Health Coaching & Education',
    body: 'Learn the "why" behind every step through guided lessons and an optional 1:1 consultation, so you can make confident decisions about your health long after the program ends.',
  },
  {
    title: 'Community',
    body: 'You don\u2019t have to do this alone. Inside a private group, you\u2019ll connect with others on the same journey \u2014 sharing wins, challenges, and support.',
  },
  {
    title: 'Supplements',
    body: 'Each protocol includes clean, targeted, third-party tested supplements formulated to support your liver, gut, and cellular function for sustainable results.',
  },
];

export default function ProgramFeatures() {
  return (
    <section id="program" className="bg-linen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14 items-start">
          <div className="lg:sticky lg:top-28 flex flex-col items-center text-center gap-6">
            <PhaseRing />
            <p className="text-sm text-inkMuted max-w-[220px]">
              Every level builds on the last &mdash; healing happens in layers, not all at once.
            </p>
          </div>

          <div>
            <p className="eyebrow">What&rsquo;s included</p>
            <h2 className="text-3xl md:text-4xl mt-3 max-w-xl">
              Here&rsquo;s everything waiting for you inside the program.
            </h2>

            <div className="grid sm:grid-cols-2 gap-8 mt-12">
              {FEATURES.map((f) => (
                <div key={f.title} className="border-t-2 border-ochre pt-5">
                  <h3 className="font-display text-xl">{f.title}</h3>
                  <p className="text-inkMuted mt-2 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
