const CONTACT_TO_EMAIL = 'info@faysalstudio.com';
const MAX_FIELD_LENGTH = 2_000;

type ContactRequest = {
  name?: unknown;
  company?: unknown;
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
  const email = readField(payload.email, 254);
  const website = readField(payload.website, 500);
  const challenge = readField(payload.challenge);

  if (!name || !company || !email || !website || !challenge) {
    return Response.json({ error: 'Please complete every field.' }, { status: 400 });
  }

  if (!isValidEmail(email) || !isValidWebsite(website)) {
    return Response.json({ error: 'Please check the email and website.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

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
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Commerce Review Request — ${subjectCompany}`,
      text: [
        'New Commerce Review Request',
        '',
        `Name: ${name}`,
        `Company: ${company}`,
        `Work email: ${email}`,
        `Website or app: ${website}`,
        '',
        'What is bothering them most:',
        challenge,
      ].join('\n'),
    }),
  });

  if (!emailResponse.ok) {
    console.error(`Email provider returned status ${emailResponse.status}.`);
    return Response.json({ error: 'Unable to deliver email.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
