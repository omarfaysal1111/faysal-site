import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { featuredPortfolioItem as guider } from '../../case-studies/data';

export const metadata: Metadata = {
  title: 'Guider — FAYSAL Portfolio',
  description: 'Product direction, architecture and delivery for a white-label gym management platform.',
  openGraph: {
    title: 'Guider — White-Label Gym Management Platform',
    description: 'A FAYSAL portfolio item covering product direction, architecture and delivery.',
    images: ['https://faysalstudio.com/portfolio/guider/dashboard.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guider — White-Label Gym Management Platform',
    description: 'A FAYSAL portfolio item covering product direction, architecture and delivery.',
    images: ['https://faysalstudio.com/portfolio/guider/dashboard.png'],
  },
};

const productDecisions = [
  {
    number: '01',
    title: 'Relationship as the primary record',
    text: 'Training plans, attendance, progress, nutrition and communication are organised around the ongoing coach–trainee relationship.',
  },
  {
    number: '02',
    title: 'White-label from the start',
    text: 'Branding and operator configuration were treated as core product requirements, allowing each gym to present the platform as its own.',
  },
  {
    number: '03',
    title: 'Continuity beyond one coach',
    text: 'The gym retains the engagement history, so a trainee can continue with context when staffing or coaching assignments change.',
  },
] as const;

const gallery = [
  {
    src: '/portfolio/guider/onboarding.png',
    alt: 'Guider onboarding screen for choosing coach or trainee mode',
    label: 'Role-based onboarding',
    note: 'Separate starting points for coaches and trainees.',
  },
  {
    src: '/portfolio/guider/workout.png',
    alt: 'Guider workout screen for logging sets, weight and repetitions',
    label: 'Workout execution',
    note: 'Set-level logging, coaching notes and form guidance.',
  },
  {
    src: '/portfolio/guider/completion.png',
    alt: 'Guider workout completion screen with session summary',
    label: 'Completion feedback',
    note: 'Session summaries, streaks and progress reinforcement.',
  },
  {
    src: '/portfolio/guider/progress.png',
    alt: 'Guider progress screen with weight trend and training metrics',
    label: 'Progress records',
    note: 'Training, nutrition, measurements and trends in one view.',
  },
  {
    src: '/portfolio/guider/coach-chat.png',
    alt: 'Guider in-app chat between a trainee and coach',
    label: 'Coach communication',
    note: 'Direct guidance connected to the trainee experience.',
  },
] as const;

export default function GuiderPortfolioPage() {
  return (
    <main className="portfolio-detail-page">
      <header className="guider-hero">
        <nav className="glass-nav subpage-nav guider-nav" aria-label="Primary navigation">
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

        <div className="shell guider-hero-grid">
          <div className="guider-hero-copy">
            <Link className="back-link" href="/case-studies"><span aria-hidden="true">←</span> All work</Link>
            <div className="guider-brand-lockup">
              <Image src={guider.icon} alt="Guider app icon" width={82} height={82} priority />
              <p>Portfolio / {guider.type}</p>
            </div>
            <h1>{guider.title}.</h1>
            <p className="guider-hero-descriptor">{guider.descriptor}</p>
            <p className="guider-hero-lede">{guider.summary}</p>

            <div className="store-actions" aria-label="Guider app links">
              <a href={guider.appStoreUrl} target="_blank" rel="noreferrer">
                <span>View on</span><strong>App Store</strong><i className="text-arrow" aria-hidden="true">↗︎</i>
              </a>
              <a href={guider.playStoreUrl} target="_blank" rel="noreferrer">
                <span>View on</span><strong>Google Play</strong><i className="text-arrow" aria-hidden="true">↗︎</i>
              </a>
            </div>

            <div className="guider-status-line">
              <span>Status</span>
              <strong>{guider.status}</strong>
            </div>
          </div>

          <div className="guider-hero-visual">
            <div className="guider-hero-orbit" aria-hidden="true" />
            <div className="guider-phone guider-hero-phone">
              <Image
                src={guider.cover}
                alt="Guider trainee dashboard showing goals, workout and nutrition"
                width={638}
                height={1408}
                priority
                sizes="(max-width: 900px) 70vw, 420px"
              />
            </div>
            <div className="guider-visual-note guider-note-top"><span>Product</span><strong>Mobile platform</strong></div>
            <div className="guider-visual-note guider-note-bottom"><span>Market</span><strong>Egypt · Saudi path</strong></div>
          </div>
        </div>
      </header>

      <section className="guider-overview">
        <div className="shell">
          <div className="guider-section-intro">
            <p className="section-kicker dark-kicker">Product overview</p>
            <div>
              <h2>Gym management centred on the coach–trainee relationship.</h2>
              <p>Most gym software records memberships, payments and access. Guider extends the operational record into the work that influences a member&apos;s day-to-day experience: goals, training, nutrition, progress and coach communication.</p>
            </div>
          </div>

          <dl className="guider-facts">
            <div><dt>Type</dt><dd>{guider.type}, B2B white-label</dd></div>
            <div><dt>Role</dt><dd>{guider.role}</dd></div>
            <div><dt>Stack</dt><dd>Flutter · Firebase · BLoC</dd></div>
            <div><dt>Markets</dt><dd>Egypt, with a Saudi entry path</dd></div>
          </dl>
        </div>
      </section>

      <section className="guider-gallery-section" aria-labelledby="guider-gallery-title">
        <div className="shell">
          <div className="guider-gallery-heading">
            <p className="section-kicker">Product experience</p>
            <h2 id="guider-gallery-title">From setup to daily accountability.</h2>
            <p>The interface connects onboarding, training, nutrition, progress and communication in one continuous product flow.</p>
          </div>

          <div className="guider-gallery">
            {gallery.map((screen, index) => (
              <figure className={`guider-gallery-item guider-gallery-item-${index + 1}`} key={screen.src}>
                <div className="guider-phone guider-gallery-phone">
                  <Image src={screen.src} alt={screen.alt} width={638} height={1408} sizes="(max-width: 700px) 74vw, 390px" />
                </div>
                <figcaption><strong>{screen.label}</strong><span>{screen.note}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="guider-decisions-section">
        <div className="shell">
          <div className="guider-decisions-heading">
            <p className="section-kicker dark-kicker">Product decisions</p>
            <h2>Built for continuity, ownership and operator control.</h2>
          </div>

          <div className="guider-decision-grid">
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

      <section className="guider-build-section">
        <div className="shell guider-build-grid">
          <div>
            <p className="section-kicker">Build &amp; delivery</p>
            <h2>Product direction through implementation.</h2>
          </div>
          <div className="guider-build-copy">
            <p>The product was built in Flutter with BLoC for application state and Firebase for backend services. Delivery followed a Jira-managed Scrum workflow, with the backlog structured around user and operator outcomes.</p>
            <p>Early discovery came from conversations with gym owners and coaches. The implementation was then shaped for a controlled operator pilot rather than broad release assumptions.</p>
            <div className="guider-next-step">
              <span>Next milestone</span>
              <p>A single-operator pilot over one membership cycle, measuring retention and engagement against the operator&apos;s prior period.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="guider-product-cta">
        <div className="shell">
          <Image src={guider.icon} alt="" width={70} height={70} />
          <p className="section-kicker">Guider</p>
          <h2>Explore the product.</h2>
          <div className="store-actions store-actions-centered">
            <a href={guider.appStoreUrl} target="_blank" rel="noreferrer"><span>View on</span><strong>App Store</strong><i className="text-arrow" aria-hidden="true">↗︎</i></a>
            <a href={guider.playStoreUrl} target="_blank" rel="noreferrer"><span>View on</span><strong>Google Play</strong><i className="text-arrow" aria-hidden="true">↗︎</i></a>
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
          <Link href="/case-studies">All work <span className="text-arrow" aria-hidden="true">↑︎</span></Link>
        </div>
      </footer>
    </main>
  );
}
