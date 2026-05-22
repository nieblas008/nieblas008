import type { Lang } from '../data/copy';
import { COPY } from '../data/copy';
import { IG_IMAGES, IG_STATS } from '../data/images';
import { HeartIcon, MsgIcon, IgIcon } from './icons';

export default function Instagram({ lang }: { lang: Lang }) {
  const t = COPY[lang].ig;
  return (
    <section id="instagram">
      <div className="section-head">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2>
          {t.title_a}
          <em>{t.title_em}</em>
          {t.title_b}
        </h2>
        <div className="sub">{t.sub}</div>
      </div>

      <div className="ig-grid">
        {IG_IMAGES.map((src, i) => (
          <a
            key={i}
            className="ig-cell"
            href="https://instagram.com/clancy_reimagined"
            target="_blank"
            rel="noreferrer"
            style={{ backgroundImage: `url(${src})` }}
            aria-label={`Instagram post — ${IG_STATS[i].likes} likes`}
          >
            <div className="likes" aria-hidden="true">
              <span>
                <HeartIcon /> {IG_STATS[i].likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
              <span>
                <MsgIcon /> {IG_STATS[i].comments}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="ig-foot">
        <div className="handle">
          {t.handle}
          <small>{t.followers}</small>
        </div>
        <a
          className="follow"
          href="https://instagram.com/clancy_reimagined"
          target="_blank"
          rel="noreferrer"
        >
          <IgIcon /> {t.follow}
        </a>
      </div>
    </section>
  );
}
