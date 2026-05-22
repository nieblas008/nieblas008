'use client';

import { useState } from 'react';
import type { Lang } from './data/copy';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Menu from './components/Menu';
import HoursLocation from './components/HoursLocation';
import WhatsAppCard from './components/WhatsAppCard';
import Instagram from './components/Instagram';
import Contact from './components/Contact';
import CafeFooter from './components/CafeFooter';
import FAB from './components/FAB';

export default function NicolesApp() {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <div className="cafe-wrap">
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Intro lang={lang} />
      <Menu lang={lang} />
      <HoursLocation lang={lang} />
      <WhatsAppCard lang={lang} />
      <Instagram lang={lang} />
      <Contact lang={lang} />
      <CafeFooter lang={lang} />
      <FAB />
    </div>
  );
}
