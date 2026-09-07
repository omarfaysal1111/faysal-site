'use client';

import { FormEvent, useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [statusState, setStatusState] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setIsSubmitting(true);
    setStatusState('idle');
    setStatus('Sending your request…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          company: form.get('company'),
          email: form.get('email'),
          website: form.get('website'),
          challenge: form.get('challenge'),
          companyFax: form.get('companyFax'),
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send request');
      }

      formElement.reset();
      setStatusState('success');
      setStatus('Sent. We’ll reply within two working days.');
    } catch {
      setStatusState('error');
      setStatus('We couldn’t send that. Please email info@faysalstudio.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={sendRequest}>
      <label className="form-hp" aria-hidden="true">
        <span>Company fax</span>
        <input name="companyFax" tabIndex={-1} autoComplete="off" />
      </label>
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
        <p>Your request is sent directly to info@faysalstudio.com.</p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send my request'} <span>↗</span>
        </button>
      </div>
      <p className="form-status" data-state={statusState} role="status" aria-live="polite">{status}</p>
    </form>
  );
}
