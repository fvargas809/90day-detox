import { redirect } from 'next/navigation';

export default function LegacyGuideRedirect() {
  redirect('/admin');
}