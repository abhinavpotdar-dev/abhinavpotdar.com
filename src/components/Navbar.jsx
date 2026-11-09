import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Abhinav Potdar home">
        <span className="brand-mark"><Sparkles size={17} strokeWidth={1.5} /></span>
        <span>ABHINAV <b>POTDAR</b></span>
      </a>
      <a className="header-note" href="#in-progress"><span className="status-dot" /> PERSONAL WEBSITE <span className="header-divider">/</span> IN PROGRESS</a>
    </header>
  );
}