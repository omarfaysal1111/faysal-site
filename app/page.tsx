import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './contact-form';
import { featuredCaseStudy as caseStudy, featuredPortfolioItem as portfolioItem } from './case-studies/data';

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
            <a href="#home" aria-current="page">Home</a>
            <a href="#case-studies">Case Studies &amp; Portfolio</a>
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
              <a className="button button-primary" href="#contact">Request a Commerce Review <span className="text-arrow" aria-hidden="true">↗︎</span></a>
              <a className="button button-quiet" href="#work">See how we think <span className="text-arrow" aria-hidden="true">↓︎</span></a>
            </div>
          </div>
        </div>

        <div className="hero-foot shell">
          <p></p>
          <a href="#services">Explore the studio <span className="text-arrow" aria-hidden="true">↓︎</span></a>
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
                <h3>The buying journey</h3>
                <p>Someone already wants your product and the site makes them work for it. Filters that don&apos;t match how people actually shop. A product page that leaves the one deciding question unanswered. A checkout that asks for the same address twice.</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗︎</span>
            </article>
            <article className="glass-card pressure-card">
              <span className="card-number">02</span>
              <div>
                <h3>How the brand comes across</h3>
                <p>The photography, the packaging and the shop floor all say one thing. The website says &quot;template.&quot; Customers register the difference even when they can&apos;t name it, and it costs you the premium you&apos;ve earned everywhere else.</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗︎</span>
            </article>
            <article className="glass-card pressure-card">
              <span className="card-number">03</span>
              <div>
                <h3>What happens after the order</h3>
                <p>Orders retyped from one system into another. Stock that&apos;s correct in one place and wrong in the other. Someone on your team spending two hours a day being the integration between two tools that don&apos;t talk.</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗︎</span>
            </article>
            <article className="glass-card pressure-card">
              <span className="card-number">04</span>
              <div>
                <h3>What breaks under load</h3>
                <p>The slow page on the day of the sale. The payment method that fails for one bank. The edge case nobody tested. These surface exactly when the traffic is worth the most.</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗︎</span>
            </article>
          </div>
        </div>
      </section>

      <section className="review-section" id="work">
        <div className="shell review-grid">
          <div className="review-copy">
            <p className="section-kicker dark-kicker">Where most clients start</p>
            <h2>Before you pay for a rebuild, find out what actually needs rebuilding.</h2>
            <div className="review-body">
              <p>We spend two weeks going through your storefront twice: once the way a customer does, once the way your operations team does. Then you get one document what we found, what each thing is costing you, and what to do about it in what order. Usually 10 to 14 pages. Fixed fee, and a call to walk you through it.</p>
              <p>If we go looking and there&apos;s nothing worth acting on, we&apos;ll tell you that instead of inventing a project.</p>
            </div>
            <a className="text-link" href="#contact">Request your review <span className="text-arrow" aria-hidden="true">↗︎</span></a>
          </div>

          <div className="report-card">
            <div className="report-topline">
              <p>Commerce Review</p>
              <span>FAYSAL / 001</span>
            </div>
            <div className="report-title">
              <span>Prepared for [Client]</span>
              <h3>What needs fixing,<br />and in what order.</h3>
            </div>
            <div className="report-list">
              <div><span>01</span><p>Buying journey</p><b>Where customers hesitate</b></div>
              <div><span>02</span><p>Brand expression</p><b>What the experience says about you</b></div>
              <div><span>03</span><p>After the order</p><b>Data, systems &amp; manual work</b></div>
              <div><span>04</span><p>Performance &amp; reliability</p><b>What breaks and when</b></div>
            </div>
            <div className="report-footer">
              <p>Output</p>
              <span>A ranked list of fixes, each with effort and expected impact</span>
            </div>
          </div>
        </div>
      </section>

      <section className="case-studies-section" id="case-studies">
        <div className="shell">
          <div className="case-section-heading">
            <div>
              <p className="section-kicker">Case Studies &amp; Portfolio</p>
              <h2>Selected work.</h2>
            </div>
            <div>
              <p>Measured results from client work and selected products built in-house.</p>
              <Link className="button case-more-button" href="/case-studies">Show more <span className="text-arrow" aria-hidden="true">↗︎</span></Link>
            </div>
          </div>

          <Link className="featured-case-study" href={`/case-studies/${caseStudy.slug}`} aria-label={`Read case study: ${caseStudy.title}`}>
            <article>
              <div className="featured-case-copy">
                <div className="case-card-topline">
                  <span>{caseStudy.number}</span>
                  <p>{caseStudy.client} · {caseStudy.location}</p>
                </div>
                <h3>{caseStudy.title}</h3>
                <p>{caseStudy.summary}</p>
                <div className="case-tags" aria-label="Disciplines">
                  {caseStudy.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
                </div>
              </div>
              <div className="featured-case-result">
                <div className="case-orbit" aria-hidden="true"><i /><i /><i /></div>
                <p className="case-outcome-label">Measured outcome</p>
                <div className="case-outcome-value">
                  <strong>{caseStudy.result}</strong>
                  <span>{caseStudy.resultUnit}</span>
                </div>
                <p className="case-outcome-period">{caseStudy.resultPeriod}</p>
                <div className="case-outcome-baseline">
                  <span>Previous baseline</span>
                  <p>{caseStudy.resultBaseline}</p>
                </div>
                <b>Read the case study <span className="text-arrow" aria-hidden="true">↗︎</span></b>
              </div>
            </article>
          </Link>

          <Link className="featured-portfolio" href={`/portfolio/${portfolioItem.slug}`} aria-label={`View portfolio item: ${portfolioItem.title}`}>
            <article>
              <div className="featured-portfolio-copy">
                <div className="portfolio-card-topline">
                  <span>{portfolioItem.number}</span>
                  <p>Portfolio · {portfolioItem.type}</p>
                </div>
                <div className="portfolio-brand-row">
                  <Image src={portfolioItem.icon} alt="Guider app icon" width={72} height={72} />
                  <div><span>Status</span><strong>{portfolioItem.status}</strong></div>
                </div>
                <h3>{portfolioItem.title}</h3>
                <p className="portfolio-descriptor">{portfolioItem.descriptor}</p>
                <p>{portfolioItem.summary}</p>
                <div className="case-tags portfolio-tags" aria-label="Technology">
                  {portfolioItem.stack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <b>View the product <span className="text-arrow" aria-hidden="true">↗︎</span></b>
              </div>
              <div className="featured-portfolio-visual" aria-hidden="true">
                <div className="portfolio-preview-phone portfolio-preview-secondary">
                  <Image src="/portfolio/guider/onboarding.png" alt="" width={638} height={1408} />
                </div>
                <div className="portfolio-preview-phone portfolio-preview-primary">
                  <Image src={portfolioItem.cover} alt="" width={638} height={1408} />
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      <section className="services-section">
        <div className="shell">
          <div className="section-heading compact-heading">
            <p className="section-kicker">What we do</p>
            <h2>Four things.</h2>
          </div>
          <div className="service-list">
            <article><span>01</span><h3>Commerce reviews</h3><p>Two weeks, one document, a ranked list of what to fix. Most people start here, and plenty stop here.</p><b>Review</b></article>
            <article><span>02</span><h3>E-commerce builds</h3><p>Strategy through to launch UX, design, front-end, integrations plus the optimisation work in the months after go-live, which is where most of the gains actually come from.</p><b>Build</b></article>
            <article><span>03</span><h3>Digital products</h3><p>Mobile apps and internal platforms for the workflows a storefront can&apos;t hold: ordering, service, inventory, delivery, field teams.</p><b>Product</b></article>
            <article><span>04</span><h3>Brand and growth</h3><p>Identity, content and campaign work for when the experience is right and not enough people are arriving.</p><b>Grow</b></article>
          </div>
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="shell">
          <div className="approach-intro">
            <div>
              <p className="section-kicker">How we work</p>
              <h2>You&apos;ll be talking to the people doing the work.</h2>
            </div>
            {/* <p>We&apos;re small on purpose. There&apos;s no account manager between you and whoever is drawing the screens or writing the code. That means faster answers, fewer meetings, and a hard limit on how many projects we take at once. If we&apos;re full, we&apos;ll say so.</p> */}
          </div>
          <div className="process-line">
            <article><span>01</span><h3>Two weeks looking</h3><p>Your customer journey, your analytics, and a real conversation with whoever handles orders after they land. The operations side is where the surprises usually are.</p></article>
            <article><span>02</span><h3>A ranked list</h3><p>Not everything is worth fixing. We separate what&apos;s costing you money now from what&apos;s merely annoying, and we&apos;re specific about which is which.</p></article>
            <article><span>03</span><h3>A small team building</h3><p>Usually two or three people, working in short cycles you can watch rather than a black box with a launch date at the end.</p></article>
            <article><span>04</span><h3>Six weeks after launch</h3><p>We stay on long enough to see what real customers do with it and correct what we got wrong. Nobody gets it entirely right the first time.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" />
        <div className="shell contact-grid">
          <div className="contact-copy">
            <p className="section-kicker">Tell us what&apos;s not working</p>
            <h2>What&apos;s your storefront costing you right now?</h2>
            <p>Send us the site, app or workflow you want looked at, and tell us what&apos;s bothering you even if you can&apos;t put your finger on it precisely. We&apos;ll come back with what we&apos;d examine first and an honest read on whether we&apos;re the right people for it.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <div className="footer-viper"><Image src="/viper-icon.png" alt="" width={48} height={48} /></div>
            <div><strong>FAYSAL</strong> <span><a href="mailto:info@faysalstudio.com">info@faysalstudio.com</a></span><span>Commerce &amp; Digital Product Studio</span></div>
          </div>
          <p>Storefronts that sell, and hold up.</p>
          <a href="#home">Back to top <span className="text-arrow" aria-hidden="true">↑︎</span></a>
        </div>
      </footer>
    </main>
  );
}
