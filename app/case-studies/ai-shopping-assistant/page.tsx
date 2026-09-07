import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { featuredCaseStudy as study } from '../data';

export const metadata: Metadata = {
  title: 'AI Shopping Assistant — FAYSAL Case Study',
  description: 'How a conversational shopping assistant turned previously invisible inventory into more than 150 orders in one month.',
};

export default function AiShoppingAssistantCaseStudy() {
  return (
    <main className="case-detail-page">
      <header className="case-detail-hero">
        <nav className="glass-nav subpage-nav" aria-label="Primary navigation">
          <Link className="brand-mark" href="/" aria-label="Faysal Studio home">
            <span className="viper-wrap">
              <Image src="/viper-icon.png" alt="" width={42} height={42} priority />
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/#services">Services</Link>
          </div>
          <Link className="nav-cta" href="/#contact">Request a Review</Link>
        </nav>

        <div className="shell case-detail-heading">
          <Link className="back-link" href="/case-studies"><span aria-hidden="true">←</span> All case studies</Link>
          <p className="section-kicker">Case study / {study.number}</p>
          <h1>{study.title}</h1>
          <p className="case-detail-lede">A product-discovery experience built around customer questions, connected product data and a clearer path from uncertainty to purchase.</p>

          <div className="case-detail-meta">
            <div><span>Client</span><p>A multi-branch luxury home-appliance retailer in Saudi Arabia</p></div>
            <div><span>Role</span><p>Digital commerce strategy and software architecture</p></div>
            <div><span>Scope</span><p>Conversational product discovery, ERP integration and AI architecture</p></div>
          </div>
        </div>
      </header>

      <section className="case-result-hero" aria-label="Headline result">
        <div className="shell case-result-grid">
          <p>The commercial signal</p>
          <strong>150<span>+</span></strong>
          <h2>orders in one month from three products that had recorded no sales for six consecutive months.</h2>
        </div>
      </section>

      <article className="case-article">
        <div className="shell case-article-grid">
          <aside className="case-rail">
            <p>In this case study</p>
            <a href="#problem">The business problem</a>
            <a href="#role">My role</a>
            <a href="#delivery">What we delivered</a>
            <a href="#adoption">Designing for adoption</a>
            <a href="#constraint">The technical constraint</a>
            <a href="#outcome">The outcome</a>
            <a href="#why">Why this matters</a>
          </aside>

          <div className="case-story">
            <section id="problem">
              <p className="case-section-number">01 / The business problem</p>
              <h2>The catalogue was large. Discoverability was not.</h2>
              <p>The retailer carried a large catalogue of appliances and specialist devices, but customers could not easily discover everything available.</p>
              <p>Some products remained in stock with no sales—not necessarily because customers did not want them, but because many did not know the retailer carried them.</p>
              <p>Another problem appeared closer to purchase. Customers would find a suitable appliance, then hesitate because they could not confidently determine whether its dimensions would fit their home. To get an answer, they had to call customer service, creating delays for the customer and avoidable pressure on the support team.</p>
              <blockquote>The opportunity was not simply to show customers more information. It was to let them ask for exactly what they needed.</blockquote>
            </section>

            <section id="role">
              <p className="case-section-number">02 / My role</p>
              <h2>Reframing discovery around customer intent.</h2>
              <p>As the digital commerce expert and software architect, I reframed the experience around customer intent.</p>
              <p>Instead of waiting for the retailer to anticipate every question, customers should be able to describe what they need, ask about dimensions and specifications, and discover relevant products through a conversation.</p>
              <p>I defined the product concept and software architecture, working with the company&apos;s internal AI engineer to develop the solution.</p>
            </section>

            <section id="delivery">
              <p className="case-section-number">03 / What we delivered</p>
              <h2>A catalogue customers could explore through their own questions.</h2>
              <p>We built a conversational shopping assistant connected to the retailer&apos;s ERP product data.</p>
              <p>Customers could ask about products, specifications, dimensions and other purchasing details using natural language. The assistant could then surface relevant products and provide the practical information customers needed to continue toward a purchase.</p>

              <div className="delivery-grid">
                <article><span>01</span><h3>Natural-language discovery</h3><p>Customers described the need rather than translating it into filters.</p></article>
                <article><span>02</span><h3>ERP-connected answers</h3><p>Recommendations were grounded in the retailer&apos;s own product data.</p></article>
                <article><span>03</span><h3>Practical confidence</h3><p>Dimensions and specifications appeared at the moment of decision.</p></article>
              </div>

              <p>This turned the product catalogue from something customers had to search manually into something they could explore through their own questions.</p>
            </section>

            <section id="adoption">
              <p className="case-section-number">04 / Designing for adoption</p>
              <h2>Make the new behavior impossible to miss.</h2>
              <p>The assistant was not hidden inside a help page or secondary menu.</p>
              <p>We placed it in a prominent floating action button across both the website and mobile app, making it available wherever customers were in the buying journey.</p>
              <p>This positioned conversational discovery as a central part of the shopping experience rather than an optional customer-support feature.</p>
            </section>

            <section id="constraint">
              <p className="case-section-number">05 / The technical constraint</p>
              <h2>Control the experience—and the cost of every conversation.</h2>
              <p>Depending entirely on third-party AI models would introduce ongoing usage fees that increased with every customer conversation.</p>
              <p>To reduce that dependency, we developed a custom assistant with the company&apos;s internal AI engineer and fine-tuned it for the retailer&apos;s product catalogue and shopping use cases.</p>
              <p>This gave the business greater control over operating costs, product knowledge and the future development of the experience.</p>
            </section>
          </div>
        </div>
      </article>

      <section className="case-outcome" id="outcome">
        <div className="shell case-outcome-grid">
          <div>
            <p className="case-section-number">06 / The outcome</p>
            <h2>Previously invisible inventory became commercially active.</h2>
          </div>
          <div className="case-outcome-copy">
            <p>Three products had recorded no sales for six consecutive months.</p>
            <p>After the assistant began recommending them to relevant customers, those products received more than <strong>150 orders in a single month.</strong></p>
            <p>A review of conversation and query logs showed that customers had encountered the products through the assistant&apos;s recommendations before purchasing them.</p>
            <p>The outcome revealed that the original problem was not necessarily a lack of demand. Customers could not buy products they did not know the retailer offered.</p>
          </div>
        </div>
      </section>

      <section className="case-why" id="why">
        <div className="shell case-why-grid">
          <p className="case-section-number">07 / Why this matters</p>
          <div>
            <h2>A large catalogue creates value only when customers can navigate it.</h2>
            <p>For retailers selling considered products, customers often need more than filters and category pages. They need answers about suitability, dimensions and practical fit at the moment they are deciding whether to buy.</p>
            <p>By turning product knowledge into a conversation, the retailer helped customers make decisions with greater confidence while creating demand for inventory that had previously gone unnoticed.</p>
            <Link className="button button-primary" href="/#contact">Discuss a similar problem <span className="text-arrow" aria-hidden="true">↗︎</span></Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <div className="footer-viper"><Image src="/viper-icon.png" alt="" width={48} height={48} /></div>
            <div><strong>FAYSAL</strong><span><a href="mailto:info@faysalstudio.com">info@faysalstudio.com</a></span><span>Commerce &amp; Digital Product Studio</span></div>
          </div>
          <p>Storefronts that sell, and hold up.</p>
          <Link href="/case-studies">All case studies <span className="text-arrow" aria-hidden="true">↑︎</span></Link>
        </div>
      </footer>
    </main>
  );
}
