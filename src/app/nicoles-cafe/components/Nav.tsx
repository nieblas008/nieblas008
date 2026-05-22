'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';

interface NavProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Nav({ lang, setLang }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const t = COPY[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="brand">
          Nicole&apos;s<span className="brand-dot" aria-hidden="true" />Café
        </div>
        <div className="nav-links">
          <a href="#menu">{t.menu}</a>
          <a href="#hours">{t.hours}</a>
          <a href="#contact">{t.contact}</a>
        </div>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
          <button
            className={lang === 'es' ? 'active' : ''}
            onClick={() => setLang('es')}
            aria-pressed={lang === 'es'}
          >
            ES
          </button>
        </div>
      </div>
    </nav>
  );
}
