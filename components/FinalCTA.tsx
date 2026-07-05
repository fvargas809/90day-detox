import PlaceholderFrame from './PlaceholderFrame';

export default function FinalCTA() {
  return (
    <section className="bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl">Step into your healing.</h2>
          <p className="mt-5 text-inkMuted text-lg leading-relaxed">
            Imagine waking up with energy again, clear skin, balanced moods, and steady
            digestion &mdash; all from simple daily habits that actually work. Inside this
            30-day cleanse, you&rsquo;ll get your supplements, your plan, your guidance, and
            your community. The only thing missing is your &ldquo;yes.&rdquo;
          </p>

          <div className="mt-8 bg-white/70 rounded-2xl p-6 border border-clayDark/40">
            <p className="font-display text-lg">New member promos</p>
            <p className="text-inkMuted mt-1">Qualify for these free gifts when you join today.</p>
            <a
              href="#"
              className="inline-block mt-5 rounded-full bg-forest text-linen px-6 py-3 font-semibold hover:bg-forestDark transition-colors"
            >
              Grab Our Free Ebook
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <PlaceholderFrame
            label="Ebook cover mockup on a tablet or phone"
            aspect="aspect-square"
            shape="rounded"
            tone="ochre"
          />
          <PlaceholderFrame
            label="Free-gift product bundle flat-lay"
            aspect="aspect-square"
            shape="rounded"
            tone="clay"
          />
        </div>
      </div>
    </section>
  );
}
