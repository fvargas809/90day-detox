import { Suspense } from 'react';
import AuthStatus from './AuthStatus';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linen/90 backdrop-blur-sm border-b border-sage/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <a href="#top" className="font-display text-lg sm:text-xl font-semibold text-forest">
          The Healing Detox Lab
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-inkMuted">
          <a href="#program" className="hover:text-forest transition-colors">Program</a>
          <a href="#pricing" className="hover:text-forest transition-colors">Pricing</a>
          <a href="#education" className="hover:text-forest transition-colors">Learn</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-5">
          <Suspense fallback={<div className="w-12 sm:w-16 h-5" />}>
            <AuthStatus />
          </Suspense>
          <a
            href="#pricing"
            className="rounded-full bg-forest text-linen px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-forestDark transition-colors whitespace-nowrap"
          >
            Book Free Consult
          </a>
        </div>
      </div>
    </header>
  );
}
