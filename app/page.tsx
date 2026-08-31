import Image from 'next/image';
import ContactForm from './contact-form';

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <nav className="glass-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#home" aria-label="Faysal Studio home">
            <span className="viper-wrap">
              <Image src="/viper-icon.png" alt="" width={42} height={42} priority />
            </span>
           
          </a>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
          </div>
          <a className="nav-cta" href="#contact">Request a Review</a>
        </nav>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Commerce &amp; Digital Product Studio</p>
            <h1>Digital commerce,<br /><em>thoughtfully</em> engineered.</h1>
            <p className="hero-intro">
              We uncover the friction costing ambitious brands customers, time and growth then design and build the experience forward.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Request a Commerce Review <span>↗</span></a>
              <a className="button button-quiet" href="#work">See how we think <span>↓</span></a>
            </div>
          </div>

          <div className="hero-art" aria-label="Faysal Studio identity">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="logo-glass">
              <Image
                src="/faysal-stacked.png"
                alt="Faysal"
                width={1080}
                height={1080}
                priority
              />
              <span className="logo-caption">Independent digital studio · GCC</span>
            </div>
            {/* <div className="floating-note note-top"><span>01</span> Brand expression</div>
            <div className="floating-note note-bottom"><span>02</span> Buying experience</div> */}
          </div>
        </div>

        <div className="hero-foot shell">
          <p></p>
          <a href="#services">Explore the studio <span>↓</span></a>
        </div>
      </section>

      <section className="manifesto section-dark">
        <div className="shell manifesto-grid">
          <p className="section-kicker">The point of view</p>
          <p className="manifesto-copy">
            A premium brand should not have to choose between <em>beautiful</em> and <em>effective.</em> We build digital experiences where brand, buying and technology move as one.
          </p>
        </div>
      </section>

      <section className="pressure-section" id="services">
        <div className="ambient pressure-glow" />
        <div className="shell">
          <div className="section-heading">
            <p className="section-kicker">Where value gets lost</p>
            <h2>Your storefront may look finished.<br />The experience rarely is.</h2>
            <p>We look beneath the surface to find the moments that quietly cost your brand revenue, trust and team capacity.</p>
          </div>

          <div className="pressure-grid">
            <article className="glass-card pressure-card featured-card">
              <span className="card-number">01</span>
              <div>
                <h3>Buying friction</h3>
                <p>Product discovery, decision-making, cart and checkout obstacles that make customers hesitate.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>
            <article className="glass-card pressure-card">
              <span className="card-number">02</span>
              <div>
                <h3>Weak brand expression</h3>
                <p>A generic digital experience that fails to carry the quality and character of the brand.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>
            <article className="glass-card pressure-card">
              <span className="card-number">03</span>
              <div>
                <h3>Operational drag</h3>
                <p>Broken data, repetitive work and disconnected tools that absorb time behind every order.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>
            <article className="glass-card pressure-card">
              <span className="card-number">04</span>
              <div>
                <h3>Technical risk</h3>
                <p>Performance gaps, bugs and edge cases that erode confidence when the experience is under pressure.</p>
              </div>
              <span className="card-arrow">↗</span>
            </article>
          </div>
        </div>
      </section>

      <section className="review-section" id="work">
        <div className="shell review-grid">
          <div className="review-copy">
            <p className="section-kicker dark-kicker">The entry point</p>
            <h2>A clear diagnosis before a costly redesign.</h2>
            <p>Our Commerce Review turns a complex digital storefront into a focused, decision-ready plan. No theatre. No hundred-slide deck. Just evidence, priorities and the clearest route forward.</p>
            <a className="text-link" href="#contact">Request your review <span>↗</span></a>
          </div>

          <div className="report-card">
            <div className="report-topline">
              <p>Commerce Review</p>
              <span>FAYSAL / 001</span>
            </div>
            <div className="report-title">
              <span>Independent review</span>
              <h3>From storefront<br />to operating reality.</h3>
            </div>
            <div className="report-list">
              <div><span>01</span><p>Buying journey</p><b>Friction &amp; clarity</b></div>
              <div><span>02</span><p>Brand expression</p><b>Character &amp; trust</b></div>
              <div><span>03</span><p>Post-order flow</p><b>Data &amp; operations</b></div>
              <div><span>04</span><p>Product quality</p><b>Performance &amp; risk</b></div>
            </div>
            <div className="report-footer">
              <p>Output</p>
              <span>Prioritised action plan</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="shell">
          <div className="section-heading compact-heading">
            <p className="section-kicker">What we build</p>
            <h2>One studio, from clarity<br />to execution.</h2>
          </div>
          <div className="service-list">
            <article><span>01</span><h3>Commerce reviews</h3><p>Evidence-led audits and prioritised action plans.</p><b>Diagnose</b></article>
            <article><span>02</span><h3>E-commerce experiences</h3><p>Strategy, UX, design, development and optimisation.</p><b>Convert</b></article>
            <article><span>03</span><h3>Digital products</h3><p>Mobile apps and complex platforms built around real workflows.</p><b>Scale</b></article>
            <article><span>04</span><h3>Brand &amp; growth systems</h3><p>Identity and marketing support that strengthens the core experience.</p><b>Express</b></article>
          </div>
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="shell">
          <div className="approach-intro">
            <div>
              <p className="section-kicker">Our approach</p>
              <h2>Senior thinking.<br />Less ceremony.</h2>
            </div>
            <p>Small by design and direct by default. You work with the people thinking through the problem—not layers of account management.</p>
          </div>
          <div className="process-line">
            <article><span>01</span><h3>Diagnose</h3><p>Find what matters through the customer journey, data and operating context.</p></article>
            <article><span>02</span><h3>Prioritise</h3><p>Separate urgent revenue and experience issues from expensive distractions.</p></article>
            <article><span>03</span><h3>Build</h3><p>Design and engineer the strongest intervention with a focused team.</p></article>
            <article><span>04</span><h3>Improve</h3><p>Measure, learn and refine after the work meets real customers.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" />
        <div className="shell contact-grid">
          <div className="contact-copy">
            <p className="section-kicker">Start with clarity</p>
            <h2>What is your digital experience quietly costing you?</h2>
            <p>Share the storefront, app or workflow you want us to examine. We will turn the request into a concise brief you can send directly.</p>
            <div className="availability"><span /> Select review engagements available</div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <div className="footer-viper"><Image src="/viper-icon.png" alt="" width={48} height={48} /></div>
            <div><strong>FAYSAL</strong><span>Commerce &amp; Digital Product Studio</span></div>
          </div>
          <p>Digital commerce, thoughtfully engineered.</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
