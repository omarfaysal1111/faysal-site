import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies } from '../data';

const study = caseStudies[1];

export const metadata: Metadata = {
  title: 'RFID Inventory Control — FAYSAL Case Study',
  description: 'How unit-level RFID control reduced a recurring unexplained inventory shortage to zero.',
  openGraph: {
    title: 'RFID Inventory Control — FAYSAL Case Study',
    description: 'How unit-level RFID control reduced a recurring unexplained inventory shortage to zero.',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'RFID Inventory Control — FAYSAL Case Study',
    description: 'How unit-level RFID control reduced a recurring unexplained inventory shortage to zero.',
    images: [],
  },
};

export default function RfidInventoryControlCaseStudy() {
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
          <p className="case-detail-lede">A unit-level inventory system combining UHF RFID, direct BLE integration and a mobile operating workflow.</p>

          <div className="case-detail-meta">
            <div><span>Client</span><p>An anonymized retail operator in Egypt</p></div>
            <div><span>Role</span><p>Hardware evaluation, protocol integration and application delivery</p></div>
            <div><span>Stack</span><p>Flutter · BLE · UHF RFID (UR-3ED4)</p></div>
          </div>
        </div>
      </header>

      <article className="case-report">
        <div className="shell case-report-grid">
          <aside className="study-summary" aria-label="Study summary">
            <p className="report-label">Study summary</p>
            <dl>
              <div><dt>Context</dt><dd>Retail inventory reconciliation</dd></div>
              <div><dt>Market</dt><dd>Egypt</dd></div>
              <div><dt>Baseline</dt><dd>$250–500 unexplained shortage per month for four months</dd></div>
              <div><dt>Intervention</dt><dd>Unit-level UHF RFID inventory control</dd></div>
              <div><dt>Evidence</dt><dd>Stock counts and recorded unit movements</dd></div>
            </dl>
            <div className="summary-result">
              <span>Observed result</span>
              <strong>$0</strong>
              <p>unexplained shortage from the first month of operation</p>
            </div>
          </aside>

          <div className="case-report-body">
            <section>
              <p className="report-label">Research question</p>
              <h2>Can unit-level tracking make recurring inventory variance traceable?</h2>
              <p>For four consecutive months, the operator&apos;s stock count showed an unexplained shortage of $250 to $500. Repeated manual counts did not identify whether the variance came from counting, receiving or unrecorded movement.</p>
              <p>The operational problem was therefore larger than the loss itself: reorder and inventory decisions depended on a stock figure the owner could not verify.</p>
              <p className="report-hypothesis"><strong>Working hypothesis:</strong> identifying every unit and recording its movement would replace disputed aggregate counts with a traceable inventory history.</p>
            </section>

            <section>
              <p className="report-label">Intervention</p>
              <h2>Direct UHF RFID integration inside the operator&apos;s workflow</h2>
              <p>UHF RFID was selected for its read range and ability to identify multiple tagged units in one pass. Before implementation, tag economics were assessed for the Egyptian market to verify that unit-level tagging was proportionate to the inventory value.</p>
              <ol className="method-list">
                <li><span>01</span><div><strong>Hardware selection</strong><p>Specify the UR-3ED4 reader for bulk shelf and stockroom reading.</p></div></li>
                <li><span>02</span><div><strong>Protocol integration</strong><p>Map the reader protocol directly over BLE at the GATT layer because no usable platform SDK was available.</p></div></li>
                <li><span>03</span><div><strong>Mobile workflow</strong><p>Build a Flutter application that surfaces variance against expected stock during the count.</p></div></li>
                <li><span>04</span><div><strong>Unit accountability</strong><p>Assign each item an identity and record movement time and handler without vendor middleware or manual re-entry.</p></div></li>
              </ol>
            </section>

            <section>
              <p className="report-label">Observed data</p>
              <h2>Inventory shortage result</h2>
              <div className="evidence-table" role="table" aria-label="Observed inventory result">
                <div role="row"><span role="rowheader">Baseline period</span><p role="cell">4 consecutive months</p></div>
                <div role="row"><span role="rowheader">Baseline variance</span><p role="cell">$250–500 unexplained shortage per month</p></div>
                <div role="row"><span role="rowheader">Post-launch</span><p role="cell"><strong>$0 unexplained shortage from month one</strong></p></div>
                <div role="row"><span role="rowheader">Operational change</span><p role="cell">Variance could be reconciled against recorded unit movements</p></div>
              </div>
              <p>The movement data exposed a specific internal cause. The owner identified and resolved it without requiring the cause to be disclosed publicly.</p>
            </section>

            <section>
              <p className="report-label">Interpretation</p>
              <h2>Traceability resolved both the shortage and the uncertainty.</h2>
              <p>The system did more than accelerate counting. It changed the available evidence from an aggregate discrepancy to a unit-level movement record, allowing the operator to investigate variance and act on a defined cause.</p>
              <p>RFID economics remain category-dependent. The value of the protected inventory must justify the tag, hardware and implementation cost.</p>
              <div className="evidence-note">
                <strong>Evidence note</strong>
                <p>This is an anonymized operational before-and-after result, not a controlled experiment. Catalogue size, location count and the underlying internal cause are intentionally not asserted.</p>
              </div>
            </section>

            <div className="report-cta">
              <p>Need reliable inventory data across shelves, stockrooms or field operations?</p>
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
