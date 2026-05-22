import type { Metadata } from 'next';
import { DM_Serif_Display, Manrope, JetBrains_Mono } from 'next/font/google';
import './nicoles-cafe.css';

const dmSerif = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--cafe-font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--cafe-font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--cafe-font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nicole's Café · East Austin",
  description:
    "A neighborhood café and kitchen on East 6th Street — hand-poured coffee and honest food, since 2019.",
  openGraph: {
    title: "Nicole's Café · East Austin",
    description: "Hand-poured coffee and honest food on East 6th Street, Austin TX.",
    type: 'website',
  },
};

export default function NicolesCafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
