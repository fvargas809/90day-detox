import 'server-only';
import { HexclaveServerApp } from '@hexclave/next';

// tokenStore: "nextjs-cookie" tells Hexclave to manage the session
// via cookies in the Next.js App Router, rather than you wiring that up yourself.
export const stackServerApp = new HexclaveServerApp({
  projectId: process.env.NEXT_PUBLIC_HEXCLAVE_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY!,
  secretServerKey: process.env.HEXCLAVE_SECRET_SERVER_KEY!,
  tokenStore: 'nextjs-cookie',
  urls: {
    signIn: '/handler/sign-in',
    signUp: '/handler/sign-up',
    afterSignIn: '/',
    afterSignUp: '/',
    afterSignOut: '/',
    home: '/',
  },
});
