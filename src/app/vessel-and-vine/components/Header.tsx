'use client';
import { usePathname, useRouter } from 'next/navigation';
import Wordmark from './Wordmark';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  mobile?: boolean;
  dark?: boolean;
}

const NAV_SECTIONS: Record<string, string> = {
  Shop:     'vv-featured',
  Ceramics: 'vv-featured',
  Plants:   'vv-plants',
  Journal:  'vv-instagram',
  Studio:   'vv-newsletter',
};

function CartIcon({ count = 0, color = 'var(--ink)' }: { count?: number; color?: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h2l1.5 9h8L16 7H6" stroke={color} strokeWidth="1.2"/>
        <circle cx="7" cy="17" r="1" fill={color}/>
        <circle cx="14" cy="17" r="1" fill={color}/>
      </svg>
      {count > 0 && (
        <span style={{
          position: 'absolute', top: -4, right: -6,
          background: 'var(--clay)', color: 'var(--linen)',
          fontSize: 9, fontWeight: 600,
          width: 14, height: 14, borderRadius: '50%',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--sans)',
        }}>{count}</span>
      )}
    </span>
  );
}

const iconBtn = (fg: string): React.CSSProperties => ({
  background: 'transparent', border: 'none', cursor: 'pointer', color: fg,
  padding: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative',
});

export default function Header({ mobile = false, dark = false }: HeaderProps) {
  const { count, openDrawer, openSearch, openMenu } = useStore();
  const pathname = usePathname();
  const router   = useRouter();

  const fg     = dark ? '#F5F0E8' : 'var(--ink)';
  const border = dark ? 'rgba(245,240,232,0.18)' : 'var(--border-soft)';

  const scrollTo = (sectionId: string) => {
    if (pathname === '/vessel-and-vine') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/vessel-and-vine#${sectionId}`);
    }
  };

  const navLinkStyle: React.CSSProperties = {
    color: fg, textDecoration: 'none', position: 'relative', paddingBottom: 2,
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500,
    fontFamily: 'var(--sans)',
  };

  if (mobile) {
    return (
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 20px', borderBottom: `1px solid ${border}`,
        background: dark ? 'transparent' : 'var(--linen)', position: 'relative', zIndex: 5,
      }}>
        <button style={iconBtn(fg)} aria-label="Menu" onClick={openMenu}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 5h14M2 9h14M2 13h14" stroke={fg} strokeWidth="1.2"/>
          </svg>
        </button>
        <Wordmark size={18} color={fg}/>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={iconBtn(fg)} aria-label="Search" onClick={openSearch}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5" stroke={fg} strokeWidth="1.2"/>
              <path d="M12 12l3 3" stroke={fg} strokeWidth="1.2"/>
            </svg>
          </button>
          <button style={iconBtn(fg)} aria-label="Cart" onClick={openDrawer}>
            <CartIcon count={count} color={fg}/>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center', padding: '26px 56px',
      borderBottom: `1px solid ${border}`,
      background: dark ? 'transparent' : 'var(--linen)',
      color: fg, position: 'relative', zIndex: 5,
    }}>
      <nav style={{ display: 'flex', gap: 36, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
        {['Shop', 'Ceramics', 'Plants', 'Journal'].map(label => (
          <button key={label} style={navLinkStyle} onClick={() => scrollTo(NAV_SECTIONS[label])}>
            {label}
          </button>
        ))}
      </nav>
      <Wordmark size={26} color={fg}/>
      <nav style={{ display: 'flex', gap: 18, justifyContent: 'flex-end', alignItems: 'center', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
        <button style={navLinkStyle} onClick={() => scrollTo(NAV_SECTIONS['Studio'])}>Studio</button>
        <button style={iconBtn(fg)} aria-label="Search" onClick={openSearch}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5" stroke={fg} strokeWidth="1.2"/>
            <path d="M12 12l3 3" stroke={fg} strokeWidth="1.2"/>
          </svg>
        </button>
        <button style={iconBtn(fg)} aria-label="Cart" onClick={openDrawer}>
          <CartIcon count={count} color={fg}/>
        </button>
      </nav>
    </header>
  );
}
