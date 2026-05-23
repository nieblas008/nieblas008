'use client';

import { useState, useEffect } from 'react';
import { NAV, SHOP } from '../data/forge';

interface Props {
  active: string;
  onJump: (id: string) => void;
}

export default function Nav({ active, onJump }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleJump = (id: string) => {
    setMobileOpen(false);
    onJump(id);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="brand" onClick={() => onJump('top')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onJump('top')}>
          <div className="brand__mark">F</div>
          <div>
            <div className="brand__name">The Forge</div>
            <div className="brand__sub">Barbershop · Est. 2014</div>
          </div>
        </div>

        <div className="nav__links">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`nav__link${active === n.id ? ' is-active' : ''}`}
              onClick={() => onJump(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="nav__right">
          <a className="nav__phone mono" href={SHOP.phoneHref}>{SHOP.phone}</a>
          <button className="btn btn--gold nav__cta" onClick={() => onJump('book')}>
            Book a chair
            <span className="arrow" aria-hidden="true">↗</span>
          </button>
          <button className="burger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="0" y1="2" x2="18" y2="2" />
              <line x1="0" y1="7" x2="18" y2="7" />
              <line x1="0" y1="12" x2="12" y2="12" />
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu__top">
          <div className="brand">
            <div className="brand__mark">F</div>
            <div>
              <div className="brand__name">The Forge</div>
              <div className="brand__sub">Barbershop · Est. 2014</div>
            </div>
          </div>
          <button className="burger" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>

        <div className="mobile-menu__links">
          {NAV.map((n, i) => (
            <button key={n.id} className="mobile-menu__link" onClick={() => handleJump(n.id)}>
              {n.label}
              <span className="n">0{i + 1}</span>
            </button>
          ))}
        </div>

        <div className="mobile-menu__foot">
          <button className="btn btn--gold btn--full" onClick={() => handleJump('book')}>
            Book a chair
            <span className="arrow">↗</span>
          </button>
          <a
            className="mono"
            style={{ color: 'var(--gold)', letterSpacing: '0.18em', fontSize: 13, textAlign: 'center' }}
            href={SHOP.phoneHref}
          >
            {SHOP.phone}
          </a>
        </div>
      </div>
    </>
  );
}
