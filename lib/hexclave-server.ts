import 'server-only';
import { HexclaveServerApp } from '@hexclave/next';

// Server-side Hexclave app instance
export const hexclaveServerApp = new HexclaveServerApp({
  projectId: process.env.NEXT_PUBLIC_HEXCLAVE_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY!,
  secretServerKey: process.env.HEXCLAVE_SECRET_SERVER_KEY!,
  tokenStore: 'nextjs-cookie',
});
