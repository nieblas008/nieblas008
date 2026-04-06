import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ricardo Nieblas | Admin Panel',
  description: 'Manage projects and testimonials.',
  manifest: '/site.webmanifest',
  icons: {
    apple: '/icons/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/logo-adaptable.svg',
        color: '#5bbad5',
      },
    ],
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-zinc-950 text-white`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
