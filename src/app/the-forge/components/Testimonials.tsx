import { TESTIMONIALS } from '../data/forge';

export default function Testimonials() {
  return (
    <section className="testify">
      <div className="container">
        <div className="testify__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testify__item">
              <div className="testify__stars">★ ★ ★ ★ ★</div>
              <p className="testify__q">"{t.quote}"</p>
              <div className="testify__by"><b>{t.who}</b> · {t.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
