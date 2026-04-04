"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll direction detection to hide/show the mobile hamburger
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true);  // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 p-6 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        
        {/* Desktop Navbar (Hidden on mobile) */}
        <nav className="relative max-w-5xl mx-auto liquid-glass rounded-full px-6 py-4 hidden md:flex items-center justify-between">
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

        {/* Mobile Floating Hamburger Button */}
        <div className="md:hidden flex justify-end">
          <button 
            onClick={() => setIsOpen(true)}
            className="liquid-glass p-3 rounded-full shadow-lg shadow-black/5 hover:scale-105 transition-transform active:scale-95"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Layer */}
      <div 
        className={`fixed inset-0 z-[100] bg-background/50 flex flex-col items-center justify-center transition-all duration-400 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
        style={{ backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)' }}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-10 right-10 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors active:scale-95"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center gap-8 text-3xl font-serif tracking-tight">
          <a href={`/${lang}#about`} onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">{dict.navigation.about}</a>
          <a href={`/${lang}#services`} onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">{dict.navigation.services}</a>
          {hasProjects && (
            <a href={`/${lang}#portfolio`} onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">{dict.navigation.portfolio}</a>
          )}
          {hasTestimonials && (
            <a href={`/${lang}#testimonials`} onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">{dict.navigation.testimonials}</a>
          )}
          
          <a href={`/${lang}#contact`} onClick={() => setIsOpen(false)} className="px-10 py-4 mt-8 bg-foreground text-background font-sans font-medium rounded-full text-lg shadow-xl shadow-foreground/20 active:scale-95 transition-transform">
            {dict.navigation.contact}
          </a>

          {isDev && (
            <div className="flex items-center gap-6 mt-12 bg-background/50 p-4 rounded-full border border-foreground/10 shadow-inner">
              <LanguageSwitcher currentLang={lang} label={dict.navigation.switchLang} />
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
