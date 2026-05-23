'use client';
import { useRouter } from 'next/navigation';
import ProductImage from './ProductImage';
import { useStore } from '../context/StoreContext';
import type { CartItem } from '../data/products';

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, color: 'var(--ink-soft)' }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function CartLine({ item }: { item: CartItem }) {
  const { setQty, removeItem } = useStore();
  const { product, qty } = item;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: 18, padding: '20px 0', borderBottom: '1px solid var(--border-soft)' }}>
      <ProductImage tone={product.tone} src={product.img} ratio="1 / 1" style={{ width: 84 }}/>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.15, marginBottom: 4 }}>{product.name}</div>
            <div className="meta">{product.sub}</div>
          </div>
          <div className="price" style={{ fontSize: 14 }}>${product.price}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <div className="vv-qty" style={{ height: 32 }}>
            <button onClick={() => setQty(product.id, Math.max(1, qty - 1))} style={{ width: 32 }}>−</button>
            <span style={{ minWidth: 28 }}>{qty}</span>
            <button onClick={() => setQty(product.id, qty + 1)} style={{ width: 32 }}>+</button>
          </div>
          <button
            onClick={() => removeItem(product.id)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--muted)', padding: 0, fontFamily: 'var(--sans)',
            }}
          >Remove</button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { items, subtotal, drawerOpen, closeDrawer } = useStore();
  const router = useRouter();

  const shipping = subtotal >= 150 ? 0 : 8;
  const progress = Math.min(100, (subtotal / 150) * 100);

  const handleCheckout = () => {
    closeDrawer();
    router.push('/vessel-and-vine/checkout');
  };

  if (!drawerOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'auto' }}>
      <div
        onClick={closeDrawer}
        style={{ position: 'absolute', inset: 0, background: 'rgba(43,42,38,0.35)', animation: 'vv-fade-in .25s ease' }}
      />
      <aside style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: 460, maxWidth: '100vw',
        background: 'var(--linen)',
        display: 'flex', flexDirection: 'column',
        animation: 'vv-slide-in .35s cubic-bezier(.2,.7,.2,1)',
        boxShadow: '-12px 0 40px rgba(43,42,38,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', borderBottom: '1px solid var(--border-soft)' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Your Cart</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1 }}>
              {items.length} {items.length === 1 ? 'piece' : 'pieces'}
            </div>
          </div>
          <button onClick={closeDrawer} aria-label="Close cart" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2"/></svg>
          </button>
        </div>

        <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
            <span>{subtotal >= 150 ? 'Free shipping unlocked' : `$${150 - subtotal} until free shipping`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 2, background: 'var(--border)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${progress}%`, background: 'var(--sage-deep)', transition: 'width .5s ease' }}/>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px' }}>
          {items.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--ink)', marginBottom: 12 }}>Your cart is quiet.</div>
              <div style={{ fontSize: 14 }}>Add a piece to begin.</div>
            </div>
          )}
          {items.map(it => <CartLine key={it.product.id} item={it}/>)}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-soft)', padding: '20px 28px 24px' }}>
            <Row label="Subtotal" value={`$${subtotal}.00`}/>
            <Row label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping}.00`}/>
            <div style={{ height: 12 }}/>
            <Row
              label={<strong style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 18 }}>Total</strong>}
              value={<strong style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 22 }}>${subtotal + shipping}.00</strong>}
            />
            <button className="vv-btn" onClick={handleCheckout} style={{ width: '100%', marginTop: 20, padding: '18px 0' }}>
              Proceed to Checkout
            </button>
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              Taxes calculated at checkout
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
