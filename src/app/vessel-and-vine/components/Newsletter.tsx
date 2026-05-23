'use client';
import { useState } from 'react';

interface NewsletterProps {
  mobile?: boolean;
}

export default function Newsletter({ mobile = false }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="vv-newsletter" style={{ background: 'var(--linen-2)', padding: mobile ? '64px 24px' : '120px 56px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div className="vv-sectionlabel" style={{ justifyContent: 'center', marginBottom: 22 }}>
          <span style={{ width: 28, height: 1, background: 'var(--muted)', display: 'inline-block' }}/>
          A quiet letter
          <span style={{ width: 28, height: 1, background: 'var(--muted)', display: 'inline-block' }}/>
        </div>
        <h2 style={{ fontSize: mobile ? 36 : 56, letterSpacing: '-0.02em', marginBottom: 22, lineHeight: 1.05 }}>
          New arrivals, studio visits,<br/>and the occasional <em style={{ fontFamily: 'var(--serif)' }}>care guide.</em>
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 36 }}>
          Sent the first Thursday of the month. Unsubscribe whenever — we&apos;ll understand.
        </p>

        {submitted ? (
          <div style={{
            padding: '20px 32px',
            border: '1px solid var(--border-soft)',
            background: 'var(--linen)',
            display: 'inline-block',
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', marginBottom: 6 }}>
              You&apos;re on the list.
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              Look for us the first Thursday of next month.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex', gap: 0,
              maxWidth: 520, margin: '0 auto',
              flexDirection: mobile ? 'column' : 'row',
              borderBottom: mobile ? 'none' : '1px solid var(--ink)',
            }}
          >
            <input
              className="vv-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1,
                border: mobile ? '1px solid var(--ink)' : 'none',
                background: 'transparent',
                padding: mobile ? '16px 20px' : '16px 4px',
                fontSize: 15,
                marginBottom: mobile ? 12 : 0,
                textAlign: mobile ? 'center' : 'left',
              }}
            />
            <button
              className="vv-btn"
              type="submit"
              style={{
                padding: mobile ? '16px 26px' : '16px 0',
                minWidth: mobile ? 'auto' : 140,
                background: 'transparent',
                color: 'var(--ink)',
                border: mobile ? '1px solid var(--ink)' : 'none',
              }}
            >
              Subscribe →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
