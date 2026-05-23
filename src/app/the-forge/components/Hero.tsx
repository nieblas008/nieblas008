'use client';

import { SHOP } from '../data/forge';
import { HeroSVG } from './ForgeSVG';

interface Props {
  onJump: (id: string) => void;
}

export default function Hero({ onJump }: Props) {
  return (
    <section id="top" className="hero">
      <div className="hero__photo"><HeroSVG /></div>
      <div className="hero__bg" />
      <div className="hero__scrim" />

      <div className="hero__corner">
        <div className="est">Est. MMXIV · West Loop, Chicago</div>
        <div className="stars">★★★★★ <span className="mono" style={{ color: 'var(--text-mute)', marginLeft: 8, fontSize: 11, letterSpacing: '0.18em' }}>1,287 reviews</span></div>
      </div>

      <div className="hero__inner container">
        <div className="hero__grid">
          <div>
            <div className="hero__eyebrow eyebrow">A Chicago Barbershop · Since 2014</div>
            <h1 className="hero__title">
              Sharp cuts.<br />
              Straight<span className="it"> razors.</span><br />
              Stiff <span className="it">drinks.</span>
            </h1>
            <p className="hero__sub">
              A barbershop for men who give a damn. Hot-towel shaves, scissor cuts,
              and a stiff old-fashioned while you wait — every chair, every time.
            </p>
            <div className="hero__ctas">
              <button className="btn btn--gold" onClick={() => onJump('book')}>
                Book now
                <span className="arrow">↗</span>
              </button>
              <button className="btn btn--ghost" onClick={() => onJump('gallery')}>
                See our work
                <span className="arrow">→</span>
              </button>
            </div>
          </div>

          <div>
            <div className="hero__meta">
              <div className="hero__meta-item">
                <div className="k">Today</div>
                <div className="v">10am — 9pm</div>
              </div>
              <div className="hero__meta-item">
                <div className="k">Walk-ins</div>
                <div className="v gold">Welcome</div>
              </div>
              <div className="hero__meta-item">
                <div className="k">Call</div>
                <a className="v mono" href={SHOP.phoneHref} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 18 }}>
                  {SHOP.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
