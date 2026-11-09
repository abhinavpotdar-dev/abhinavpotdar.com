import { ArrowUpRight, Code2, Globe2, Sparkles } from 'lucide-react'


export default function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="site-header section-wrap">
        <a className="brand" href="#home" aria-label="Abhinav Potdar home">
          <span className="brand-mark">AP</span>
          <span className="brand-copy">
            <strong>ABHINAV POTDAR</strong>
            <small>PERSONAL WEBSITE</small>
          </span>
        </a>
        <div className="header-note"><span className="status-dot" /> A new chapter is taking shape</div>
      </header>

      <main id="main-content">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> A FESTIVE NOTE FROM MY CORNER OF THE WEB</div>
            <div className="festival-label"><Sparkles size={15} strokeWidth={1.7} /> THE FESTIVAL OF LIGHTS</div>
            <h1>Wishing you a<br /><em>bright</em> &amp; beautiful<br />Diwali.</h1>
            <p className="hero-description">
              May this Diwali bring light to your home, joy to your heart,
              and new possibilities to every path ahead.
            </p>
            <div className="signature">
              <span className="signature-rule" />
              <div><small>Warm wishes,</small><strong>Abhinav Potdar &amp; Family</strong></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Diwali artwork featuring a golden diya and mandala">
            <img
              className="diwali-artwork"
              src="/diwali-hero.png"
              alt="A glowing golden diya in front of an ornate golden mandala."
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="progress-card section-wrap" aria-labelledby="progress-title">
          <div className="progress-icon"><Code2 size={21} strokeWidth={1.6} /></div>
          <div className="progress-content">
            <div className="progress-heading">
              <span className="section-kicker">A LITTLE UPDATE</span>
              <span className="progress-pill"><i /> IN PROGRESS</span>
            </div>
            <h2 id="progress-title">Something meaningful is taking shape.</h2>
            <p>
              I’m building my personal website — a space to share my professional journey,
              projects, technical experiments, and passion for technology. It’ll be ready soon.
              Until then, thank you for stopping by.
            </p>
            <div className="progress-track"><span /></div>
            <div className="progress-foot"><span>Building with purpose</span><span>Coming soon</span></div>
          </div>
          <div className="progress-decoration" aria-hidden="true"><Globe2 size={78} strokeWidth={0.7} /></div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="site-link" href="https://www.abhinavpotdar.com" target="_blank" rel="noreferrer">
          <Globe2 size={15} /> www.abhinavpotdar.com <ArrowUpRight size={14} />
        </a>
        <span className="footer-message">Thank you for being here <b>✦</b></span>
        <span className="copyright">© {new Date().getFullYear()} Abhinav Potdar</span>
      </footer>
    </div>
  )
}
