'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import Wordmark from './Wordmark';
import ProductImage from './ProductImage';
import { useStore } from '../context/StoreContext';
import type { CartItem } from '../data/products';

type Step = 'contact' | 'shipping' | 'payment';

function StepTab({ n, label, active, onClick }: { n: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        color: active ? 'var(--ink)' : 'var(--muted)',
        borderBottom: active ? '1px solid var(--ink)' : 'none',
        paddingBottom: 10, background: 'none', border: 'none',
        cursor: 'pointer', fontFamily: 'var(--sans)',
        fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
      }}
    >
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{n}</span>
      <span>{label}</span>
    </button>
  );
}

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{title}</h3>
        <span className="meta">{sub}</span>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label className="vv-label">{label}</label>
      {children}
    </div>
  );
}

function ShipOption({ label, desc, price, checked, onSelect }: { label: string; desc: string; price: string; checked: boolean; onSelect: () => void }) {
  return (
    <label
      onClick={onSelect}
      style={{ display: 'grid', gridTemplateColumns: '20px 1fr auto', gap: 14, alignItems: 'center', padding: '14px 16px', border: checked ? '1px solid var(--ink)' : '1px solid var(--border)', marginTop: 8, cursor: 'pointer' }}
    >
      <span style={{ width: 14, height: 14, borderRadius: '50%', border: `1px solid ${checked ? 'var(--ink)' : 'var(--border)'}`, position: 'relative', display: 'inline-block' }}>
        {checked && <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--ink)' }}/>}
      </span>
      <span>
        <div style={{ fontSize: 14, color: 'var(--ink)' }}>{label}</div>
        <div className="meta" style={{ marginTop: 2 }}>{desc}</div>
      </span>
      <span className="price" style={{ fontSize: 13 }}>{price}</span>
    </label>
  );
}

function PayTab({ label, active, onSelect }: { label: string; active: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      style={{ background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--linen)' : 'var(--ink)', border: `1px solid ${active ? 'var(--ink)' : 'var(--border)'}`, padding: '10px 18px', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--sans)', cursor: 'pointer' }}
    >{label}</button>
  );
}

function SummaryLine({ item }: { item: CartItem }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 14, alignItems: 'center', padding: '12px 0' }}>
      <div style={{ position: 'relative' }}>
        <ProductImage tone={item.product.tone} src={item.product.img} ratio="1 / 1" style={{ width: 64 }}/>
        <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--ink)', color: 'var(--linen)', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'var(--sans)' }}>{item.qty}</span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.15 }}>{item.product.name}</div>
        <div className="meta">{item.product.sub}</div>
      </div>
      <div className="price" style={{ fontSize: 14 }}>${item.product.price * item.qty}</div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, color: 'var(--ink-soft)' }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

export default function CheckoutView() {
  const mobile = useIsMobile();
  const router = useRouter();
  const { items, subtotal, clearCart } = useStore();

  const [step,       setStep]      = useState<Step>('contact');
  const [shipChoice, setShipChoice]= useState(0);
  const [payTab,     setPayTab]    = useState(0);
  const [discount,   setDiscount]  = useState('');
  const [discountMsg,setDiscountMsg]= useState('');

  const shipping = subtotal >= 150 ? 0 : [0, 8, 22][shipChoice];
  const tax      = Math.round(subtotal * 0.084);
  const total    = subtotal + shipping + tax;

  const applyDiscount = () => {
    if (discount.toUpperCase() === 'VINE10') setDiscountMsg('Code applied — 10% off');
    else setDiscountMsg('Invalid code');
  };

  const placeOrder = () => {
    clearCart();
    router.push('/vessel-and-vine/order-confirmed');
  };

  if (items.length === 0 && typeof window !== 'undefined' && !window.location.href.includes('order-confirmed')) {
    return (
      <div className="vv" style={{ minHeight: '100vh', background: 'var(--linen)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--ink)' }}>Your cart is quiet.</div>
        <button className="vv-btn" onClick={() => router.push('/vessel-and-vine')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="vv" style={{ width: '100%', minHeight: '100vh', background: 'var(--linen)' }}>
      <header style={{ padding: mobile ? '20px 24px' : '26px 56px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => router.push('/vessel-and-vine')}
          style={{ color: 'var(--ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)' }}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1m4-4L1 5l4 4" stroke="currentColor" strokeWidth="1.2"/></svg>
          Return to Shop
        </button>
        <Wordmark size={mobile ? 18 : 22}/>
        <div className="meta" style={{ fontSize: 11 }}>Secure Checkout</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.2fr 0.9fr', minHeight: mobile ? 'auto' : 800 }}>
        {/* LEFT — form */}
        <div style={{ padding: mobile ? '32px 24px 48px' : '64px 80px 80px' }}>
          <div style={{ maxWidth: 520, margin: mobile ? 0 : '0 0 0 auto' }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 40, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              <StepTab n="01" label="Contact" active={step === 'contact'} onClick={() => setStep('contact')}/>
              <StepTab n="02" label="Shipping" active={step === 'shipping'} onClick={() => setStep('shipping')}/>
              <StepTab n="03" label="Payment" active={step === 'payment'} onClick={() => setStep('payment')}/>
            </div>

            <Section title="Contact" sub="So we can send your order confirmation.">
              <Field label="Email">
                <input className="vv-input" type="email" defaultValue="margot@studiowren.co"/>
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-soft)', marginTop: 12 }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--clay-deep)' }}/>
                Send me the monthly letter (no spam, promise)
              </label>
            </Section>

            <Section title="Shipping" sub="Packed by hand in recycled paper.">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="First name"><input className="vv-input" defaultValue="Margot"/></Field>
                <Field label="Last name"><input className="vv-input" defaultValue="Whitfield"/></Field>
              </div>
              <Field label="Street address" style={{ marginTop: 14 }}><input className="vv-input" defaultValue="2218 NE Alameda St"/></Field>
              <Field label="Apartment, suite (optional)" style={{ marginTop: 14 }}><input className="vv-input" placeholder="—"/></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14, marginTop: 14 }}>
                <Field label="City"><input className="vv-input" defaultValue="Portland"/></Field>
                <Field label="State">
                  <select className="vv-input" defaultValue="OR" style={{ appearance: 'none', paddingRight: 32 }}>
                    <option>OR</option><option>WA</option><option>CA</option>
                  </select>
                </Field>
                <Field label="ZIP"><input className="vv-input" defaultValue="97212"/></Field>
              </div>
              <div style={{ marginTop: 24 }}>
                <span className="vv-label">Delivery method</span>
                <ShipOption label="Studio Delivery" desc="Within 25 mi · Tue & Sat" price="Free"  checked={shipChoice === 0} onSelect={() => setShipChoice(0)}/>
                <ShipOption label="USPS Priority"   desc="3–5 business days"        price="$8.00"  checked={shipChoice === 1} onSelect={() => setShipChoice(1)}/>
                <ShipOption label="UPS Two-Day"     desc="2 business days · insured" price="$22.00" checked={shipChoice === 2} onSelect={() => setShipChoice(2)}/>
              </div>
            </Section>

            <Section title="Payment" sub="All transactions are encrypted.">
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <PayTab label="Card"      active={payTab === 0} onSelect={() => setPayTab(0)}/>
                <PayTab label="Apple Pay" active={payTab === 1} onSelect={() => setPayTab(1)}/>
                <PayTab label="Shop Pay"  active={payTab === 2} onSelect={() => setPayTab(2)}/>
              </div>
              <Field label="Card number"><input className="vv-input" defaultValue="4242  4242  4242  4242" style={{ fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}/></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
                <Field label="Expiration"><input className="vv-input" defaultValue="08 / 28" style={{ fontFamily: 'var(--mono)' }}/></Field>
                <Field label="CVC"><input className="vv-input" defaultValue="•••" style={{ fontFamily: 'var(--mono)' }}/></Field>
              </div>
              <Field label="Name on card" style={{ marginTop: 14 }}><input className="vv-input" defaultValue="Margot Whitfield"/></Field>
            </Section>

            <button className="vv-btn" onClick={placeOrder} style={{ width: '100%', padding: '20px 0', marginTop: 36, fontSize: 13 }}>
              Place Order — ${total}.00
            </button>
            <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              By placing your order, you agree to our terms &amp; care policy
            </div>
          </div>
        </div>

        {/* RIGHT — summary */}
        <aside style={{ background: 'var(--linen-2)', padding: mobile ? '40px 24px' : '64px 80px', borderLeft: mobile ? 'none' : '1px solid var(--border-soft)', borderTop: mobile ? '1px solid var(--border-soft)' : 'none' }}>
          <div style={{ maxWidth: 420, margin: mobile ? 0 : '0 auto 0 0' }}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Order Summary</div>
            <div style={{ marginBottom: 28 }}>
              {items.map(it => <SummaryLine key={it.product.id} item={it}/>)}
            </div>

            <Field label="Discount or gift card">
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="vv-input" placeholder="Enter code" value={discount} onChange={e => setDiscount(e.target.value)} style={{ flex: 1 }}/>
                <button className="vv-btn vv-btn--ghost" onClick={applyDiscount} style={{ padding: '0 22px', height: 48 }}>Apply</button>
              </div>
              {discountMsg && <div style={{ marginTop: 8, fontSize: 12, color: discountMsg.includes('Invalid') ? 'var(--clay)' : 'var(--sage-deep)', letterSpacing: '0.06em' }}>{discountMsg}</div>}
            </Field>

            <div style={{ borderTop: '1px solid var(--border-soft)', marginTop: 28, paddingTop: 24 }}>
              <Row label="Subtotal"       value={`$${subtotal}.00`}/>
              <Row label="Shipping"       value={shipping === 0 ? 'Free' : `$${shipping}.00`}/>
              <Row label="Estimated tax"  value={`$${tax}.00`}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 18, marginTop: 12, borderTop: '1px solid var(--border-soft)', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>Total</span>
                <span>
                  <span className="meta" style={{ marginRight: 8 }}>USD</span>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 28 }}>${total}.00</span>
                </span>
              </div>
            </div>

            <div style={{ marginTop: 36, padding: '20px 22px', background: 'var(--linen)', border: '1px solid var(--border-soft)', fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>A note from the studio</div>
              Every order is hand-wrapped in our greenhouse. We&apos;ll send a small portrait of your piece on its way out.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
