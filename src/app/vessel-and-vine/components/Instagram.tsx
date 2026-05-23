'use client';
import ProductImage from './ProductImage';
import { INSTAGRAM } from '../data/products';

interface InstagramProps {
  mobile?: boolean;
}

export default function Instagram({ mobile = false }: InstagramProps) {
  return (
    <section id="vv-instagram" style={{ padding: mobile ? '56px 0 24px' : '100px 56px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: mobile ? 28 : 48 }}>
        <div className="vv-sectionlabel" style={{ justifyContent: 'center', marginBottom: 18 }}>
          <span style={{ width: 28, height: 1, background: 'var(--muted)', display: 'inline-block' }}/>
          Field Notes
          <span style={{ width: 28, height: 1, background: 'var(--muted)', display: 'inline-block' }}/>
        </div>
        <h2 style={{ fontSize: mobile ? 32 : 48, letterSpacing: '-0.015em' }}>
          <em style={{ fontFamily: 'var(--serif)' }}>@vesselandvine</em>
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr 1fr 1fr' : 'repeat(6, 1fr)',
        gap: mobile ? 4 : 8,
        padding: mobile ? 0 : '0 32px',
      }}>
        {INSTAGRAM.map((it, i) => (
          <a
            key={i}
            href="https://www.instagram.com/clancy_reimagined"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none' }}
          >
            <ProductImage tone={it.tone} src={it.img} ratio="1 / 1" tag={mobile ? '' : it.tag}/>
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 28 : 40 }}>
        <a
          href="https://www.instagram.com/clancy_reimagined"
          target="_blank"
          rel="noopener noreferrer"
          className="vv-btn vv-btn--link"
          style={{ background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', padding: '0 0 4px', cursor: 'pointer' }}
        >
          Follow @clancy_reimagined
        </a>
      </div>
    </section>
  );
}
