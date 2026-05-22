import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { HERO_IMAGES } from '../data/images';
import { ArrowIcon, ScrollIcon } from './icons';

export default function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang].hero;
  const [metaA, metaB] = t.meta.split('·').map((s) => s.trim());

  return (
    <section
      className="hero"
      style={{ '--hero-img': `url(${HERO_IMAGES.cafe})` } as React.CSSProperties}
    >
      <div className="hero-meta">
        <span>{metaA}</span>
        <span className="dot" aria-hidden="true" />
        <span>{metaB}</span>
      </div>

      <h1 className="lang-fade" key={lang + '-h1'}>
        {t.title_a}
        <br />
        <em>{t.title_b}</em>
      </h1>

      <p className="tagline lang-fade" key={lang + '-tag'}>
        {t.tagline}
      </p>
      <p className="tagline-es lang-fade" key={lang + '-tag2'}>
        {t.tagline_es}
      </p>

      <div className="hero-ctas">
        <a href="#contact" className="btn btn-primary">
          {t.cta_primary} <ArrowIcon />
        </a>
        <a href="#menu" className="btn btn-ghost">
          {t.cta_secondary}
        </a>
      </div>

      <div className="hero-scroll">
        {t.scroll} <ScrollIcon />
      </div>
    </section>
  );
}
