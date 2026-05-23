'use client';

import { useState, useEffect, useMemo } from 'react';
import { SERVICES, TEAM, SHOP } from '../data/forge';
import type { Service, TeamMember } from '../data/forge';
import { BarberSVG } from './ForgeSVG';

interface Props {
  presetService: string | null;
  presetBarber: string | null;
  onConsume: () => void;
}

const STEPS = ['service', 'barber', 'date', 'confirm'] as const;

interface CalCell {
  muted?: true;
  n?: number;
  dow?: number;
  closed?: boolean;
  past?: boolean;
  today?: boolean;
  dateLabel?: string;
}

export default function Booking({ presetService, presetBarber, onConsume }: Props) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [barber, setBarber] = useState<(TeamMember & { name: string; role: string }) | { name: string; role: string } | null>(null);
  const [day, setDay] = useState<CalCell | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (presetService) {
      const s = SERVICES.find(x => x.id === presetService);
      if (s) { setService(s); setStep(1); }
    }
    if (presetBarber) {
      const b = TEAM.find(x => x.name === presetBarber);
      if (b) { setBarber(b); setStep(2); }
    }
    if (presetService || presetBarber) onConsume();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetService, presetBarber]);

  const monthInfo = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const first = new Date(year, month, 1).getDay();
    const daysIn = new Date(year, month + 1, 0).getDate();
    const todayN = now.getDate();
    const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const cells: CalCell[] = [];
    for (let i = 0; i < first; i++) cells.push({ muted: true });
    for (let d = 1; d <= daysIn; d++) {
      const dt = new Date(year, month, d);
      const dow = dt.getDay();
      cells.push({
        n: d,
        dow,
        closed: dow === 1,
        past: d < todayN,
        today: d === todayN,
        dateLabel: dt.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      });
    }
    while (cells.length % 7 !== 0) cells.push({ muted: true });
    return { cells, monthLabel };
  }, []);

  const times = useMemo(() => {
    const list = [
      '10:00', '10:45', '11:30', '12:15', '1:00', '1:45', '2:30', '3:15',
      '4:00', '4:45', '5:30', '6:15', '7:00', '7:45',
    ];
    const seed = ((day?.n ?? 1)) * 7;
    return list.map((t, i) => ({ t, disabled: (i + seed) % 5 === 0 }));
  }, [day]);

  const canNext = [service, barber, (day && time), true][step];

  const handleReset = () => {
    setStep(0); setService(null); setBarber(null); setDay(null); setTime(null);
  };

  const summary = [
    service?.name,
    barber?.name?.split(' ')[0],
    day ? day.dateLabel?.split(',')[0] : null,
    time,
  ].filter(Boolean).join(' · ');

  return (
    <section id="book" className="section booking">
      <div className="container">
        <div className="booking__wrap">
          <div className="booking__copy">
            <div className="eyebrow">04 — Book Online</div>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Pick a chair,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 500 }}>pick a time.</em>
            </h2>
            <p style={{ marginTop: 24 }}>
              Real-time booking, synced to every barber&apos;s calendar. Pick your service, pick your guy, pick your slot —
              we&apos;ll text you a confirmation and a reminder the morning of.
            </p>

            <div className="booking__facts">
              <div className="booking__fact">
                <div className="k">Cancellation</div>
                <div className="v">Free up to 4 hrs</div>
              </div>
              <div className="booking__fact">
                <div className="k">Deposit</div>
                <div className="v">None required</div>
              </div>
              <div className="booking__fact">
                <div className="k">Walk-ins</div>
                <div className="v">Yes — Tue–Sun</div>
              </div>
              <div className="booking__fact">
                <div className="k">Prefer to call?</div>
                <a className="v mono" href={SHOP.phoneHref} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 18 }}>
                  {SHOP.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="widget">
            <div className="widget__chrome">
              <div className="widget__chrome-left">
                <div className="widget__logo">F</div>
                <div className="widget__title">Powered by <b>Booksy</b></div>
              </div>
              <div className="widget__chrome-right">SSL · the-forge.booksy.com</div>
            </div>

            <div className="widget__steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`widget__step${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}>
                  <span className="dot">{i < step ? '✓' : i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            <div className="widget__body">
              {step === 0 && (
                <>
                  <h4 className="widget__hd">Choose a service</h4>
                  <p className="widget__sub">All cuts include consultation, hot-towel rinse, and finish.</p>
                  <div className="opt-list">
                    {SERVICES.slice(0, 6).map(s => (
                      <button
                        key={s.id}
                        className={`opt${service?.id === s.id ? ' is-selected' : ''}`}
                        onClick={() => setService(s)}
                      >
                        <div>
                          <div className="opt__name">{s.name}</div>
                          <div className="opt__sub">{s.duration}</div>
                        </div>
                        <div className="opt__price">${s.price}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h4 className="widget__hd">Pick your barber</h4>
                  <p className="widget__sub">Or choose "Next available" to get in faster.</p>
                  <div className="opt-list">
                    <button
                      className={`opt opt-barber${barber?.name === 'Any' ? ' is-selected' : ''}`}
                      onClick={() => setBarber({ name: 'Any', role: 'Next available' })}
                    >
                      <div className="opt-barber__row">
                        <div className="opt-barber__av" style={{ display: 'grid', placeItems: 'center', color: 'var(--gold)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20 }}>?</div>
                        <div>
                          <div className="opt__name">Next available</div>
                          <div className="opt__sub">Whoever&apos;s open first</div>
                        </div>
                      </div>
                    </button>
                    {TEAM.map(t => (
                      <button
                        key={t.name}
                        className={`opt opt-barber${barber?.name === t.name ? ' is-selected' : ''}`}
                        onClick={() => setBarber(t)}
                      >
                        <div className="opt-barber__row">
                          <div className="opt-barber__av"><BarberSVG tone={t.tone} /></div>
                          <div>
                            <div className="opt__name">{t.name}</div>
                            <div className="opt__sub">{t.spec}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h4 className="widget__hd">Pick a date & time</h4>
                  <p className="widget__sub">{monthInfo.monthLabel} · Closed Mondays</p>
                  <div className="cal">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((l, i) => (
                      <div key={i} className="cal__lbl">{l}</div>
                    ))}
                    {monthInfo.cells.map((c, i) => {
                      if (c.muted) return <div key={i} className="cal__day is-muted" />;
                      if (c.closed) return <div key={i} className="cal__day is-closed">{c.n}</div>;
                      if (c.past) return <div key={i} className="cal__day is-muted">{c.n}</div>;
                      return (
                        <button
                          key={i}
                          className={`cal__day${c.today ? ' is-today' : ''}${day?.n === c.n ? ' is-selected' : ''}`}
                          onClick={() => { setDay(c); setTime(null); }}
                        >
                          {c.n}
                        </button>
                      );
                    })}
                  </div>

                  {day && (
                    <>
                      <div style={{ marginTop: 18, fontFamily: 'var(--f-eye)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--text-mute)', textTransform: 'uppercase' }}>
                        {day.dateLabel} · times available
                      </div>
                      <div className="times">
                        {times.map(({ t, disabled }) => (
                          <button
                            key={t}
                            className={`time${time === t ? ' is-selected' : ''}${disabled ? ' is-disabled' : ''}`}
                            disabled={disabled}
                            onClick={() => setTime(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {step === 3 && (
                <div className="confirm">
                  <div className="confirm__mark">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                  </div>
                  <div className="h3">You&apos;re booked.</div>
                  <div className="body" style={{ color: 'var(--text-dim)', fontSize: 14 }}>
                    A confirmation text just hit your phone. See you in the chair.
                  </div>
                  <div className="confirm__detail">
                    <div className="k">Service</div><div className="v">{service?.name} · ${service?.price}</div>
                    <div className="k">Barber</div><div className="v">{barber?.name}</div>
                    <div className="k">When</div><div className="v">{day?.dateLabel}, {time}</div>
                    <div className="k">Where</div><div className="v">812 N. Damen Ave</div>
                  </div>
                  <button className="btn btn--ghost" style={{ marginTop: 16 }} onClick={handleReset}>
                    Book another
                    <span className="arrow">↗</span>
                  </button>
                </div>
              )}
            </div>

            {step < 3 && (
              <div className="widget__foot">
                <button className="widget__back" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
                  ← Back
                </button>
                <div className="widget__summary">
                  <div className="k">Your booking</div>
                  <div className="v">{summary || 'Nothing selected yet'}</div>
                </div>
                <button className="widget__next" onClick={() => setStep(s => s + 1)} disabled={!canNext}>
                  {step === 2 ? 'Confirm' : 'Next'} →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
