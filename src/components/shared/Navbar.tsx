import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <nav className="relative max-w-5xl mx-auto liquid-glass rounded-full px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <Link href={`/${lang}`} className="font-serif font-bold text-xl tracking-tight">
            N.
          </Link>
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 font-sans text-sm font-medium whitespace-nowrap">
          <a href={`/${lang}#about`} className="hover:opacity-70 transition-opacity">{dict.navigation.about}</a>
          <a href={`/${lang}#services`} className="hover:opacity-70 transition-opacity">{dict.navigation.services}</a>
          <a href={`/${lang}#portfolio`} className="hover:opacity-70 transition-opacity">{dict.navigation.portfolio}</a>
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
