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
      `Website or app: ${form.get('website')}`,
      `Current challenge: ${form.get('challenge')}`,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Commerce Review Request', text: brief });
        setStatus('Your review request is ready to send.');
      } else {
        await navigator.clipboard.writeText(brief);
        setStatus('Request copied—send it to FAYSAL through the channel where you found us.');
      }
    } catch (error) {
      if ((error as DOMException).name !== 'AbortError') {
        setStatus('Copy the details and send them to FAYSAL through your preferred channel.');
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
          <span>Website or app</span>
          <input name="website" type="url" inputMode="url" placeholder="https://" required />
        </label>
      </div>
      <label>
        <span>What feels most urgent?</span>
        <textarea name="challenge" rows={4} placeholder="Conversion, customer experience, operations, performance…" required />
      </label>
      <div className="form-submit">
        <p>Your details stay on your device. We prepare a brief you can share directly.</p>
        <button type="submit">Prepare my request <span>↗</span></button>
      </div>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
