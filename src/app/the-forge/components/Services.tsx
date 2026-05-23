'use client';

import { SERVICES, SHOP } from '../data/forge';
import SectionHead from './SectionHead';

interface Props {
  onBook: (serviceId: string | null) => void;
}

export default function Services({ onBook }: Props) {
  return (
    <section id="services" className="section services">
      <div className="container">
        <SectionHead
          num="01"
          eyebrow="Services & Pricing"
          title={
            <>
              <span>What we do,</span><br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 500 }}>and what it costs.</em>
            </>
          }
          lede="Eight services, one philosophy: take your time, do it right, hand the chair back better than you found it."
        />
        <div className="services__grid">
          {SERVICES.map((s) => (
            <article key={s.id} className="service">
              {s.tag && <div className="service__tag">{s.tag}</div>}
              <div className="service__head">
                <h3 className="service__name">{s.name}</h3>
                <div className="service__price">${s.price}</div>
              </div>
              <div className="service__sub">{s.sub}</div>
              <p className="service__desc">{s.desc}</p>
              <div className="service__foot">
                <span>{s.duration}</span>
                <button className="book" onClick={() => onBook(s.id)}>Book →</button>
              </div>
            </article>
          ))}
        </div>
        <div className="services__foot">
          <p>Prices are starting points. Long, dense, or specialty hair may add $10–$20 — your barber will tell you upfront, never at the register.</p>
          <button className="btn btn--ghost" onClick={() => onBook(null)}>
            See full menu & book
            <span className="arrow">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
