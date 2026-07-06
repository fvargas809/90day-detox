import { redirect } from 'next/navigation';

export default function LegacyFunnelsRedirect() {
  redirect('/admin');
}
