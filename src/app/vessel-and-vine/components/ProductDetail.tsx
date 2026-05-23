'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import AnnounceBar from './AnnounceBar';
import Header from './Header';
import Footer from './Footer';
import ProductImage from './ProductImage';
import ProductCard from './ProductCard';
import { useStore } from '../context/StoreContext';
import { getProductBySlug, PRODUCTS, PLANTS } from '../data/products';

interface ProductDetailProps {
  slug: string;
}

const VARIANTS = [
  { name: 'Natural', toneKey: 'product', hexMap: { linen: '#E8DFCB', clay: '#C99479', sage: '#A6B097', shadow: '#5a544b', dusk: '#8E8474', bone: '#DCD2BC', moss: '#7E8A6E' } },
  { name: 'Shadow',  hex: '#5a544b' },
  { name: 'Bone',    hex: '#DCD2BC' },
];

function AccItem({ id, title, open, setOpen, children }: { id: string; title: string; open: string | null; setOpen: (id: string | null) => void; children: React.ReactNode }) {
  const isOpen = open === id;
  return (
    <div className="vv-accordion__item">
      <button
        className="vv-accordion__head"
        onClick={() => setOpen(isOpen ? null : id)}
        style={{ width: '100%', background: 'transparent', border: 'none' }}
      >
        <span>{title}</span>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="vv-accordion__body">{children}</div>}
    </div>
  );
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const mobile  = useIsMobile();
  const router  = useRouter();
  const product = getProductBySlug(slug);
  const { addItem, openDrawer } = useStore();

  const [qty,      setQty]      = useState(1);
  const [activeImg,setActiveImg]= useState(0);
  const [variant,  setVariant]  = useState(0);
  const [openAcc,  setOpenAcc]  = useState<string | null>('materials');
  const [adding,   setAdding]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  if (!product) {
    return (
      <div className="vv" style={{ padding: '120px 56px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 48, marginBottom: 24 }}>Product not found</h1>
        <Link href="/vessel-and-vine" className="vv-btn">Back to Shop</Link>
      </div>
    );
  }

  const isPlant = PLANTS.some(p => p.id === slug);
  const categoryLabel = isPlant ? 'Plants' : 'Ceramics';
  const categorySectionId = isPlant ? 'vv-plants' : 'vv-featured';

  const sourceList = isPlant ? PLANTS : PRODUCTS;
  const related = sourceList.filter(p => p.id !== product.id).slice(0, 4);

  const thumbs = product.gallery?.length
    ? product.gallery.map((src, i) => ({ src, tone: ([product.tone, 'shadow', 'bone', 'sage'][i] || product.tone) }))
    : [{ src: undefined, tone: product.tone }, { src: undefined, tone: 'shadow' }, { src: undefined, tone: 'bone' }, { src: undefined, tone: 'sage' }];

  const toneHex: Record<string, string> = { linen: '#E8DFCB', clay: '#C99479', sage: '#A6B097', shadow: '#5a544b', dusk: '#8E8474', bone: '#DCD2BC', moss: '#7E8A6E' };
  const variantColors = [toneHex[product.tone] ?? '#E8DFCB', '#5a544b', '#DCD2BC'];

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      addItem(product, qty);
      openDrawer();
    }, 600);
  };

  const scrollToCategory = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/vessel-and-vine') {
      document.getElementById(categorySectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/vessel-and-vine#${categorySectionId}`);
    }
  };

  return (
    <div className="vv" style={{ width: '100%', background: 'var(--linen)' }}>
      <AnnounceBar/>
      <Header mobile={mobile}/>

      <div style={{ padding: mobile ? '16px 24px' : '20px 56px', borderBottom: '1px solid var(--border-soft)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', gap: 10 }}>
        <button onClick={scrollToCategory} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Shop</button>
        <span>/</span>
        <button onClick={scrollToCategory} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{categoryLabel}</button>
        <span>/</span>
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.15fr 1fr', gap: mobile ? 0 : 80, padding: mobile ? 0 : '60px 56px 100px', alignItems: 'start' }}>
        {/* Gallery */}
        <div style={{ display: mobile ? 'block' : 'grid', gridTemplateColumns: mobile ? undefined : '80px 1fr', gap: mobile ? 0 : 20 }}>
          {!mobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {thumbs.map((t, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ border: i === activeImg ? '1px solid var(--ink)' : '1px solid var(--border)', padding: 4, background: 'transparent', cursor: 'pointer' }}>
                  <ProductImage tone={t.tone} src={t.src} ratio="1 / 1" style={{ width: 64, height: 64 }}/>
                </button>
              ))}
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <ProductImage
              tone={thumbs[activeImg].tone}
              src={thumbs[activeImg].src}
              ratio={mobile ? '1 / 1' : '4 / 5'}
              tag={`${product.name.toLowerCase()} · view ${activeImg + 1}`}
            />
            {mobile && (
              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                {thumbs.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 24, height: 3, border: 'none', background: i === activeImg ? 'var(--linen)' : 'rgba(245,240,232,0.4)', cursor: 'pointer', padding: 0 }}/>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail */}
        <div style={{ padding: mobile ? '40px 24px 24px' : '20px 0 0', position: mobile ? 'static' : 'sticky', top: 40 }}>
          <div className="vv-sectionlabel" style={{ marginBottom: 18 }}>
            {product.tag} · By {product.maker ?? 'Studio Asari'}
          </div>
          <h1 style={{ fontSize: mobile ? 44 : 60, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 14 }}>{product.name}</h1>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--ink-soft)', marginBottom: 28 }}>{product.sub}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 28, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
            <div className="price" style={{ fontSize: 26, color: 'var(--ink)' }}>${product.price}.00</div>
            <div className="meta">USD · incl. studio packing</div>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 36, maxWidth: '44ch' }}>{product.desc}</p>

          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="vv-label" style={{ marginBottom: 0 }}>Finish</span>
              <span className="meta">{['Natural', 'Shadow', 'Bone'][variant]}</span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {variantColors.map((hex, i) => (
                <button key={i} className="vv-swatch" data-active={i === variant} onClick={() => setVariant(i)} style={{ background: hex }} aria-label={['Natural', 'Shadow', 'Bone'][i]}/>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, marginBottom: 28 }}>
            <div className="vv-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="vv-btn" onClick={handleAdd} style={{ height: 48, padding: '0 28px' }}>
              {adding ? 'Adding…' : 'Add to Cart'}
            </button>
          </div>
          <button
            className="vv-btn vv-btn--ghost"
            onClick={() => setSaved(s => !s)}
            style={{ width: '100%', height: 48, padding: 0, marginBottom: 36 }}
          >
            {saved ? '♥ Saved to Wishlist' : '♡ Save to Wishlist'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--linen-2)', border: '1px solid var(--border-soft)', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 36 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13V5l7-3 7 3v8l-7 3-7-3z" stroke="currentColor" strokeWidth="1"/></svg>
            Packed by hand in recycled paper. Ships within 3 business days.
          </div>

          {product.materials && (
            <div className="vv-accordion">
              <AccItem id="materials" open={openAcc} setOpen={setOpenAcc} title="Materials">
                <p style={{ margin: 0 }}>{product.materials}</p>
                {product.dimensions && <p style={{ margin: '12px 0 0', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>{product.dimensions}</p>}
              </AccItem>
              {product.care && (
                <AccItem id="care" open={openAcc} setOpen={setOpenAcc} title="Care">
                  <p style={{ margin: 0 }}>{product.care}</p>
                </AccItem>
              )}
              <AccItem id="ship" open={openAcc} setOpen={setOpenAcc} title="Shipping & Returns">
                <p style={{ margin: 0 }}>Free shipping on orders over $150. Returns accepted within 14 days of delivery for unused pieces in original packing.</p>
              </AccItem>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: mobile ? '56px 0 72px' : '60px 56px 120px' }}>
        <div style={{ padding: mobile ? '0 24px' : 0, marginBottom: mobile ? 28 : 48 }}>
          <div className="vv-sectionlabel" style={{ marginBottom: 18 }}>The Curator&apos;s Pairings</div>
          <h2 style={{ fontSize: mobile ? 32 : 48, letterSpacing: '-0.015em' }}>
            You might also <em style={{ fontFamily: 'var(--serif)' }}>like.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: mobile ? 20 : 32, padding: mobile ? '0 16px' : 0 }}>
          {related.map(p => <ProductCard key={p.id} product={p} compact/>)}
        </div>
      </section>

      <Footer mobile={mobile}/>
    </div>
  );
}
