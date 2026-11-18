import React from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';

export default function DevelopmentStatus() {
  return (
    <section className="development section-shell" id="in-progress">
      <div className="section-overline"><span /> THE NEXT CHAPTER <span /></div>
      <div className="development-card">
        <div className="card-emblem"><Code2 size={22} strokeWidth={1.4} /></div>
        <div className="status-label"><span className="status-dot pulse" /> WEBSITE IN PROGRESS</div>
        <h2>Something beautiful<br /><i>is taking shape.</i></h2>
        <p className="development-copy">My personal digital space is currently under development. I'm working on something exciting that will bring together my professional journey, technology expertise, projects and experiences.</p>
        <div className="progress-track" aria-label="Website development in progress"><span /></div>
        <div className="card-bottom"><span>CRAFTED WITH PURPOSE</span><span>COMING TO LIFE <ArrowUpRight size={13} /></span></div>
      </div>
    </section>
  );
}