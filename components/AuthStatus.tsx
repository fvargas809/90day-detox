'use client';

import { useHexclaveApp } from '@hexclave/next';
import { Suspense } from 'react';

function AuthStatusInner() {
  const app = useHexclaveApp();
  const user = app.useUser();

  if (user) {
    return (
      <button
        onClick={async () => {
          await app.signOut();
          window.location.href = '/';
        }}
        className="text-sm font-medium text-ink hover:text-forest transition-colors"
      >
        Sign Out
      </button>
    );
  }

  return (
    <a
      href="/handler/sign-in"
      className="text-sm font-medium text-ink hover:text-forest transition-colors"
    >
      Sign In
    </a>
  );
}

export default function AuthStatus() {
  return (
    <Suspense fallback={<div className="text-sm text-inkMuted">Loading...</div>}>
      <AuthStatusInner />
    </Suspense>
  );
}
