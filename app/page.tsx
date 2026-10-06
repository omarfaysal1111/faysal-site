import Image from 'next/image';
import ContactForm from './contact-form';
import { caseStudies, featuredCaseStudy as caseStudy, featuredPortfolioItem as portfolioItem } from './case-studies/data';

const rfidCaseStudy = caseStudies[1];
const offlineFirstCaseStudy = caseStudies[2];

const pricingOffers = [
  {
    number: '02',
    slug: 'comprehensive-commerce-review',
    title: 'Comprehensive Commerce Review',
    price: 'From EGP 15,000',
    unit: 'Per review',
    audience: 'Store owners who need a full diagnosis before committing to a rebuild or improvement programme.',
    scope: 'One store, customer journey review, findings report and walkthrough.',
    separate: 'Implementation, additional markets and deeper research.',
    cta: 'Request a Commerce Review',
  },
  {
    number: '03',
    slug: 'ecommerce-build',
    title: 'E-commerce Builds',
    price: 'From EGP 45,000',
    unit: 'Per project',
    audience: 'Brands ready to launch or rebuild a standard platform-based online store.',
    scope: 'Commerce strategy, UX, design, front-end setup and launch on a standard platform.',
    separate: 'Custom integrations, substantial migrations, ongoing optimisation and post-launch support.',
    cta: 'Discuss an E-commerce Build',
  },
  {
    number: '04',
    slug: 'digital-product',
    title: 'Digital Products',
    price: 'From EGP 120,000',
    unit: 'Per project',
    audience: 'Teams turning one operational or customer workflow into a focused digital product.',
    scope: 'A focused first version covering one core workflow.',
    separate: 'Additional workflows, enterprise integrations, extended support and later phases.',
    cta: 'Discuss a Digital Product',
  },
  {
    number: '05',
    slug: 'brand-project',
    title: 'Brand Projects',
    price: 'From EGP 18,000',
    unit: 'Per project',
    audience: 'Businesses that need a clear visual foundation before growing their presence.',
    scope: 'Logo, colours, typography and basic usage guidelines.',
    separate: 'Naming, research, campaign systems, content production and additional applications.',
    cta: 'Discuss a Brand Project',
  },
  {
    number: '06',
    slug: 'ongoing-growth',
    title: 'Ongoing Growth Services',
    price: 'From EGP 12,000/month',
    unit: 'Monthly engagement',
    audience: 'Brands that need ongoing execution around one primary growth channel.',
    scope: 'One primary channel, agreed content volume, planning and reporting.',
    separate: 'Advertising spend, additional channels, third-party subscriptions and production.',
    cta: 'Discuss Ongoing Growth',
  },
] as const;

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
            <a href="/case-studies">Case Studies &amp; Portfolio</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
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
              <a className="button button-primary" href="/?service=comprehensive-commerce-review#contact">Request a Commerce Review <span className="text-arrow" aria-hidden="true">↗︎</span></a>
              <a className="button button-quiet" href="#work">See how we think <span className="text-arrow" aria-hidden="true">↓︎</span></a>
            </div>
            <a className="hero-sprint-link" href="#pricing">Start with the EGP 5,000 Store Improvement Sprint <span className="text-arrow" aria-hidden="true">↓︎</span></a>
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
            <p className="section-kicker dark-kicker">For a deeper diagnosis</p>
            <h2>Before you pay for a rebuild, find out what actually needs rebuilding.</h2>
            <div className="review-body">
              <p>We spend two weeks going through your storefront twice: once the way a customer does, once the way your operations team does. Then you get a 10–14-page document: what we found, what each issue is costing you, and what to do about it in what order, followed by a walkthrough call.</p>
              <p>If we go looking and there&apos;s nothing worth acting on, we&apos;ll tell you that instead of inventing a project.</p>
              <p>This is separate from the EGP 5,000 Store Improvement Sprint. Implementation is priced separately.</p>
            </div>
            <a className="text-link" href="/?service=comprehensive-commerce-review#contact">Request your review <span className="text-arrow" aria-hidden="true">↗︎</span></a>
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
              <a className="button case-more-button" href="/case-studies">Show more <span className="text-arrow" aria-hidden="true">↗︎</span></a>
            </div>
          </div>

          <a className="featured-case-study" href={`/case-studies/${caseStudy.slug}`} aria-label={`Read case study: ${caseStudy.title}`}>
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
          </a>

          <a className="featured-portfolio" href={`/portfolio/${portfolioItem.slug}`} aria-label={`View portfolio item: ${portfolioItem.title}`}>
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
          </a>

          <a className="featured-case-study" href={`/case-studies/${rfidCaseStudy.slug}`} aria-label={`Read case study: ${rfidCaseStudy.title}`}>
            <article>
              <div className="featured-case-copy">
                <div className="case-card-topline">
                  <span>{rfidCaseStudy.number}</span>
                  <p>{rfidCaseStudy.client} · {rfidCaseStudy.location}</p>
                </div>
                <h3>{rfidCaseStudy.title}</h3>
                <p>{rfidCaseStudy.summary}</p>
                <div className="case-tags" aria-label="Disciplines">
                  {rfidCaseStudy.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
                </div>
              </div>
              <div className="featured-case-result">
                <div className="case-orbit" aria-hidden="true"><i /><i /><i /></div>
                <p className="case-outcome-label">Measured outcome</p>
                <div className="case-outcome-value">
                  <strong>{rfidCaseStudy.result}</strong>
                  <span>{rfidCaseStudy.resultUnit}</span>
                </div>
                <p className="case-outcome-period">{rfidCaseStudy.resultPeriod}</p>
                <div className="case-outcome-baseline">
                  <span>Previous baseline</span>
                  <p>{rfidCaseStudy.resultBaseline}</p>
                </div>
                <b>Read the case study <span className="text-arrow" aria-hidden="true">↗︎</span></b>
              </div>
            </article>
          </a>

          <a className="featured-case-study" href={`/case-studies/${offlineFirstCaseStudy.slug}`} aria-label={`Read case study: ${offlineFirstCaseStudy.title}`}>
            <article>
              <div className="featured-case-copy">
                <div className="case-card-topline">
                  <span>{offlineFirstCaseStudy.number}</span>
                  <p>{offlineFirstCaseStudy.client} · {offlineFirstCaseStudy.location}</p>
                </div>
                <h3>{offlineFirstCaseStudy.title}</h3>
                <p>{offlineFirstCaseStudy.summary}</p>
                <div className="case-tags" aria-label="Disciplines">
                  {offlineFirstCaseStudy.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
                </div>
              </div>
              <div className="featured-case-result">
                <div className="case-orbit" aria-hidden="true"><i /><i /><i /></div>
                <p className="case-outcome-label">Measured outcome</p>
                <div className="case-outcome-value">
                  <strong>{offlineFirstCaseStudy.result}</strong>
                  <span>{offlineFirstCaseStudy.resultUnit}</span>
                </div>
                <p className="case-outcome-period">{offlineFirstCaseStudy.resultPeriod}</p>
                <div className="case-outcome-baseline">
                  <span>Previous baseline</span>
                  <p>{offlineFirstCaseStudy.resultBaseline}</p>
                </div>
                <b>Read the case study <span className="text-arrow" aria-hidden="true">↗︎</span></b>
              </div>
            </article>
          </a>
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

      <section className="pricing-section" id="pricing">
        <div className="shell">
          <div className="pricing-heading">
            <div>
              <p className="section-kicker dark-kicker">Services &amp; pricing</p>
              <h2>Start with the scope that fits.</h2>
            </div>
            <p>Prices are in Egyptian pounds. Every engagement begins with a clear scope, with suitability and final pricing confirmed before payment or work begins.</p>
          </div>

          <article className="sprint-card">
            <div className="sprint-card-intro">
              <div className="sprint-card-topline">
                <span>A focused place to start</span>
                <b>01</b>
              </div>
              <h3>Store Improvement Sprint</h3>
              <p>A focused starting point for store owners who want to understand what needs attention and make one practical improvement.</p>
              <div className="sprint-price"><strong>5,000</strong><span>EGP · Fixed scope</span></div>
              <a className="button sprint-button" href="/?service=store-improvement-sprint#contact">Request the EGP 5,000 Sprint <span className="text-arrow" aria-hidden="true">↗︎</span></a>
            </div>
            <div className="sprint-card-scope">
              <p className="pricing-label">Included</p>
              <ul>
                <li>A 20-minute discovery call.</li>
                <li>Review of one typical mobile shopping journey.</li>
                <li>Three prioritised findings with evidence and recommended actions.</li>
                <li>One agreed small improvement, confirmed as feasible before payment.</li>
                <li>A short handover explaining the change and next steps.</li>
              </ul>
              <div className="sprint-exclusions">
                <span>Outside this sprint</span>
                <p>Full market research, brand books, redesigns, complex integrations and unlimited fixes.</p>
              </div>
            </div>
          </article>

          <div className="pricing-grid">
            {pricingOffers.map((offer) => (
              <article className="pricing-card" key={offer.slug}>
                <div className="pricing-card-topline"><span>{offer.number}</span><b>{offer.unit}</b></div>
                <h3>{offer.title}</h3>
                <div className="pricing-card-price">{offer.price}</div>
                <dl>
                  <div><dt>Who it is for</dt><dd>{offer.audience}</dd></div>
                  <div><dt>Starting scope</dt><dd>{offer.scope}</dd></div>
                  <div><dt>Priced separately</dt><dd>{offer.separate}</dd></div>
                </dl>
                <a href={`/?service=${offer.slug}#contact`}>{offer.cta} <span className="text-arrow" aria-hidden="true">↗︎</span></a>
              </article>
            ))}
          </div>

          <p className="pricing-note">All prices are in EGP and cover a defined starting scope. Final pricing is confirmed before work begins. Advertising spend, third-party subscriptions and additional production are quoted separately where applicable.</p>
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
            <article><span>04</span><h3>Six weeks after a build launches</h3><p>For build engagements that explicitly include post-launch support, we stay for six weeks to see what real customers do and correct what needs attention. That support is scoped and priced separately.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" />
        <div className="shell contact-grid">
          <div className="contact-copy">
            <p className="section-kicker">Tell us what&apos;s not working</p>
            <h2>What&apos;s your storefront costing you right now?</h2>
            <p>Choose the offer you&apos;re considering, then send us the site, app or workflow you want looked at. We&apos;ll confirm scope, suitability and the next step before any payment.</p>
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
