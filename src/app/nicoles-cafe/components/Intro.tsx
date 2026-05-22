import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';

export default function Intro({ lang }: { lang: Lang }) {
  const t = COPY[lang].intro;
  return (
    <section className="intro tight">
      <div className="mark">{t.mark}</div>
      <p className="lang-fade" key={lang + '-intro'}>
        {t.text[0]}
        <em>{t.text[1]}</em>
        {t.text[2]}
        <em>{t.text[3]}</em>
        {t.text[4]}
        {t.text[5]}
      </p>
    </section>
  );
}
