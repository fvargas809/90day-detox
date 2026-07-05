import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = 'https://www.90daydetoxnow.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The 90 Day Detox | Liver-First Healing for Fatigue, Bloat & Hormones',
    template: '%s | The 90 Day Detox',
  },
  description:
    'A 90-day, liver-first healing program combining nutrition plans, 1:1 coaching, community, and clean supplements to reduce inflammation, restore energy, and balance hormones naturally.',
  keywords: [
    'liver cleanse',
    '90 day detox',
    'hormone balance program',
    'natural detox coaching',
    'metabolism reset',
    'anti-inflammatory nutrition plan',
  ],
  openGraph: {
    title: 'The 90 Day Detox | Discover the Healing Power Within You',
    description:
      'A liver-first, 3-phase healing program: Cleanse, Rebuild, Thrive. Nutrition, coaching, community, and clean supplements in one guided path.',
    url: siteUrl,
    siteName: 'The 90 Day Detox',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The 90 Day Detox program' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 90 Day Detox | Discover the Healing Power Within You',
    description:
      'A liver-first, 3-phase healing program: Cleanse, Rebuild, Thrive.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Wellness Coaching Program',
  name: 'The 90 Day Detox',
  description:
    'A 3-phase liver-first healing program combining nutrition plans, 1:1 health coaching, community support, and clean supplements.',
  provider: {
    '@type': 'Organization',
    name: 'The Healing Detox Lab',
  },
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Program Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Foundational Wellness',
        price: '149',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '149',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
        },
      },
      {
        '@type': 'Offer',
        name: 'Liver Cleanse RESET',
        price: '223',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: '90 Day Detox & Restore',
        price: '223',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '223',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
