'use client';
import { useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import AnnounceBar from './AnnounceBar';
import Header from './Header';
import Hero from './Hero';
import Lookbook from './Lookbook';
import Featured from './Featured';
import Story from './Story';
import Plants from './Plants';
import Instagram from './Instagram';
import Newsletter from './Newsletter';
import Footer from './Footer';

export default function StoreHome() {
  const mobile = useIsMobile();

  // Handle hash-based scroll when navigating here from a sub-route
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    setTimeout(attempt, 120);
  }, []);

  return (
    <div className="vv" style={{ width: '100%', background: 'var(--linen)' }}>
      <AnnounceBar/>
      <Header mobile={mobile}/>
      <Hero mobile={mobile}/>
      <Lookbook mobile={mobile}/>
      <Featured mobile={mobile}/>
      <Story mobile={mobile}/>
      <Plants mobile={mobile}/>
      <Instagram mobile={mobile}/>
      <Newsletter mobile={mobile}/>
      <Footer mobile={mobile}/>
    </div>
  );
}
