'use client';

import React, { useState, useEffect } from 'react';
import { SHOP, HOURS } from '../data/forge';
import SectionHead from './SectionHead';
import { MapSVG } from './ForgeSVG';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [todayDow, setTodayDow] = useState<number | null>(null);

  useEffect(() => {
    setTodayDow(new Date().getDay());
  }, []);

  const dowForRow = (i: number) => (i + 1) % 7;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email';
    if (form.message.trim().length < 8) e.message = 'A few more words';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHead
          num="05"
          eyebrow="Visit · Contact"
          title={
            <>
              Drop in,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 500 }}>drop a line.</em>
            </>
          }
        />

        <div className="contact__grid">
          <div className="contact__col">
            <div className="info">
              <div className="info__row">
                <div className="k">The shop</div>
                <div className="v">812 N. Damen Avenue<br />Chicago, IL 60622</div>
              </div>
              <div className="info__row">
                <div className="k">Call us</div>
                <a className="v mono" href={SHOP.phoneHref} style={{ fontFamily: 'ui-monospace, monospace', fontSize: 20 }}>
                  {SHOP.phone}
                </a>
              </div>
              <div className="info__row">
                <div className="k">Email</div>
                <a className="v" href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
              </div>
              <div className="info__row">
                <div className="k">Hours</div>
                <div className="hours" style={{ marginTop: 4 }}>
                  {HOURS.map((h, i) => {
                    const isToday = todayDow !== null && dowForRow(i) === todayDow;
                    return (
                      <React.Fragment key={h.day}>
                        <div className={`d${isToday ? ' today' : ''}`}>{h.day}</div>
                        <div className={`h${h.closed ? ' closed' : ''}${isToday ? ' today' : ''}`}>{h.hrs}</div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="map">
              <MapSVG />
              <div className="map__pin">
                <div className="dot" />
                <div className="lbl">The Forge</div>
              </div>
            </div>
          </div>

          <div className="contact__col">
            <h3 className="contact__hd">Send us a note</h3>
            <p className="contact__sub">Questions, large-group requests, gift cards. We answer within a business day.</p>

            {sent ? (
              <div className="contact__success">
                <div className="mark">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7 L6 10 L11 4" />
                  </svg>
                </div>
                <div>
                  <div className="t">Note received, {form.name.split(' ')[0]}.</div>
                  <div className="s">We&apos;ll be in touch by end of day. In a hurry? Call the shop — someone&apos;s always at the desk.</div>
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="field--row">
                  <div className="field">
                    <label htmlFor="cname">Name</label>
                    <input
                      id="cname"
                      type="text"
                      placeholder="James McAllister"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                    {errs.name && <div className="field__err">{errs.name}</div>}
                  </div>
                  <div className="field">
                    <label htmlFor="cemail">Email</label>
                    <input
                      id="cemail"
                      type="email"
                      placeholder="james@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    {errs.email && <div className="field__err">{errs.email}</div>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="cmsg">Message</label>
                  <textarea
                    id="cmsg"
                    rows={6}
                    placeholder="Hey — got a wedding party of six on June 14. Can you fit us all in?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                  {errs.message && <div className="field__err">{errs.message}</div>}
                </div>
                <button type="submit" className="btn btn--gold btn--full" style={{ marginTop: 6 }}>
                  Send it
                  <span className="arrow">↗</span>
                </button>
                <p className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-mute)', margin: '8px 0 0' }}>
                  We don&apos;t sell your info. Ever. Period.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
