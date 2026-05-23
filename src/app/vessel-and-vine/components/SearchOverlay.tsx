'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, PLANTS } from '../data/products';
import ProductImage from './ProductImage';

const ALL = [...PRODUCTS, ...PLANTS];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  const results = query.length >= 2
    ? ALL.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tag.toLowerCase().includes(query.toLowerCase()) ||
        (p.sub && p.sub.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  if (!searchOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      <div onClick={closeSearch} style={{ position: 'absolute', inset: 0, background: 'rgba(43,42,38,0.4)', animation: 'vv-fade-in .2s ease' }}/>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        background: 'var(--linen)',
        padding: '28px 56px 40px',
        animation: 'vv-slide-down .3s ease',
        boxShadow: '0 8px 40px rgba(43,42,38,0.12)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, borderBottom: '2px solid var(--ink)', paddingBottom: 14 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="9" cy="9" r="6" stroke="var(--muted)" strokeWidth="1.4"/>
              <path d="M14 14l4 4" stroke="var(--muted)" strokeWidth="1.4"/>
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search ceramics, plants, makers…"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}
            />
            <button onClick={closeSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>

          {query.length >= 2 && (
            <div style={{ marginTop: 28 }}>
              {results.length === 0 ? (
                <div style={{ fontSize: 14, color: 'var(--muted)', letterSpacing: '0.06em' }}>No results for &ldquo;{query}&rdquo;</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 24 }}>
                  {results.map(p => (
                    <Link
                      key={p.id}
                      href={`/vessel-and-vine/products/${p.id}`}
                      onClick={closeSearch}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ProductImage tone={p.tone} src={p.img} ratio="4 / 5" alt={p.name}/>
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.15 }}>{p.name}</div>
                        <div className="meta" style={{ marginTop: 3 }}>${p.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div style={{ marginTop: 24, fontSize: 12, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Type to search all products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
