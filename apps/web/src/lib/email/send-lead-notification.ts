import { CONTACT_EMAIL } from '@/lib/site/constants';

import type { LeadPayload } from '@/lib/calculator/types';

export async function sendLeadNotification(lead: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  // Avsenderadressen trenger ingen postkasse — kun at domenet er verifisert i Resend.
  const from =
    process.env.RESEND_FROM_EMAIL ??
    'Dyktig Regnskapsfører <kontakt@dyktigregnskapsforer.no>';
  const to = process.env.LEAD_NOTIFY_EMAIL ?? CONTACT_EMAIL;

  if (!apiKey) {
    console.warn('RESEND_API_KEY mangler — lead lagret uten e-postvarsel.');
    return;
  }

  const body = [
    `Ny lead fra priskalkulatoren`,
    '',
    `Navn: ${lead.navn}`,
    `E-post: ${lead.epost}`,
    `Telefon: ${lead.telefon}`,
    `Selskapsform: ${lead.selskapsform}`,
    `Bokføring: ${lead.bokforing}`,
    `Bilag: ${lead.bilag}`,
    `Ansatte: ${lead.ansatte}`,
    `Omsetning år 1: ${lead.omsetningAar1}`,
    `Omsetning år 2: ${lead.omsetningAar2}`,
    `Revisorpliktig: ${lead.revisorpliktig}`,
    `Anbefaling: ${lead.anbefaling}`,
    `Estimat: ${lead.estimat}`,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.epost,
      subject: `Ny lead fra priskalkulatoren — ${lead.navn}`,
      text: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend feilet med status ${response.status}`);
  }
}
