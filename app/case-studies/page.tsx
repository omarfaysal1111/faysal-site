import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies } from './data';

export const metadata: Metadata = {
  title: 'Case Studies — FAYSAL',
  description: 'Selected digital commerce and product work from FAYSAL Studio.',
};

export default function CaseStudiesPage() {
  return (
    <main className="case-index-page">
      <header className="subpage-hero">
        <nav className="glass-nav subpage-nav" aria-label="Primary navigation">
          <Link className="brand-mark" href="/" aria-label="Faysal Studio home">
            <span className="viper-wrap">
              <Image src="/viper-icon.png" alt="" width={42} height={42} priority />
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/case-studies" aria-current="page">Case studies</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#approach">Approach</Link>
          </div>
          <Link className="nav-cta" href="/#contact">Request a Review</Link>
        </nav>

        <div className="shell subpage-heading">
          <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to the studio</Link>
          <p className="section-kicker">Selected work</p>
          <h1>Case studies.</h1>
          <p>How we turn specific commerce problems into products, systems and measurable outcomes.</p>
        </div>
      </header>

      <section className="case-index-section" aria-labelledby="case-index-title">
        <div className="shell">
          <div className="case-index-topline">
            <h2 id="case-index-title">The work, in detail.</h2>
            <span>{String(caseStudies.length).padStart(2, '0')} published</span>
          </div>

          <div className="case-index-grid">
            {caseStudies.map((study) => (
              <Link className="case-list-card" href={`/case-studies/${study.slug}`} key={study.slug}>
                <article>
                  <div className="case-list-meta">
                    <span>{study.number}</span>
                    <p>{study.client} · {study.location}</p>
                  </div>
                  <div className="case-list-main">
                    <div>
                      <h3>{study.title}</h3>
                      <p>{study.summary}</p>
                    </div>
                    <span className="case-list-arrow text-arrow" aria-hidden="true">↗︎</span>
                  </div>
                  <div className="case-list-result">
                    <strong>{study.result}</strong>
                    <p>{study.resultLabel}</p>
                  </div>
                  <div className="case-tags" aria-label="Disciplines">
                    {study.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="case-index-cta">
        <div className="shell">
          <p className="section-kicker">Have a problem like this?</p>
          <h2>Let&apos;s find the part worth fixing first.</h2>
          <Link className="button button-primary" href="/#contact">Request a Commerce Review <span className="text-arrow" aria-hidden="true">↗︎</span></Link>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <div className="footer-viper"><Image src="/viper-icon.png" alt="" width={48} height={48} /></div>
            <div><strong>FAYSAL</strong><span><a href="mailto:info@faysalstudio.com">info@faysalstudio.com</a></span><span>Commerce &amp; Digital Product Studio</span></div>
          </div>
          <p>Storefronts that sell, and hold up.</p>
          <Link href="/">Home <span className="text-arrow" aria-hidden="true">↗︎</span></Link>
        </div>
      </footer>
    </main>
  );
}
