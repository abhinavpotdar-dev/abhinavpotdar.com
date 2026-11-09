import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Sparkles size={14} /><span>ABHINAV POTDAR</span></div>
      <p>Salesforce Developer <i>·</i> Integration Architect <i>·</i> Technology Enthusiast</p>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Abhinav Potdar. All Rights Reserved.</span><span>MADE WITH <Heart size={11} /> &amp; A LITTLE SPARK</span></div>
    </footer>
  );
}