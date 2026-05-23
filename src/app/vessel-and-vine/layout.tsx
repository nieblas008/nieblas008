import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from 'next/font/google';
import './vessel-and-vine.css';
import { StoreProvider } from './context/StoreContext';
import StoreChrome from './components/StoreChrome';

const serif = Cormorant_Garamond({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--vv-font-serif',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--vv-font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--vv-font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vessel & Vine — Ceramics & Plants',
  description: 'A small shop for hand-thrown ceramics and slow-grown plants. Open Wednesday through Sunday, 11–6.',
  openGraph: {
    title: 'Vessel & Vine — Ceramics & Plants',
    description: 'Hand-thrown ceramics and slow-grown plants from independent makers.',
    type: 'website',
  },
};

export default function VesselAndVineLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Preconnect to both Unsplash CDNs (premium + standard) */}
        <link rel="preconnect" href="https://plus.unsplash.com"/>
        <link rel="dns-prefetch" href="https://plus.unsplash.com"/>
        <link rel="preconnect" href="https://images.unsplash.com"/>
        <link rel="dns-prefetch" href="https://images.unsplash.com"/>
      </head>
      <body>
        <StoreProvider>
          {children}
          <StoreChrome/>
        </StoreProvider>
      </body>
    </html>
  );
}
