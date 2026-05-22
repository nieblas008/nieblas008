'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { MAP_IMAGE, NEIGHBORHOOD_IMG, SCHEDULE, formatTime } from '../data/images';
import { PinIcon, PhoneIcon } from './icons';

interface HoursStatus {
  isOpen: boolean;
  closeTime: string;
  todayIdx: number;
}

export default function HoursLocation({ lang }: { lang: Lang }) {
  const t = COPY[lang].hours;
  const [status, setStatus] = useState<HoursStatus | null>(null);

  useEffect(() => {
    const now = new Date();
    const todayIdx = (now.getDay() + 6) % 7; // 0 = Monday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const { open: [oh, om], close: [ch, cm] } = SCHEDULE[todayIdx];
    const isOpen =
      currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm;
    setStatus({ isOpen, closeTime: formatTime(ch, cm), todayIdx });
  }, []);

  const todayIdx = status?.todayIdx ?? -1;

  const badgeText = status
    ? status.isOpen
      ? lang === 'en'
        ? `Open now · until ${status.closeTime}`
        : `Abierto ahora · hasta las ${status.closeTime}`
      : t.closed_now
    : '—';

  return (
    <section className="hours-wrap" id="hours">
      <div
        className="map"
        style={{ backgroundImage: `url(${MAP_IMAGE})` }}
        aria-label="Map — East 6th Street, Austin TX"
      >
        <div className="pin" aria-hidden="true">
          <div className="dot" />
        </div>
      </div>

      <div className="hours-card lang-fade" key={lang + '-hours'}>
        <div className="badge">
          <span
            className={`live-dot${status && !status.isOpen ? ' closed' : ''}`}
            aria-hidden="true"
          />
          {badgeText}
        </div>

        <h3>{t.neighborhood_title}</h3>
        <p className="addr">{t.addr}</p>

        <ul className="hours-list">
          {t.days.map((day, i) => {
            const { open: [oh, om], close: [ch, cm] } = SCHEDULE[i];
            const isToday = i === todayIdx;
            return (
              <li key={day} className={isToday ? 'today' : ''}>
                <span className="day">
                  {day}
                  {isToday ? ` · ${t.today_suffix}` : ''}
                </span>
                <span className="time">
                  {formatTime(oh, om)} — {formatTime(ch, cm)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="actions">
          <a
            className="btn btn-dark"
            href="https://maps.google.com/?q=1428+East+6th+Street+Austin+TX"
            target="_blank"
            rel="noreferrer"
          >
            <PinIcon /> {t.directions}
          </a>
          <a className="btn btn-line" href="tel:+526641747593">
            <PhoneIcon /> {t.call}
          </a>
        </div>
      </div>

      <div className="neighborhood">
        <div
          className="nbh-photo"
          style={{ backgroundImage: `url(${NEIGHBORHOOD_IMG})` }}
          role="img"
          aria-label="East 6th Street neighborhood"
        />
        <p>
          <strong>{t.neighborhood_title}</strong>
          {t.neighborhood_desc}
        </p>
      </div>
    </section>
  );
}
