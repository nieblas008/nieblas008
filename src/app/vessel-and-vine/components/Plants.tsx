'use client';
import ProductCard from './ProductCard';
import { PLANTS } from '../data/products';

interface PlantsProps {
  mobile?: boolean;
}

export default function Plants({ mobile = false }: PlantsProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="vv-plants" style={{ padding: mobile ? '72px 0' : '120px 56px' }}>
      <div style={{
        padding: mobile ? '0 24px' : 0,
        marginBottom: mobile ? 32 : 56,
        display: 'flex', justifyContent: 'space-between',
        alignItems: mobile ? 'flex-start' : 'flex-end',
        flexDirection: mobile ? 'column' : 'row',
        gap: 18,
      }}>
        <div>
          <div className="vv-sectionlabel" style={{ marginBottom: mobile ? 18 : 24 }}>The Vines</div>
          <h2 style={{ fontSize: mobile ? 38 : 64, letterSpacing: '-0.02em' }}>
            Plants, raised<br/><em style={{ fontFamily: 'var(--serif)' }}>patiently.</em>
          </h2>
        </div>
        {!mobile && (
          <button
            className="vv-btn vv-btn--link"
            onClick={() => scrollTo('vv-plants')}
            style={{ marginBottom: 8, background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', padding: '0 0 4px', cursor: 'pointer' }}
          >
            Browse All Plants
          </button>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: mobile ? 24 : 32,
        padding: mobile ? '0 16px' : 0,
      }}>
        {PLANTS.map(p => <ProductCard key={p.id} product={p} compact={mobile}/>)}
      </div>
    </section>
  );
}
