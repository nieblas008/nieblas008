'use client';
import ProductImage from './ProductImage';
import { LOOKBOOK } from '../data/products';

interface LookbookProps {
  mobile?: boolean;
}

export default function Lookbook({ mobile = false }: LookbookProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (mobile) {
    return (
      <section id="vv-lookbook" style={{ padding: '72px 0 24px' }}>
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <div className="vv-sectionlabel" style={{ marginBottom: 18 }}>Lookbook · 04</div>
          <h2 style={{ fontSize: 40, letterSpacing: '-0.015em' }}>
            A field guide<br/>to <em style={{ fontFamily: 'var(--serif)' }}>slow living.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, padding: '0 4px' }}>
          {LOOKBOOK.slice(0, 6).map((it, i) => (
            <ProductImage key={i} tone={it.tone} src={it.img} tag={it.tag} ratio={i % 3 === 0 ? '1 / 1' : '4 / 5'}/>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="vv-lookbook" style={{ padding: '120px 56px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <div>
          <div className="vv-sectionlabel" style={{ marginBottom: 24 }}>Lookbook · Volume 04</div>
          <h2 style={{ fontSize: 76, letterSpacing: '-0.02em', maxWidth: '14ch' }}>
            A field guide to <em style={{ fontFamily: 'var(--serif)' }}>slow living.</em>
          </h2>
        </div>
        <button
          className="vv-btn vv-btn--link"
          onClick={() => scrollTo('vv-instagram')}
          style={{ marginBottom: 12, background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', padding: '0 0 4px' }}
        >
          View Full Lookbook
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 240, gap: 16 }}>
        <div style={{ gridColumn: '1 / 6', gridRow: 'span 2' }}>
          <ProductImage tone="linen" src={LOOKBOOK[0].img} tag="shelf · 03" ratio="auto" style={{ width: '100%', height: '100%' }} eager/>
        </div>
        <div style={{ gridColumn: '6 / 9', gridRow: 'span 1' }}>
          <ProductImage tone="sage"   src={LOOKBOOK[1].img} tag="studio · 11"   ratio="auto" style={{ width: '100%', height: '100%' }} eager/>
        </div>
        <div style={{ gridColumn: '9 / 13', gridRow: 'span 2' }}>
          <ProductImage tone="clay"   src={LOOKBOOK[2].img} tag="morning · 07"  ratio="auto" style={{ width: '100%', height: '100%' }}/>
        </div>
        <div style={{ gridColumn: '6 / 9', gridRow: 'span 1' }}>
          <ProductImage tone="bone"   src={LOOKBOOK[3].img} tag="still · 02"    ratio="auto" style={{ width: '100%', height: '100%' }}/>
        </div>
        <div style={{ gridColumn: '1 / 5', gridRow: 'span 1' }}>
          <ProductImage tone="shadow" src={LOOKBOOK[4].img} tag="interior · 04" ratio="auto" style={{ width: '100%', height: '100%' }}/>
        </div>
        <div style={{ gridColumn: '5 / 10', gridRow: 'span 1' }}>
          <ProductImage tone="dusk"   src={LOOKBOOK[5].img} tag="window · 09"   ratio="auto" style={{ width: '100%', height: '100%' }}/>
        </div>
        <div style={{ gridColumn: '10 / 13', gridRow: 'span 1' }}>
          <ProductImage tone="moss"   src={LOOKBOOK[6].img} tag="garden · 06"   ratio="auto" style={{ width: '100%', height: '100%' }}/>
        </div>
      </div>
    </section>
  );
}
