const MAX_FIELD_LENGTH = 2_000;

const serviceLabels: Record<string, string> = {
  'store-improvement-sprint': 'Store Improvement Sprint — EGP 5,000',
  'comprehensive-commerce-review': 'Comprehensive Commerce Review — from EGP 15,000',
  'ecommerce-build': 'E-commerce Build — from EGP 45,000',
  'digital-product': 'Digital Product',
  'brand-project': 'Brand Project — from EGP 18,000',
  'ongoing-growth': 'Ongoing Growth Services',
  'general-enquiry': 'General enquiry',
};

type ContactRequest = {
  name?: unknown;
  company?: unknown;
  service?: unknown;
  email?: unknown;
  website?: unknown;
  challenge?: unknown;
  companyFax?: unknown;
};

function readField(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidWebsite(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let payload: ContactRequest;

  try {
    payload = await request.json() as ContactRequest;
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const companyFax = readField(payload.companyFax, 200);
  if (companyFax) {
    return Response.json({ ok: true });
  }

  const name = readField(payload.name, 120);
  const company = readField(payload.company, 160);
  const service = readField(payload.service, 80);
  const email = readField(payload.email, 254);
  const website = readField(payload.website, 500);
  const challenge = readField(payload.challenge);

  if (!name || !company || !service || !email || !website || !challenge) {
    return Response.json({ error: 'Please complete every field.' }, { status: 400 });
  }

  if (!serviceLabels[service] || !isValidEmail(email) || !isValidWebsite(website)) {
    return Response.json({ error: 'Please check the email and website.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@faysalstudio.com';

  if (!apiKey || !fromEmail) {
    console.error('Contact email configuration is missing.');
    return Response.json({ error: 'Email delivery is unavailable.' }, { status: 503 });
  }

  const subjectCompany = company.replace(/[\r\n]+/g, ' ').slice(0, 100);
  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'faysal-site/1.0',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `${serviceLabels[service]} enquiry — ${subjectCompany}`,
      text: [
        'New Faysal Studio Enquiry',
        '',
        `Name: ${name}`,
        `Company: ${company}`,
        `Service: ${serviceLabels[service]}`,
        `Work email: ${email}`,
        `Website or app: ${website}`,
        '',
        'What is bothering them most:',
        challenge,
      ].join('\n'),
    }),
  });

  if (!emailResponse.ok) {
    const providerError = await emailResponse.text();
    console.error(`Email provider returned status ${emailResponse.status}: ${providerError.slice(0, 500)}`);
    return Response.json({ error: 'Unable to deliver email.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
