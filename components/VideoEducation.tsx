export default function VideoEducation() {
  return (
    <section id="education" className="bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl">Healing starts here.</h2>
          <p className="mt-5 text-inkMuted text-lg leading-relaxed">
            Watch this quick presentation to understand why everything starts with your liver.
            In just a few minutes, you&rsquo;ll see how it impacts your energy, hormones,
            metabolism, and mood &mdash; and why a simple 30-day cleanse can change the way
            you feel from the inside out.
          </p>
          <p className="mt-4 text-inkMuted leading-relaxed">
            Once you understand what your liver actually does, you&rsquo;ll realize healing
            doesn&rsquo;t have to be complicated. It just has to start here.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="rounded-full bg-forest text-linen px-6 py-3 font-semibold hover:bg-forestDark transition-colors"
            >
              Join our FB Group
            </a>
            <a
              href="#"
              className="rounded-full bg-ochre text-forestDark px-6 py-3 font-semibold hover:bg-ochreLight transition-colors"
            >
              Book a Free 1:1 Consultation &rarr;
            </a>
          </div>
        </div>

        {/* Replace the src below with the real embed URL (YouTube/Vimeo) when ready */}
        <div className="aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-sage bg-white flex items-center justify-center">
          <div className="text-center px-6">
            <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-forest text-linen flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-inkMuted">Video placeholder</p>
            <p className="text-sm text-inkMuted mt-1">
              Embed the &ldquo;Why Your Liver First&rdquo; presentation here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
