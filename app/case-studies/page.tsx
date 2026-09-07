import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies, portfolioItems } from './data';

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio — FAYSAL',
  description: 'Selected client results and products built by FAYSAL Studio.',
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
            <Link href="/case-studies" aria-current="page">Case Studies &amp; Portfolio</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#approach">Approach</Link>
          </div>
          <Link className="nav-cta" href="/#contact">Request a Review</Link>
        </nav>

        <div className="shell subpage-heading">
          <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to the studio</Link>
          <p className="section-kicker">Selected work</p>
          <h1>Case studies &amp; portfolio.</h1>
          <p>Client work with measured outcomes, alongside selected products built in-house.</p>
        </div>
      </header>

      <section className="case-index-section" aria-labelledby="case-index-title">
        <div className="shell">
          <div className="case-index-topline">
            <h2 id="case-index-title">Published work</h2>
            <span>{String(caseStudies.length + portfolioItems.length).padStart(2, '0')} published</span>
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
                    <span>Measured outcome</span>
                    <div>
                      <strong>{study.result}</strong>
                      <b>{study.resultUnit}</b>
                    </div>
                    <p>{study.resultPeriod}</p>
                    <small>{study.resultBaseline}</small>
                  </div>
                  <div className="case-tags" aria-label="Disciplines">
                    {study.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
                  </div>
                </article>
              </Link>
            ))}

            {portfolioItems.map((item) => (
              <Link className="portfolio-list-card" href={`/portfolio/${item.slug}`} key={item.slug}>
                <article>
                  <div className="portfolio-list-copy">
                    <div className="portfolio-card-topline">
                      <span>{item.number}</span>
                      <p>Portfolio · {item.type}</p>
                    </div>
                    <div className="portfolio-list-brand">
                      <Image src={item.icon} alt="Guider app icon" width={64} height={64} />
                      <span>{item.status}</span>
                    </div>
                    <div className="portfolio-list-title">
                      <h3>{item.title}</h3>
                      <p>{item.descriptor}</p>
                    </div>
                    <p className="portfolio-list-summary">{item.summary}</p>
                    <div className="case-tags portfolio-tags" aria-label="Technology">
                      {item.stack.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <b>View portfolio item <span className="text-arrow" aria-hidden="true">↗︎</span></b>
                  </div>
                  <div className="portfolio-list-visual" aria-hidden="true">
                    <div className="portfolio-index-phone portfolio-index-phone-back">
                      <Image src="/portfolio/guider/workout.png" alt="" width={638} height={1408} />
                    </div>
                    <div className="portfolio-index-phone portfolio-index-phone-front">
                      <Image src={item.cover} alt="" width={638} height={1408} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="case-index-cta">
        <div className="shell">
          <p className="section-kicker">Commerce review</p>
          <h2>Review your storefront, product or workflow.</h2>
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
