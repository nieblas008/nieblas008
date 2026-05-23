'use client';
import ProductImage from './ProductImage';
import { STORY_IMG } from '../data/products';

interface StoryProps {
  mobile?: boolean;
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1, color: 'var(--clay-deep)' }}>{n}</div>
      <div className="meta" style={{ marginTop: 8, maxWidth: '16ch' }}>{label}</div>
    </div>
  );
}

export default function Story({ mobile = false }: StoryProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (mobile) {
    return (
      <section id="vv-story" style={{ padding: '72px 24px', background: 'var(--linen-2)' }}>
        <ProductImage tone="clay" src={STORY_IMG} tag="founder · oona" ratio="4 / 5" style={{ marginBottom: 40 }} eager/>
        <div className="vv-sectionlabel" style={{ marginBottom: 18 }}>Our Story</div>
        <h2 style={{ fontSize: 36, letterSpacing: '-0.015em', marginBottom: 24, lineHeight: 1.05 }}>
          A shop built around <em style={{ fontFamily: 'var(--serif)' }}>two slow things.</em>
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 20 }}>
          Vessel &amp; Vine opened in a converted garden cottage on Linden Avenue in 2021. We carry one thing made of clay and one thing that grows — and we try to do justice to both.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 32 }}>
          Every piece comes from a studio we&apos;ve visited. Every plant is grown in our greenhouse for at least eight weeks before it leaves the shop.
        </p>
        <button
          className="vv-btn vv-btn--link"
          onClick={() => scrollTo('vv-newsletter')}
          style={{ background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', padding: '0 0 4px', cursor: 'pointer' }}
        >
          Read More About Us
        </button>
      </section>
    );
  }

  return (
    <section id="vv-story" style={{ padding: '140px 56px', background: 'var(--linen-2)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ position: 'relative' }}>
          <ProductImage tone="clay" src={STORY_IMG} tag="founder · oona" ratio="3 / 4" eager/>
          <div style={{
            position: 'absolute', bottom: -36, right: -36,
            width: 220, background: 'var(--linen)',
            padding: '24px 28px', border: '1px solid var(--border-soft)',
          }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Visit the Studio</div>
            <div style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              412 Linden Ave<br/>Wed–Sun, 11–6
            </div>
            <a
              href="https://wa.me/526641747593"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 12, color: 'var(--sage-deep)', textDecoration: 'none', letterSpacing: '0.04em' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +52 664 174 7593
            </a>
          </div>
        </div>
        <div style={{ paddingLeft: 32 }}>
          <div className="vv-sectionlabel" style={{ marginBottom: 28 }}>Our Story · est. 2021</div>
          <h2 style={{ fontSize: 64, letterSpacing: '-0.02em', marginBottom: 36, lineHeight: 1.02 }}>
            A shop built around<br/><em style={{ fontFamily: 'var(--serif)' }}>two slow things.</em>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 22, maxWidth: '44ch' }}>
            Vessel &amp; Vine opened in a converted garden cottage on Linden Avenue in 2021. We carry one thing made of clay and one thing that grows — and we try to do justice to both.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 40, maxWidth: '44ch' }}>
            Every piece comes from a studio we&apos;ve visited. Every plant is grown in our small greenhouse for at least eight weeks before it leaves the shop.
          </p>
          <div style={{ display: 'flex', gap: 36, marginBottom: 40 }}>
            <Stat n="14" label="Studios we work with"/>
            <Stat n="62" label="Pieces in the spring catalog"/>
            <Stat n="08" label="Weeks of care, minimum"/>
          </div>
          <button
            className="vv-btn vv-btn--link"
            onClick={() => scrollTo('vv-newsletter')}
            style={{ background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', padding: '0 0 4px', cursor: 'pointer' }}
          >
            Read More About Us
          </button>
        </div>
      </div>
    </section>
  );
}
