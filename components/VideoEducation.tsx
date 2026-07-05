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

        <div className="aspect-video rounded-3xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/pdzYGZJ9oqo"
            title="Why Your Liver First"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
