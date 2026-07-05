export default function Footer() {
  return (
    <footer className="bg-forestDark text-linen/70">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="font-display text-lg text-linen">The Healing Detox Lab</p>
          <p className="text-sm mt-2 max-w-xs">
            Liver-first healing for fatigue, bloat, and hormone balance &mdash; one guided
            90-day journey at a time.
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" aria-label="Instagram" className="hover:text-linen transition-colors">Instagram</a>
          <a href="#" aria-label="Facebook" className="hover:text-linen transition-colors">Facebook</a>
          <a href="#" aria-label="YouTube" className="hover:text-linen transition-colors">YouTube</a>
        </div>
      </div>
      <div className="border-t border-linen/10 text-xs text-center py-5">
        &copy; {new Date().getFullYear()} The Healing Detox Lab. All rights reserved.
      </div>
    </footer>
  );
}
