'use client';
import ProductImage from './ProductImage';
import { HERO_IMG } from '../data/products';

interface HeroProps {
  mobile?: boolean;
}

export default function Hero({ mobile = false }: HeroProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="vv-hero" style={{ position: 'relative', height: mobile ? 620 : 760, overflow: 'hidden' }}>
      <ProductImage
        tone="dusk"
        src={HERO_IMG}
        ratio="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        tag="hero · lifestyle"
        alt="Vessel & Vine spring collection"
        eager
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(43,42,38,0.15) 0%, rgba(43,42,38,0.45) 100%)',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: mobile ? '0 24px 64px' : '0 80px 80px',
        color: 'var(--linen)',
      }}>
        <div className="eyebrow" style={{ color: 'rgba(245,240,232,0.85)', marginBottom: 22 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(245,240,232,0.7)', verticalAlign: 'middle', marginRight: 14 }}/>
          Spring Collection · MMXXVI
        </div>
        <h1 style={{
          fontSize: mobile ? 56 : 124,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 0.95,
          maxWidth: mobile ? '100%' : '12ch',
          color: 'var(--linen)',
        }}>
          Slow rooms,<br/>
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)', color: 'rgba(245,240,232,0.8)' }}>made by hand.</em>
        </h1>
        <div style={{
          marginTop: mobile ? 28 : 40,
          display: 'flex', gap: 16,
          flexDirection: mobile ? 'column' : 'row',
          alignItems: mobile ? 'stretch' : 'center',
        }}>
          <button
            className="vv-btn"
            onClick={() => scrollTo('vv-featured')}
            style={{ background: 'var(--linen)', color: 'var(--ink)', padding: mobile ? '16px 26px' : '18px 32px' }}
          >
            Shop the Collection
          </button>
          <button
            onClick={() => scrollTo('vv-instagram')}
            style={{
              color: 'rgba(245,240,232,0.85)',
              fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: mobile ? '0' : '0 4px',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--sans)',
            }}
          >
            Read our journal
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </button>
        </div>
      </div>

      {!mobile && (
        <div style={{
          position: 'absolute', bottom: 40, right: 80,
          color: 'rgba(245,240,232,0.7)',
          fontFamily: 'var(--mono)', fontSize: 11,
          letterSpacing: '0.18em', textAlign: 'right', lineHeight: 1.8,
        }}>
          <div>vol. iii · no. 04</div>
          <div>portland, oregon</div>
        </div>
      )}
    </section>
  );
}
