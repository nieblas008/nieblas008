import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { getDictionary, Locale } from '@/lib/dictionary';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | Premium Web Engineering',
  description: 'Helping businesses transform their online presence with premium, high-converting websites.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${newsreader.variable} antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar dict={dict} lang={lang} />
          <main className="min-h-screen pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
