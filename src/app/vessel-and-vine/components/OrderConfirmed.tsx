'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';

export default function OrderConfirmed() {
  const orderNum = useMemo(() => `VV-${Math.floor(10000 + Math.random() * 90000)}`, []);

  return (
    <div className="vv" style={{ minHeight: '100vh', background: 'var(--linen)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '26px 56px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Wordmark size={24}/>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div className="vv-sectionlabel" style={{ justifyContent: 'center', marginBottom: 28 }}>
          <span style={{ width: 28, height: 1, background: 'var(--muted)', display: 'inline-block' }}/>
          Order Confirmed
          <span style={{ width: 28, height: 1, background: 'var(--muted)', display: 'inline-block' }}/>
        </div>

        <h1 style={{ fontSize: 72, letterSpacing: '-0.025em', lineHeight: 0.95, marginBottom: 32, maxWidth: '12ch' }}>
          Thank you,<br/><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--clay-deep)' }}>truly.</em>
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: '44ch', marginBottom: 12 }}>
          Your order has been placed and is being prepared by hand in our studio. You&apos;ll receive a shipping confirmation with a small portrait of your piece.
        </p>

        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', color: 'var(--muted)', marginBottom: 56 }}>
          {orderNum}
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/vessel-and-vine" className="vv-btn">
            Continue Shopping
          </Link>
          <Link
            href="/vessel-and-vine"
            className="vv-btn vv-btn--ghost"
            style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)' }}
          >
            View Journal
          </Link>
        </div>

        <div style={{ marginTop: 72, padding: '28px 36px', background: 'var(--linen-2)', border: '1px solid var(--border-soft)', maxWidth: 400 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>From the studio</div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
            Every piece leaves wrapped in our greenhouse paper with a small note about the maker. We&apos;re grateful you brought this home.
          </p>
        </div>
      </div>
    </div>
  );
}
