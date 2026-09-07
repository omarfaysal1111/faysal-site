import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies } from '../data';

const study = caseStudies[2];

export const metadata: Metadata = {
  title: 'Offline-First Field Sales — FAYSAL Case Study',
  description: 'An offline-first mobile workflow connecting field sales transactions to a cloud ERP.',
  openGraph: {
    title: 'Offline-First Field Sales — FAYSAL Case Study',
    description: 'An offline-first mobile workflow connecting field sales transactions to a cloud ERP.',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Offline-First Field Sales — FAYSAL Case Study',
    description: 'An offline-first mobile workflow connecting field sales transactions to a cloud ERP.',
    images: [],
  },
};

export default function OfflineFirstFieldSalesCaseStudy() {
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
            <Link href="/case-studies" aria-current="page">Case Studies &amp; Portfolio</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#approach">Approach</Link>
          </div>
          <Link className="nav-cta" href="/#contact">Request a Review</Link>
        </nav>

        <div className="shell case-detail-heading">
          <Link className="back-link" href="/case-studies"><span aria-hidden="true">←</span> All work</Link>
          <p className="section-kicker">Case study / {study.number}</p>
          <h1>{study.title}</h1>
          <p className="case-detail-lede">A route-sales application designed to capture invoices, collections, returns and account decisions without a continuous connection.</p>

          <div className="case-detail-meta">
            <div><span>Client</span><p>An anonymized cloud ERP provider serving distribution and wholesale businesses</p></div>
            <div><span>Users</span><p>Outdoor sales teams at the provider&apos;s customer companies</p></div>
            <div><span>Scope</span><p>Field observation, product definition, mobile workflow and ERP synchronisation</p></div>
          </div>
        </div>
      </header>

      <article className="case-report">
        <div className="shell case-report-grid">
          <aside className="study-summary" aria-label="Study summary">
            <p className="report-label">Study summary</p>
            <dl>
              <div><dt>Context</dt><dd>Distribution and wholesale route sales</dd></div>
              <div><dt>Constraint</dt><dd>Intermittent or absent connectivity</dd></div>
              <div><dt>Baseline</dt><dd>Paper invoices followed by delayed ERP entry</dd></div>
              <div><dt>Intervention</dt><dd>Offline-first transactional mobile workflow</dd></div>
              <div><dt>Evidence</dt><dd>Route observation and operational use</dd></div>
            </dl>
            <div className="summary-result summary-result-text">
              <span>Operational result</span>
              <strong>No re-entry</strong>
              <p>after the route when connectivity was unavailable</p>
            </div>
          </aside>

          <div className="case-report-body">
            <section>
              <p className="report-label">Research question</p>
              <h2>Can field transactions reach a cloud ERP without depending on live connectivity?</h2>
              <p>The ERP worked in the office, while its customers generated revenue on sales routes. Connectivity at the counter was intermittent or absent, so salespeople wrote invoices by hand and office staff entered them into the ERP later.</p>
              <p>That gap delayed stock, receivable and cash records. It also meant the salesperson could not reliably review a customer&apos;s outstanding balance before making a credit decision.</p>
              <p className="report-hypothesis"><strong>Working hypothesis:</strong> a route application that remains transactional offline could remove the paper handoff while preserving connection to the ERP system of record.</p>
            </section>

            <section>
              <p className="report-label">Method and intervention</p>
              <h2>Observe the route, then design for no connection.</h2>
              <p>Requirements were derived by observing the sequence, information needs and time pressure of real counter transactions. The product was designed around that field workflow rather than adapting the office interface to a smaller screen.</p>
              <ol className="method-list">
                <li><span>01</span><div><strong>Working data set</strong><p>Pull products, prices, customers, locations, balances and ledger data to the device when a connection is available.</p></div></li>
                <li><span>02</span><div><strong>Offline sales</strong><p>Raise a sales invoice and review the customer account at the counter without a live network.</p></div></li>
                <li><span>03</span><div><strong>Route operations</strong><p>Record cash receipts, sales returns and purchase invoices from the field.</p></div></li>
                <li><span>04</span><div><strong>ERP synchronisation</strong><p>Queue completed work locally and push it automatically when connectivity returns.</p></div></li>
              </ol>
            </section>

            <section>
              <p className="report-label">Observed change</p>
              <h2>Paper was removed from the transaction path.</h2>
              <div className="evidence-table" role="table" aria-label="Observed field-sales result">
                <div role="row"><span role="rowheader">Before</span><p role="cell">Handwritten route invoices entered into the ERP later</p></div>
                <div role="row"><span role="rowheader">During outage</span><p role="cell">Invoices, receipts and returns recorded locally on the device</p></div>
                <div role="row"><span role="rowheader">After connection</span><p role="cell"><strong>Queued transactions synchronised automatically</strong></p></div>
                <div role="row"><span role="rowheader">Credit decision</span><p role="cell">Customer ledger available at the counter instead of relying on memory</p></div>
              </div>
              <p>Removing the handwritten handoff also removed the source of stock shortages caused by van sales leaving without a corresponding system document.</p>
            </section>

            <section>
              <p className="report-label">Interpretation</p>
              <h2>Offline capability expanded the ERP&apos;s usable operating boundary.</h2>
              <p>For the ERP provider, field sales was no longer a workflow that had to remain outside the platform. For its customers, route activity could update stock, receivables and cash automatically when the connection returned rather than waiting for next-day manual entry.</p>
              <p>The implementation described here confirms the operating workflow. Detailed conflict-resolution behaviour for document numbering, price validity and concurrent stock changes sits outside the evidence documented for this study.</p>
              <div className="evidence-note">
                <strong>Evidence note</strong>
                <p>No published route count, invoice volume or comparison period was supplied. This study therefore reports the verified workflow change without attaching an unsupported scale estimate.</p>
              </div>
            </section>

            <div className="report-cta">
              <p>Does part of your operation disappear from the system when connectivity drops?</p>
              <Link className="button button-primary" href="/#contact">Discuss the workflow <span className="text-arrow" aria-hidden="true">↗︎</span></Link>
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
          <Link href="/case-studies">All work <span className="text-arrow" aria-hidden="true">↑︎</span></Link>
        </div>
      </footer>
    </main>
  );
}
