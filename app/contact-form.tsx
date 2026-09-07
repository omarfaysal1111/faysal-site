'use client';

import { FormEvent, useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  async function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const brief = [
      'Commerce Review Request',
      `Name: ${form.get('name')}`,
      `Company: ${form.get('company')}`,
      `Work email: ${form.get('email')}`,
      `Link to your site or app: ${form.get('website')}`,
      `What's bothering you most: ${form.get('challenge')}`,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Commerce Review Request', text: brief });
        setStatus('Ready. Your request has been opened in the share menu.');
      } else {
        await navigator.clipboard.writeText(brief);
        setStatus('Copied. Send it to FAYSAL and we’ll reply within two working days.');
      }
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') {
        setStatus('Your request is ready. Copy the details and send them to FAYSAL.');
      }
    }
  }

  return (
    <form className="contact-form" onSubmit={prepareBrief}>
      <div className="field-row">
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" placeholder="Name" required />
        </label>
        <label>
          <span>Company</span>
          <input name="company" autoComplete="organization" placeholder="Company name" required />
        </label>
      </div>
      <div className="field-row">
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
        <label>
          <span>Link to your site or app</span>
          <input name="website" type="url" inputMode="url" placeholder="https://" required />
        </label>
      </div>
      <label>
        <span>What&apos;s bothering you most?</span>
        <textarea name="challenge" rows={4} placeholder="Sales dropped after the redesign. Checkout abandonment. Orders taking too long to process. Anything." required />
      </label>
      <div className="form-submit">
        <p>This form doesn&apos;t send anything anywhere—there&apos;s no server behind it. It just formats what you&apos;ve written so you can copy it and email it to us yourself.</p>
        <button type="submit">Write my request <span>↗</span></button>
      </div>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
