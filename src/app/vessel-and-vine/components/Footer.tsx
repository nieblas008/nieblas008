'use client';
import { usePathname, useRouter } from 'next/navigation';
import Wordmark from './Wordmark';

interface FooterProps {
  mobile?: boolean;
}

const SECTION_MAP: Record<string, string> = {
  'All Ceramics':    'vv-featured',
  'All Plants':      'vv-plants',
  'New Arrivals':    'vv-featured',
  'Limited Editions':'vv-featured',
  'About':           'vv-story',
  'Makers':          'vv-story',
  'Journal':         'vv-instagram',
  'Visit Us':        'vv-newsletter',
  'Press':           'vv-newsletter',
  'Gift Cards':      'vv-featured',
  'Shipping':        'vv-newsletter',
  'Returns':         'vv-newsletter',
  'Care Guides':     'vv-newsletter',
  'Contact':         'vv-newsletter',
  'FAQ':             'vv-newsletter',
};

const SOCIAL_URLS: Record<string, string> = {
  Instagram: 'https://www.instagram.com/clancy_reimagined',
  Pinterest: 'https://www.pinterest.com/',
  Substack:  'https://substack.com/',
  WhatsApp:  'https://wa.me/526641747593',
};

function FooterCol({ title, links, onNav }: { title: string; links: string[]; onNav: (l: string) => void }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {links.map(l => (
          <li key={l}>
            <button
              onClick={() => onNav(l)}
              style={{
                color: 'var(--ink-soft)', textDecoration: 'none', fontSize: 13,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'var(--sans)',
              }}
            >{l}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ mobile = false }: FooterProps) {
  const pathname = usePathname();
  const router   = useRouter();

  const scrollTo = (sectionId: string) => {
    if (pathname === '/vessel-and-vine') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/vessel-and-vine#${sectionId}`);
    }
  };

  const handleNav = (label: string) => {
    const section = SECTION_MAP[label];
    if (section) scrollTo(section);
  };

  return (
    <footer style={{
      background: 'var(--linen-2)',
      borderTop: '1px solid var(--border-soft)',
      padding: mobile ? '48px 24px 32px' : '80px 56px 44px',
      color: 'var(--ink)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1.4fr 1fr 1fr 1fr',
        gap: mobile ? 36 : 64,
        marginBottom: mobile ? 36 : 64,
      }}>
        <div>
          <Wordmark size={mobile ? 22 : 26}/>
          <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: '36ch' }}>
            A small shop for hand-thrown ceramics and slow-grown plants. Open Wednesday through Sunday, 11–6.
          </p>
        </div>
        <FooterCol title="Shop"   links={['All Ceramics', 'All Plants', 'New Arrivals', 'Limited Editions', 'Gift Cards']} onNav={handleNav}/>
        <FooterCol title="Studio" links={['About', 'Makers', 'Journal', 'Visit Us', 'Press']} onNav={handleNav}/>
        <FooterCol title="Help"   links={['Shipping', 'Returns', 'Care Guides', 'Contact', 'FAQ']} onNav={handleNav}/>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: mobile ? 'column' : 'row',
        gap: mobile ? 18 : 24,
        justifyContent: 'space-between',
        alignItems: mobile ? 'flex-start' : 'center',
        paddingTop: 28,
        borderTop: '1px solid var(--border-soft)',
        fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)',
      }}>
        <span>© 2026 Vessel &amp; Vine · 412 Linden Ave, Portland, OR</span>
        <div style={{ display: 'flex', gap: 18 }}>
          {Object.entries(SOCIAL_URLS).map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--muted)', textDecoration: 'none' }}>{name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
