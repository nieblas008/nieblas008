'use client';

import { useState, useEffect } from 'react';
import { GALLERY, SHOP } from '../data/forge';
import SectionHead from './SectionHead';
import { TileSVG } from './ForgeSVG';

function GalleryPhoto({ src, alt, onFail }: { src: string; alt: string; onFail: () => void }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={onFail}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const markFailed = (i: number) =>
    setFailed(prev => new Set([...prev, i]));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen(i => ((i ?? 0) + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft')  setOpen(i => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <SectionHead
          num="03"
          eyebrow="The Work"
          title={
            <>
              Last week&apos;s<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 500 }}>chairs.</em>
            </>
          }
          action={
            <a className="btn btn--link" href={SHOP.instagramUrl} target="_blank" rel="noreferrer">
              {SHOP.instagram} on Instagram ↗
            </a>
          }
        />

        <div className="gallery__grid">
          {GALLERY.map((t, i) => (
            <div
              key={i}
              className={`tile${t.tall ? ' tile--tall' : ''}`}
              onClick={() => setOpen(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(i)}
              aria-label={t.label}
            >
              <div className="tile__art">
                {failed.has(i) ? (
                  <TileSVG tone={t.tone} idx={i} />
                ) : (
                  <GalleryPhoto src={t.photo} alt={t.label} onFail={() => markFailed(i)} />
                )}
              </div>
              <div className="tile__overlay">
                <div className="tile__label">{t.label}</div>
                <div className="tile__ig">View on Instagram ↗</div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery__foot">
          <div className="gallery__handle">
            Follow the shop — <b>{SHOP.instagram}</b>
          </div>
          <a className="btn btn--ghost" href={SHOP.instagramUrl} target="_blank" rel="noreferrer">
            Follow on Instagram
            <span className="arrow">↗</span>
          </a>
        </div>
      </div>

      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lightbox__close" onClick={() => setOpen(null)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
          <button
            className="lightbox__nav prev"
            onClick={(e) => { e.stopPropagation(); setOpen(i => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length); }}
            aria-label="Previous"
          >←</button>
          <button
            className="lightbox__nav next"
            onClick={(e) => { e.stopPropagation(); setOpen(i => ((i ?? 0) + 1) % GALLERY.length); }}
            aria-label="Next"
          >→</button>
          <div className="lightbox__art" onClick={e => e.stopPropagation()}>
            {failed.has(open) ? (
              <TileSVG tone={GALLERY[open].tone} idx={open} />
            ) : (
              <GalleryPhoto
                src={`${GALLERY[open].photo.split('?')[0]}?auto=format&fit=crop&w=900&q=85`}
                alt={GALLERY[open].label}
                onFail={() => markFailed(open)}
              />
            )}
            <div className="lightbox__caption">{GALLERY[open].label}</div>
          </div>
        </div>
      )}
    </section>
  );
}
