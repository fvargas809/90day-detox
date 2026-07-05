'use client';

import { HexclaveClientApp } from '@hexclave/next';

export const hexclaveApp = new HexclaveClientApp({
  projectId: process.env.NEXT_PUBLIC_HEXCLAVE_PROJECT_ID || 'placeholder',
  publishableClientKey: process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY || 'placeholder',
  tokenStore: 'nextjs-cookie',
});
