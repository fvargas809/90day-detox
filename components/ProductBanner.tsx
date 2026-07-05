import PlaceholderFrame from './PlaceholderFrame';

export default function ProductBanner() {
  return (
    <section className="bg-forest text-linen">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <PlaceholderFrame
          label="Supplement lineup flat-lay on a natural surface (wood, linen, or stone)"
          aspect="aspect-[4/3]"
          shape="rounded"
          tone="ochre"
        />
        <div>
          <h2 className="text-3xl md:text-4xl leading-tight">
            A lot can change in 90 days &mdash; if you decide to start.
          </h2>
          <p className="mt-6 text-linen/80 text-lg leading-relaxed">
            Naturally boost your metabolism, detox your body, harmonize your hormones,
            get more energy, and have your skin glowing.
          </p>
          <a
            href="#pricing"
            className="inline-block mt-8 rounded-full bg-ochre px-7 py-3.5 font-semibold text-forestDark hover:bg-ochreLight transition-colors"
          >
            See the Program Tiers
          </a>
        </div>
      </div>
    </section>
  );
}
