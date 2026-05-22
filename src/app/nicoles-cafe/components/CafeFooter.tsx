import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { IgIcon } from './icons';

export default function CafeFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang].footer;
  return (
    <footer className="cafe-footer">
      <div className="brand">Nicole&apos;s Café</div>
      <div className="moto">{t.moto}</div>

      <div className="f-grid lang-fade" key={lang + '-footer'}>
        <div className="f-brand-col">
          <div className="brand">Nicole&apos;s Café</div>
          <div className="moto">{t.moto}</div>
        </div>
        <div>
          <h4>{t.visit_h}</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{t.visit_addr}</p>
        </div>
        <div>
          <h4>{t.hours_h}</h4>
          <p className="mono-sm" style={{ whiteSpace: 'pre-line' }}>{t.hours_short}</p>
        </div>
        <div>
          <h4>{t.contact_h}</h4>
          <a href="tel:+526641747593">{t.contact_phone}</a>
          <a href={`mailto:${t.contact_email}`}>{t.contact_email}</a>
        </div>
        <div>
          <h4>{t.follow_h}</h4>
          <a href="https://instagram.com/clancy_reimagined" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>

      <div className="socials">
        <a href="https://instagram.com/clancy_reimagined" target="_blank" rel="noreferrer" aria-label="Instagram">
          <IgIcon />
        </a>
      </div>

      <div className="f-copy">
        <span>{t.rights}</span>
        <span className="f-built">{t.built}</span>
      </div>
    </footer>
  );
}
