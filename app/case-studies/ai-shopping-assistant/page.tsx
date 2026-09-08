import type { Metadata } from 'next';
import Image from 'next/image';
import { featuredCaseStudy as study } from '../data';

export const metadata: Metadata = {
  title: 'AI Shopping Assistant — FAYSAL Case Study',
  description: 'How a conversational shopping assistant turned previously invisible inventory into more than 150 orders in one month.',
  openGraph: {
    title: 'AI Shopping Assistant — FAYSAL Case Study',
    description: 'How a conversational shopping assistant turned previously invisible inventory into more than 150 orders in one month.',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'AI Shopping Assistant — FAYSAL Case Study',
    description: 'How a conversational shopping assistant turned previously invisible inventory into more than 150 orders in one month.',
    images: [],
  },
};

export default function AiShoppingAssistantCaseStudy() {
  return (
    <main className="case-detail-page">
      <header className="case-detail-hero">
        <nav className="glass-nav subpage-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="/" aria-label="Faysal Studio home">
            <span className="viper-wrap">
              <Image src="/viper-icon.png" alt="" width={42} height={42} priority />
            </span>
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/case-studies" aria-current="page">Case Studies &amp; Portfolio</a>
            <a href="/#services">Services</a>
            <a href="/#approach">Approach</a>
          </div>
          <a className="nav-cta" href="/#contact">Request a Review</a>
        </nav>

        <div className="shell case-detail-heading">
          <a className="back-link" href="/case-studies"><span aria-hidden="true">←</span> All work</a>
          <p className="section-kicker">Case study / {study.number}</p>
          <h1>{study.title}</h1>
          <p className="case-detail-lede">Conversational product discovery connected to ERP product data across the retailer&apos;s website and mobile app.</p>

          <div className="case-detail-meta">
            <div><span>Client</span><p>A multi-branch luxury home-appliance retailer in Saudi Arabia</p></div>
            <div><span>Role</span><p>Digital commerce strategy and software architecture</p></div>
            <div><span>Scope</span><p>Conversational product discovery, ERP integration and AI architecture</p></div>
          </div>
        </div>
      </header>

      <article className="case-report">
        <div className="shell case-report-grid">
          <aside className="study-summary" aria-label="Study summary">
            <p className="report-label">Study summary</p>
            <dl>
              <div><dt>Context</dt><dd>Multi-branch luxury appliance retail</dd></div>
              <div><dt>Market</dt><dd>Saudi Arabia</dd></div>
              <div><dt>Baseline</dt><dd>Three products with zero sales for six months</dd></div>
              <div><dt>Intervention</dt><dd>ERP-connected conversational shopping assistant</dd></div>
              <div><dt>Evidence</dt><dd>Conversation, query and order records</dd></div>
            </dl>
            <div className="summary-result">
              <span>Observed result</span>
              <strong>150+</strong>
              <p>orders in one month across the three products</p>
            </div>
          </aside>

          <div className="case-report-body">
            <section>
              <p className="report-label">Research question</p>
              <h2>Can conversational discovery improve product visibility and purchase confidence?</h2>
              <p>The retailer carried a large catalogue of appliances and specialist devices. Customers could not easily discover the full range, and some products remained in stock without sales.</p>
              <p>Customers also lacked confidence when checking dimensions and specifications. Resolving these questions required a customer-service call, adding delay and support workload.</p>
              <p className="report-hypothesis"><strong>Working hypothesis:</strong> allowing customers to describe their needs and ask product-specific questions would improve discovery and reduce uncertainty before purchase.</p>
            </section>

            <section>
              <p className="report-label">Intervention</p>
              <h2>ERP-connected conversational shopping assistant</h2>
              <p>I defined the commerce concept and software architecture with the company&apos;s internal AI engineer. The assistant used the retailer&apos;s ERP product data to answer natural-language questions and recommend relevant products.</p>
              <ol className="method-list">
                <li><span>01</span><div><strong>Product discovery</strong><p>Interpret customer needs expressed in natural language.</p></div></li>
                <li><span>02</span><div><strong>Product information</strong><p>Return specifications, dimensions and practical suitability information.</p></div></li>
                <li><span>03</span><div><strong>Access points</strong><p>Expose the assistant through a prominent floating action button on web and mobile.</p></div></li>
                <li><span>04</span><div><strong>Architecture</strong><p>Fine-tune a custom assistant to reduce third-party model dependency and control operating costs.</p></div></li>
              </ol>
            </section>

            <section>
              <p className="report-label">Observed data</p>
              <h2>Commercial result</h2>
              <div className="evidence-table" role="table" aria-label="Observed result summary">
                <div role="row"><span role="rowheader">Baseline</span><p role="cell">0 sales across 3 products for 6 consecutive months</p></div>
                <div role="row"><span role="rowheader">Exposure</span><p role="cell">Products surfaced in relevant assistant recommendations</p></div>
                <div role="row"><span role="rowheader">Outcome</span><p role="cell"><strong>150+ orders in one month</strong></p></div>
                <div role="row"><span role="rowheader">Evidence source</span><p role="cell">Conversation and query logs reviewed against purchase activity</p></div>
              </div>
              <p>The reviewed logs showed that customers encountered the products through assistant recommendations before purchasing them.</p>
            </section>

            <section>
              <p className="report-label">Interpretation</p>
              <h2>Discoverability was a material constraint.</h2>
              <p>The observed change indicates that the products&apos; previous lack of sales did not necessarily reflect a lack of demand. Customers were more likely to purchase once the catalogue could be explored through questions about need, fit and specifications.</p>
              <p>For considered purchases, conversational access to product knowledge can complement filters and category pages while reducing reliance on customer service.</p>
              <div className="evidence-note">
                <strong>Evidence note</strong>
                <p>This was an observational business result, not a controlled experiment. The available logs support an association between assistant-led discovery and purchases, but they do not isolate every factor that may have influenced conversion.</p>
              </div>
            </section>

            <div className="report-cta">
              <p>Need the same analysis applied to your catalogue or buying journey?</p>
              <a className="button button-primary" href="/#contact">Request a Commerce Review <span className="text-arrow" aria-hidden="true">↗︎</span></a>
            </div>
          </div>
        </div>
      </article>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <div className="footer-viper"><Image src="/viper-icon.png" alt="" width={48} height={48} /></div>
            <div><strong>FAYSAL</strong><span><a href="mailto:info@faysalstudio.com">info@faysalstudio.com</a></span><span>Commerce &amp; Digital Product Studio</span></div>
          </div>
          <p>Storefronts that sell, and hold up.</p>
          <a href="/case-studies">All work <span className="text-arrow" aria-hidden="true">↑︎</span></a>
        </div>
      </footer>
    </main>
  );
}
