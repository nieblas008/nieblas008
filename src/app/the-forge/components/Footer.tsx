'use client';

import { useState, useEffect } from 'react';
import { NAV, SHOP } from '../data/forge';

interface Props {
  onJump: (id: string) => void;
}

const IG_PATH = 'M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.4.56.22.96.48 1.38.9.42.42.68.82.9 1.38.15.42.35 1.06.4 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.4 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.15-1.06.35-2.23.4-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.4a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.15-.42-.35-1.06-.4-2.23C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85c.05-1.17.25-1.8.4-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.15 1.06-.35 2.23-.4C8.42 2.16 8.8 2.16 12 2.16zm0 5.18a4.66 4.66 0 1 0 0 9.32 4.66 4.66 0 0 0 0-9.32zm0 7.69a3.03 3.03 0 1 1 0-6.06 3.03 3.03 0 0 1 0 6.06zm5.93-7.87a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0z';

export default function Footer({ onJump }: Props) {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__top">
          <div className="foot__brand">
            <div className="brand">
              <div className="brand__mark">F</div>
              <div>
                <div className="brand__name">The Forge</div>
                <div className="brand__sub">Barbershop · Est. 2014</div>
              </div>
            </div>
            <p className="foot__tag">
              Sharp cuts, straight razors, stiff drinks. Cut here since 2014 on Damen Avenue.
            </p>
          </div>

          <div className="foot__col">
            <h4>Shop</h4>
            <ul>
              {NAV.map(n => (
                <li key={n.id}><a onClick={() => onJump(n.id)}>{n.label}</a></li>
              ))}
              <li><a onClick={() => onJump('book')}>Gift cards</a></li>
            </ul>
          </div>

          <div className="foot__col">
            <h4>Visit</h4>
            <ul>
              <li><a href={SHOP.phoneHref}>{SHOP.phone}</a></li>
              <li><a href={`mailto:${SHOP.email}`}>{SHOP.email}</a></li>
              <li><a>812 N. Damen Ave<br />Chicago, IL 60622</a></li>
            </ul>
          </div>

          <div className="foot__col">
            <h4>Today</h4>
            <p style={{ color: 'var(--text)', fontFamily: 'var(--f-display)', fontSize: 22, fontStyle: 'italic', margin: 0 }}>
              Open · 10am — 9pm
            </p>
            <p style={{ marginTop: 8 }}>Walk-ins welcome until 8:15pm. Last shave at 8:00pm.</p>
          </div>
        </div>

        <div className="foot__bottom">
          <div className="foot__copy">© {year} The Forge Barbershop, LLC · Chicago, IL</div>
          <div className="foot__socials">
            <a href={SHOP.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram on Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={IG_PATH} />
              </svg>
              {SHOP.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
