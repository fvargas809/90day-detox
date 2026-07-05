import PlaceholderFrame from './PlaceholderFrame';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest text-linen">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeUp">
          <p className="eyebrow text-ochreLight">Welcome to the 90 Day Detox</p>
          <h1 className="text-4xl md:text-6xl font-medium leading-[1.05] mt-4">
            Discover the healing power <em className="italic text-ochreLight">within</em> you
          </h1>
          <p className="mt-6 text-lg text-linen/80 max-w-md">
            A liver-first path back to steady energy, clear skin, and a calmer body &mdash;
            built in three intentional phases, not one extreme reset.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#pricing"
              className="rounded-full bg-ochre px-7 py-3.5 font-semibold text-forestDark hover:bg-ochreLight transition-colors"
            >
              Start Your Healing Path
            </a>
            <a
              href="#education"
              className="rounded-full border border-linen/40 px-7 py-3.5 font-semibold hover:bg-linen/10 transition-colors"
            >
              Watch: Why the Liver First
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <img 
              src="/images/hero-wide.svg"
              alt="Wide lifestyle photo of her, mid-movement or coaching a client (energetic, natural light)"
              className="w-full aspect-[16/9] object-coverrounded-lg"
            />
          </div>
             <img 
              src="/images/Tiffany-1.jpeg"
              alt="Close-up portrait, warm smile, healthy glow"
              className="w-full aspect-square object-cover rounded-lg"
             />
         
         <img 
          src="/images/Tiffany-2.jpeg"
          alt="Close-up portrait, warm smile, healthy glow"
          className="w-full aspect-square object-cover rounded-lg"
         />

        </div>
      </div>
    </section>
  );
}
