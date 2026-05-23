'use client';

import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const SECTION_IDS = ['services', 'team', 'gallery', 'book', 'contact'];

export default function ForgeApp() {
  const [active, setActive] = useState('top');
  const [preset, setPreset] = useState<{ service: string | null; barber: string | null }>({
    service: null,
    barber: null,
  });

  const jump = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let cur = 'top';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (y >= el.offsetTop) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-in');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-in'); }),
      { threshold: 0.12 }
    );
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);

  const handleBook = (serviceId: string | null, barberName?: string) => {
    setPreset({ service: serviceId ?? null, barber: barberName ?? null });
    jump('book');
  };

  return (
    <>
      <Nav active={active} onJump={jump} />
      <Hero onJump={jump} />
      <Marquee />
      <Services onBook={(id) => handleBook(id)} />
      <Team onBook={(_, name) => handleBook(null, name)} />
      <Gallery />
      <Booking
        presetService={preset.service}
        presetBarber={preset.barber}
        onConsume={() => setPreset({ service: null, barber: null })}
      />
      <Testimonials />
      <Contact />
      <Footer onJump={jump} />
    </>
  );
}
