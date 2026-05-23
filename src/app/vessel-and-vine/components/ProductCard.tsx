'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProductImage from './ProductImage';
import { useStore } from '../context/StoreContext';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const [hover, setHover] = useState(false);
  const { addItem, openDrawer } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openDrawer();
  };

  return (
    <Link
      href={`/vessel-and-vine/products/${product.id}`}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <div
        className="vv-card"
        style={{ position: 'relative', cursor: 'pointer' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ProductImage tone={product.tone} src={product.img} tag={product.tag} ratio="4 / 5" alt={product.name}/>
          <div className="vv-card__overlay">
            <button
              className="vv-btn"
              onClick={handleAddToCart}
              style={{ width: '100%', maxWidth: 240, padding: '13px 22px', fontSize: 11 }}
            >
              Add to Cart — ${product.price}
            </button>
          </div>
        </div>
        <div style={{ paddingTop: compact ? 12 : 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: compact ? 17 : 20,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              lineHeight: 1.15,
            }}>{product.name}</div>
            <div className="meta" style={{ marginTop: 4 }}>{product.sub}</div>
          </div>
          <div className="price" style={{ fontSize: compact ? 13 : 14, color: 'var(--ink)' }}>${product.price}</div>
        </div>
      </div>
    </Link>
  );
}
