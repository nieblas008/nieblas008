'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { HERO_IMAGES } from '../data/images';
import { ArrowIcon, CheckIcon } from './icons';

function defaultDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(19, 0, 0, 0);
  return d.toISOString().slice(0, 16);
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  party: string;
  message: string;
}

export default function Contact({ lang }: { lang: Lang }) {
  const t = COPY[lang].contact;

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', date: '', party: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Set default date on mount (avoids SSR hydration mismatch)
  useEffect(() => {
    setForm((f) => ({ ...f, date: defaultDate(), party: COPY[lang].contact.party_options[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep party option valid when language switches
  useEffect(() => {
    setForm((f) => ({ ...f, party: t.party_options[0] }));
  }, [lang, t.party_options]);

  const setF = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate(): Partial<Record<keyof FormState, string>> {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = t.err_required;
    if (!form.email.trim()) e.email = t.err_required;
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t.err_email;
    if (!form.phone.trim()) e.phone = t.err_required;
    if (!form.date) e.date = t.err_required;
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  }

  function reset() {
    setErrors({});
    setDone(false);
    setForm({ name: '', email: '', phone: '', date: '', party: t.party_options[0], message: '' });
    setTimeout(() => setForm((f) => ({ ...f, date: defaultDate() })), 50);
  }

  const ft = COPY[lang].footer;
  const ht = COPY[lang].hours;

  return (
    <section className="contact" id="contact">
      {/* Mobile section head — hidden on desktop via CSS */}
      <div className="section-head">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2>
          {t.title_a}
          <em>{t.title_em}</em>
          {t.title_b}
        </h2>
        <div className="sub">{t.sub}</div>
      </div>

      {/* Desktop aside — hidden on mobile via CSS */}
      <div className="contact-aside">
        <div className="section-head">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>
            {t.title_a}
            <em>{t.title_em}</em>
            {t.title_b}
          </h2>
          <div className="sub">{t.sub}</div>
        </div>
        <div
          className="contact-photo"
          style={{ backgroundImage: `url(${HERO_IMAGES.table})` }}
          role="img"
          aria-label="Café interior"
        />
        <div className="contact-info">
          <div>
            <div className="info-label">{t.labels.phone}</div>
            <div className="info-val">
              <a href="tel:+526641747593">{ft.contact_phone}</a>
            </div>
          </div>
          <div>
            <div className="info-label">{t.labels.email}</div>
            <div className="info-val">
              <a href={`mailto:${ft.contact_email}`}>{ft.contact_email}</a>
            </div>
          </div>
          <div>
            <div className="info-label">{lang === 'en' ? 'Address' : 'Dirección'}</div>
            <div className="info-val" style={{ whiteSpace: 'pre-line' }}>{ht.addr}</div>
          </div>
        </div>
      </div>

      <div className="contact-form-wrap">
      <div className="form-card lang-fade" key={lang + '-form-' + done}>
        {done ? (
          <div className="form-success">
            <div className="check-circle">
              <CheckIcon />
            </div>
            <h3>{t.success_title}</h3>
            <p>{t.success_msg}</p>
            <button className="btn btn-dark" onClick={reset} style={{ padding: '12px 22px' }}>
              {t.success_again}
            </button>
          </div>
        ) : (
          <form className="form-grid" onSubmit={onSubmit} noValidate>
            <div className={`field${errors.name ? ' error' : ''}`}>
              <label>
                {t.labels.name}
                <span className="label-es">/ {t.labels.name_es}</span>
              </label>
              <input
                value={form.name}
                onChange={setF('name')}
                placeholder={t.placeholders.name}
                autoComplete="name"
              />
              {errors.name && <span className="err-msg">{errors.name}</span>}
            </div>

            <div className={`field${errors.email ? ' error' : ''}`}>
              <label>
                {t.labels.email}
                <span className="label-es">/ {t.labels.email_es}</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={setF('email')}
                placeholder={t.placeholders.email}
                autoComplete="email"
              />
              {errors.email && <span className="err-msg">{errors.email}</span>}
            </div>

            <div className={`field${errors.phone ? ' error' : ''}`}>
              <label>
                {t.labels.phone}
                <span className="label-es">/ {t.labels.phone_es}</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={setF('phone')}
                placeholder={t.placeholders.phone}
                autoComplete="tel"
              />
              {errors.phone && <span className="err-msg">{errors.phone}</span>}
            </div>

            <div className="row-2">
              <div className={`field${errors.date ? ' error' : ''}`}>
                <label>
                  {t.labels.date}
                  <span className="label-es">/ {t.labels.date_es}</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.date}
                  onChange={setF('date')}
                />
                {errors.date && <span className="err-msg">{errors.date}</span>}
              </div>
              <div className="field">
                <label>
                  {t.labels.party}
                  <span className="label-es">/ {t.labels.party_es}</span>
                </label>
                <select value={form.party} onChange={setF('party')}>
                  {t.party_options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label>
                {t.labels.message}
                <span className="label-es">/ {t.labels.message_es}</span>
              </label>
              <textarea
                value={form.message}
                onChange={setF('message')}
                placeholder={t.placeholders.message}
              />
            </div>

            <button type="submit" className="btn btn-primary submit" disabled={submitting}>
              {submitting ? (
                t.submitting
              ) : (
                <>
                  {t.submit} <ArrowIcon />
                </>
              )}
            </button>
            <p className="form-meta">{t.meta}</p>
          </form>
        )}
      </div>
      </div>
    </section>
  );
}
