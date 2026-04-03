"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar({ 
  dict, 
  lang, 
  hasProjects, 
  hasTestimonials 
}: { 
  dict: any, 
  lang: string,
  hasProjects: boolean,
  hasTestimonials: boolean
}) {
  const isDev = process.env.NODE_ENV === 'development';

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <nav className="relative max-w-5xl mx-auto liquid-glass rounded-full px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <Link 
            href={`/${lang}`} 
            onClick={scrollToTop}
            className="block w-8 h-8 hover:scale-105 transition-transform"
          >
            <Image 
              src="/ricardo-nieblas.svg" 
              alt="Ricardo Nieblas Logo" 
              width={32} 
              height={32} 
              className="dark:invert w-full h-full"
              priority
            />
          </Link>
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 font-sans text-sm font-medium whitespace-nowrap">
          <a href={`/${lang}#about`} className="hover:opacity-70 transition-opacity">{dict.navigation.about}</a>
          <a href={`/${lang}#services`} className="hover:opacity-70 transition-opacity">{dict.navigation.services}</a>
          {hasProjects && (
            <a href={`/${lang}#portfolio`} className="hover:opacity-70 transition-opacity">{dict.navigation.portfolio}</a>
          )}
          {hasTestimonials && (
            <a href={`/${lang}#testimonials`} className="hover:opacity-70 transition-opacity">{dict.navigation.testimonials}</a>
          )}
        </div>
        
        <div className="flex-1 flex items-center justify-end gap-4">
          {isDev && (
            <>
              <LanguageSwitcher currentLang={lang} label={dict.navigation.switchLang} />
              <ThemeToggle />
            </>
          )}
          <a href={`/${lang}#contact`} className="hidden md:block px-5 py-2 bg-foreground text-background text-sm font-medium rounded-full hover:scale-105 transition-transform whitespace-nowrap">
            {dict.navigation.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
