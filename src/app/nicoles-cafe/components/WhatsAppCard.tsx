import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { WaIcon } from './icons';

export default function WhatsAppCard({ lang }: { lang: Lang }) {
  const t = COPY[lang].whatsapp;
  return (
    <section className="tight">
      <div className="whatsapp-card lang-fade" key={lang + '-wa'}>
        <div className="wa-icon" aria-hidden="true">
          <WaIcon style={{ color: '#fff' }} />
        </div>
        <h3>{t.title}</h3>
        <div className="wa-es">{t.es}</div>
        <p className="desc">{t.desc}</p>
        <a
          className="wa-btn"
          href="https://wa.me/526641747593"
          target="_blank"
          rel="noreferrer"
        >
          <WaIcon /> {t.btn}
        </a>
        <div className="wa-number">{t.number}</div>
      </div>
    </section>
  );
}
