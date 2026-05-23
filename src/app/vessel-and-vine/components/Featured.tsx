'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

interface FeaturedProps {
  mobile?: boolean;
}

const CHIPS = ['All', 'Stoneware', 'Porcelain', 'Terracotta', 'Limited'];

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--linen)' : 'var(--ink)',
        border: `1px solid ${active ? 'var(--ink)' : 'var(--border)'}`,
        padding: '9px 16px', fontSize: 11, letterSpacing: '0.16em',
        textTransform: 'uppercase', fontFamily: 'var(--sans)',
        cursor: 'pointer', fontWeight: 500,
      }}
    >{label}</button>
  );
}

export default function Featured({ mobile = false }: FeaturedProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.tag.toLowerCase() === activeFilter.toLowerCase());

  const resetAndScroll = () => {
    setActiveFilter('All');
    document.getElementById('vv-featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vv-featured" style={{ padding: mobile ? '72px 0 24px' : '120px 56px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: mobile ? 'flex-start' : 'flex-end',
        marginBottom: mobile ? 32 : 56,
        padding: mobile ? '0 24px' : 0,
        flexDirection: mobile ? 'column' : 'row',
        gap: mobile ? 18 : 0,
      }}>
        <div>
          <div className="vv-sectionlabel" style={{ marginBottom: mobile ? 18 : 24 }}>The Vessels</div>
          <h2 style={{ fontSize: mobile ? 38 : 64, letterSpacing: '-0.02em' }}>
            New this <em style={{ fontFamily: 'var(--serif)' }}>season.</em>
          </h2>
        </div>
        {!mobile && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {CHIPS.map(chip => (
              <FilterChip key={chip} label={chip} active={activeFilter === chip} onClick={() => setActiveFilter(chip)}/>
            ))}
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
        gap: mobile ? 24 : 40,
        padding: mobile ? '0 16px' : 0,
      }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} compact={mobile}/>
        ))}
      </div>

      {mobile && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, padding: '0 24px' }}>
          <button className="vv-btn vv-btn--ghost" onClick={resetAndScroll} style={{ width: '100%' }}>
            Shop All Ceramics
          </button>
        </div>
      )}
    </section>
  );
}
