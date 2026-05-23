'use client';

import { TEAM } from '../data/forge';
import SectionHead from './SectionHead';
import { BarberSVG } from './ForgeSVG';

interface Props {
  onBook: (serviceId: null, barberName: string) => void;
}

export default function Team({ onBook }: Props) {
  return (
    <section id="team" className="section team">
      <div className="container">
        <SectionHead
          num="02"
          eyebrow="The Crew"
          title={
            <>
              Four chairs.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 500 }}>Forty-nine years.</em>
            </>
          }
        />
        <div className="team__intro">
          <p className="team__quote">
            "We hire barbers the way we hire anyone — slow, picky, and only if they could do this job in their sleep."
          </p>
          <div className="team__body">
            <p>
              The Forge opened in 2014 in a converted West Loop print shop. Marcus had spent eight years
              in midtown Manhattan and was done with chains. Three barbers, four chairs, and a hand-painted sign
              on Damen Avenue.
            </p>
            <p>
              Twelve years later, the sign still says the same thing. Same four chairs.
              Same belief that a real cut starts with a real conversation.
            </p>
          </div>
        </div>

        <div className="team__grid">
          {TEAM.map((m, i) => (
            <article key={m.name} className="barber">
              <div className="barber__photo">
                <BarberSVG tone={m.tone} />
                <div className="num">0{i + 1}</div>
                <div className="years">
                  <b>{m.years}</b>
                  yrs
                </div>
              </div>
              <div className="barber__info">
                <h3 className="barber__name">{m.name}</h3>
                <div className="barber__role">{m.role}</div>
                <div className="barber__spec">{m.spec}</div>
                <p className="barber__bio">{m.bio}</p>
                <div className="barber__cta">
                  <span>Chair 0{i + 1}</span>
                  <button className="book" onClick={() => onBook(null, m.name)}>
                    Book →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
