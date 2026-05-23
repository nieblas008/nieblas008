import type { Metadata } from 'next';
import { Playfair_Display, Oswald, Manrope } from 'next/font/google';
import './the-forge.css';

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--forge-font-display',
  display: 'swap',
});

const oswald = Oswald({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--forge-font-eye',
  display: 'swap',
});

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--forge-font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Forge Barbershop · West Loop, Chicago',
  description:
    'Sharp cuts, straight razors, stiff drinks. A barbershop for men who give a damn — Est. 2014, West Loop, Chicago.',
  openGraph: {
    title: 'The Forge Barbershop · West Loop, Chicago',
    description: 'Sharp cuts, straight razors, stiff drinks. Est. 2014 on Damen Avenue.',
    type: 'website',
  },
};

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${oswald.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
