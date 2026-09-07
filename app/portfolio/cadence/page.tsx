import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems } from '../../case-studies/data';

const cadence = portfolioItems[1];

export const metadata: Metadata = {
  title: 'Cadence — FAYSAL Portfolio',
  description: 'Product direction, identity and delivery for a bilingual salon booking platform.',
  openGraph: {
    title: 'Cadence — Bilingual Salon Booking Platform',
    description: 'A FAYSAL product profile covering bilingual product design, local payments and SaaS delivery.',
    images: ['https://faysalstudio.com/portfolio/cadence/landing-page.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadence — Bilingual Salon Booking Platform',
    description: 'A FAYSAL product profile covering bilingual product design, local payments and SaaS delivery.',
    images: ['https://faysalstudio.com/portfolio/cadence/landing-page.png'],
  },
};

const productDecisions = [
  {
    number: '01',
    title: 'RTL-native interface',
    text: 'Arabic was treated as a primary layout condition from the start, including direction, spacing, dates, numbers and mixed-direction content.',
  },
  {
    number: '02',
    title: 'Bilingual daily operation',
    text: 'The product supports Arabic client communication alongside English service names, treatments and staff notes in the same workflow.',
  },
  {
    number: '03',
    title: 'Market-specific payments',
    text: 'Paymob supports the Egyptian payment flow and the use of booking deposits without assuming an international payment setup.',
  },
  {
    number: '04',
    title: 'Predictable infrastructure cost',
    text: 'Hetzner-based deployment was selected to keep infrastructure costs legible for a SaaS product serving independent salons.',
  },
] as const;

export default function CadencePortfolioPage() {
  return (
    <main className="cadence-page">
      <header className="cadence-hero">
        <nav className="glass-nav subpage-nav cadence-nav" aria-label="Primary navigation">
          <Link className="brand-mark" href="/" aria-label="Faysal Studio home">
            <span className="viper-wrap">
              <Image src="/viper-icon.png" alt="" width={42} height={42} priority />
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/case-studies" aria-current="page">Case Studies &amp; Portfolio</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#approach">Approach</Link>
          </div>
          <Link className="nav-cta" href="/#contact">Request a Review</Link>
        </nav>

        <div className="shell cadence-hero-grid">
          <div className="cadence-hero-copy">
            <Link className="back-link cadence-back-link" href="/case-studies"><span aria-hidden="true">←</span> All work</Link>
            <div className="cadence-brand-lockup">
              <Image src={cadence.icon} alt="Cadence app icon" width={82} height={82} priority />
              <p>Portfolio / {cadence.type}</p>
            </div>
            <h1>{cadence.title}.</h1>
            <p className="cadence-hero-descriptor">{cadence.descriptor}.</p>
            <p className="cadence-hero-lede">{cadence.summary}</p>
            <div className="cadence-hero-actions">
              <a className="cadence-live-button" href={cadence.productUrl} target="_blank" rel="noreferrer">Visit Cadence <span className="text-arrow" aria-hidden="true">↗︎</span></a>
              <div><span>Status</span><strong>{cadence.status}</strong></div>
            </div>
          </div>

          <div className="cadence-hero-visual">
            <div className="cadence-browser-card cadence-detail-browser">
              <div className="cadence-browser-bar"><i /><i /><i /><span>home.cadence-eg.net</span></div>
              <Image
                src={cadence.cover}
                alt="Cadence website presenting online salon reservations and bilingual scheduling"
                width={3024}
                height={1354}
                priority
                sizes="(max-width: 900px) 92vw, 720px"
              />
            </div>
            <div className="cadence-visual-label cadence-label-left"><span>Language</span><strong>Arabic + English</strong></div>
            <div className="cadence-visual-label cadence-label-right"><span>Primary market</span><strong>Egypt</strong></div>
          </div>
        </div>
      </header>

      <section className="cadence-overview">
        <div className="shell">
          <div className="cadence-section-intro">
            <p className="section-kicker">Product profile</p>
            <div>
              <h2>Reservations, client records and salon schedules in one bilingual system.</h2>
              <p>Cadence gives clients a web link for booking while salon teams manage the operating schedule from a dedicated interface. The product is designed for Arabic and English use from the same foundation.</p>
            </div>
          </div>

          <dl className="cadence-facts">
            <div><dt>Type</dt><dd>Own product · SaaS</dd></div>
            <div><dt>Markets</dt><dd>Egypt first · Gulf second</dd></div>
            <div><dt>Delivery</dt><dd>14-sprint build plan</dd></div>
            <div><dt>Infrastructure</dt><dd>Hetzner · Paymob for Egypt</dd></div>
          </dl>
        </div>
      </section>

      <section className="cadence-flow-section">
        <div className="shell cadence-flow-grid">
          <div className="cadence-flow-heading">
            <p className="section-kicker">Product focus</p>
            <h2>A shorter path from booking intent to a confirmed appointment.</h2>
          </div>
          <div className="cadence-flow-list">
            <article><span>01</span><div><h3>Online reservation link</h3><p>Clients can book from the browser without installing an application.</p></div></article>
            <article><span>02</span><div><h3>Booking deposits</h3><p>A locally integrated payment path supports deposits as part of confirmation.</p></div></article>
            <article><span>03</span><div><h3>Salon schedule</h3><p>Owners and staff operate the day from one scheduling interface.</p></div></article>
            <article><span>04</span><div><h3>Bilingual access</h3><p>Arabic and English are treated as working modes, not separate product editions.</p></div></article>
          </div>
        </div>
      </section>

      <section className="cadence-decisions-section">
        <div className="shell">
          <div className="cadence-decisions-heading">
            <p className="section-kicker">Product decisions</p>
            <h2>Designed for the market it enters.</h2>
          </div>
          <div className="cadence-decision-grid">
            {productDecisions.map((decision) => (
              <article key={decision.number}>
                <span>{decision.number}</span>
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cadence-build-section">
        <div className="shell cadence-build-grid">
          <div>
            <p className="section-kicker">Build &amp; identity</p>
            <h2>One product system, from positioning to delivery.</h2>
          </div>
          <div className="cadence-build-copy">
            <p>The scope was planned across 14 sprints, with a defined ideal customer profile guiding what entered the product. The name, visual identity and interface palette were developed alongside the operational experience.</p>
            <p>The public product site is live. This profile documents the product strategy and delivery choices without making adoption, revenue or customer-outcome claims.</p>
            <a className="cadence-inline-link" href={cadence.productUrl} target="_blank" rel="noreferrer">Open home.cadence-eg.net <span className="text-arrow" aria-hidden="true">↗︎</span></a>
          </div>
        </div>
      </section>

      <section className="cadence-product-cta">
        <div className="shell">
          <Image src={cadence.icon} alt="" width={74} height={74} />
          <p className="section-kicker">Cadence</p>
          <h2>Reservations that keep the day in rhythm.</h2>
          <a className="cadence-live-button cadence-cta-button" href={cadence.productUrl} target="_blank" rel="noreferrer">Visit the product <span className="text-arrow" aria-hidden="true">↗︎</span></a>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <div className="footer-viper"><Image src="/viper-icon.png" alt="" width={48} height={48} /></div>
            <div><strong>FAYSAL</strong><span><a href="mailto:info@faysalstudio.com">info@faysalstudio.com</a></span><span>Commerce &amp; Digital Product Studio</span></div>
          </div>
          <p>Storefronts that sell, and hold up.</p>
          <Link href="/case-studies">All work <span className="text-arrow" aria-hidden="true">↑︎</span></Link>
        </div>
      </footer>
    </main>
  );
}
