'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Wordmark from './Wordmark';
import { useStore } from '../context/StoreContext';

const NAV_ITEMS = [
  { label: 'Shop',      section: 'vv-featured' },
  { label: 'Ceramics',  section: 'vv-featured' },
  { label: 'Plants',    section: 'vv-plants' },
  { label: 'Journal',   section: 'vv-instagram' },
  { label: 'Studio',    section: 'vv-newsletter' },
];

export default function MobileMenu() {
  const { menuOpen, closeMenu } = useStore();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  const navigate = (sectionId: string) => {
    closeMenu();
    if (pathname === '/vessel-and-vine') {
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 200);
    } else {
      router.push(`/vessel-and-vine#${sectionId}`);
    }
  };

  if (!menuOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      <div onClick={closeMenu} style={{ position: 'absolute', inset: 0, background: 'rgba(43,42,38,0.4)', animation: 'vv-fade-in .2s ease' }}/>
      <nav style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 300, background: 'var(--linen)',
        display: 'flex', flexDirection: 'column',
        padding: '28px 32px',
        animation: 'vv-slide-in-left .3s cubic-bezier(.2,.7,.2,1)',
        boxShadow: '8px 0 40px rgba(43,42,38,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <Wordmark size={20}/>
          <button onClick={closeMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', padding: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2"/></svg>
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map(({ label, section }) => (
            <li key={label}>
              <button
                onClick={() => navigate(section)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--serif)', fontSize: 32, letterSpacing: '-0.01em',
                  color: 'var(--ink)', padding: '10px 0', lineHeight: 1.15,
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: 40, borderTop: '1px solid var(--border-soft)', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.12em' }}>
          412 Linden Ave, Portland<br/>Wed–Sun, 11–6
        </div>
      </nav>
    </div>
  );
}
