import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

function Diya({ className = '' }) {
  return (
    <div className={`diya ${className}`} aria-hidden="true">
      <div className="flame"><span /></div>
      <div className="diya-bowl"><i /><i /><i /></div>
      <div className="diya-base" />
      <div className="diya-glow" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-topline"><span className="eyebrow-line" /> A FESTIVAL OF LIGHT, HOPE & NEW BEGINNINGS <span className="eyebrow-line" /></div>
      <div className="hero-copy">
        <div className="ornament"><Sparkles size={16} /><span>LIGHT • LOVE • PROSPERITY</span><Sparkles size={16} /></div>
        <h1 className="devanagari">शुभ दीपावली</h1>
        <p className="hero-kicker">HAPPY <span>DIWALI</span></p>
        <div className="gold-rule"><span /></div>
        <p className="hero-message">May the festival of lights illuminate your life with<br className="desktop-break" /> happiness, prosperity, peace and endless possibilities.</p>
        <p className="hero-wish">Wishing you and your family a very Happy Diwali!</p>
        <div className="signature">
          <span>WITH WARM WISHES</span>
          <strong>Abhinav Potdar <em>&amp; Family</em></strong>
        </div>
      </div>
      <div className="hero-decor" aria-hidden="true">
        <div className="mandala mandala-left"><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="mandala mandala-right"><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <Diya className="diya-left" />
        <Diya className="diya-right" />
        <div className="floor-light" />
      </div>
      <a className="scroll-cue" href="#in-progress"><span>DISCOVER WHAT'S NEXT</span><ArrowDown size={15} /></a>
    </section>
  );
}