'use client';

import { useMemo, useState } from 'react';
import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { MENU, type MenuCategory } from '../data/menu';
import { DownloadIcon } from './icons';

export default function Menu({ lang }: { lang: Lang }) {
  const t = COPY[lang].menu;
  const [active, setActive] = useState<MenuCategory>('drinks');

  const counts = useMemo(
    () => ({
      drinks: MENU.filter((m) => m.cat === 'drinks').length,
      food: MENU.filter((m) => m.cat === 'food').length,
      pastries: MENU.filter((m) => m.cat === 'pastries').length,
    }),
    [],
  );

  const items = MENU.filter((m) => m.cat === active);
  const categories: MenuCategory[] = ['drinks', 'food', 'pastries'];

  return (
    <section id="menu">
      <div className="section-head">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2>
          {t.title_a}
          <em>{t.title_em}</em>
          {t.title_b}
        </h2>
        <div className="sub">{t.sub}</div>
      </div>

      <div className="menu-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-tab${active === cat ? ' active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {t.cats[cat]}
            <span className="ct">{counts[cat]}</span>
          </button>
        ))}
      </div>

      <div className="menu-grid lang-fade" key={lang + '-' + active}>
        {items.map((item) => (
          <article className="menu-card" key={item.name.en}>
            <div
              className="photo"
              style={{ backgroundImage: `url(${item.img})` }}
              role="img"
              aria-label={item.name[lang]}
            >
              <span className="price">{item.price}</span>
              {item.tag && <span className="tag">{item.tag}</span>}
            </div>
            <div className="body">
              <h3>{item.name[lang]}</h3>
              <p className="desc">{item.desc[lang]}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="menu-foot">
        <p>
          {t.foot_a}{' '}
          <a href="#contact" className="foot-link">
            {t.foot_link}
          </a>
        </p>
        <a
          href="#"
          className="download"
          onClick={(e) => e.preventDefault()}
          aria-label="Download full menu PDF"
        >
          <DownloadIcon /> {t.download}
        </a>
      </div>
    </section>
  );
}
