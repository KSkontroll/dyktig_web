import { CONTACT_EMAIL } from '@/lib/site/constants';

import type { OnboardingPayload } from '@/lib/validation/onboarding';

async function sendResendEmail({
  subject,
  text,
  to,
}: {
  subject: string;
  text: string;
  to: string[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    'Dyktig Regnskapsfører <kontakt@dyktigregnskapsforer.no>';

  if (!apiKey) {
    console.warn('RESEND_API_KEY mangler — e-post ikke sendt.');
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!response.ok) {
    throw new Error(`Resend feilet med status ${response.status}`);
  }
}

export async function sendOnboardingInviteEmail(email: string, actionLink: string) {
  const text = [
    'Hei!',
    '',
    'Takk for interessen i Dyktig Regnskapsfører AS.',
    'Klikk lenken under for å logge inn og fylle ut oppstartsskjemaet:',
    '',
    actionLink,
    '',
    'Lenken er personlig og kan brukes én gang.',
    '',
    'Vennlig hilsen',
    'Dyktig Regnskapsfører AS',
  ].join('\n');

  await sendResendEmail({
    to: [email],
    subject: 'Fyll ut oppstartsskjemaet — Dyktig Regnskapsfører AS',
    text,
  });
}

export async function sendOnboardingSubmittedEmail(payload: OnboardingPayload) {
  const to = process.env.LEAD_NOTIFY_EMAIL ?? CONTACT_EMAIL;
  const text = [
    'Nytt onboarding-skjema er sendt inn.',
    '',
    `Foretak: ${payload.foretaksnavn} (${payload.orgNr})`,
    `Kontakt: ${payload.kontaktNavn} · ${payload.kontaktEpost} · ${payload.kontaktTelefon}`,
    `Tjenester: ${payload.tjenester.join(', ') || 'Ingen valgt'}`,
    payload.firmaattestUrl ? 'Firmaattest: lastet opp' : 'Firmaattest: ikke lastet opp',
  ].join('\n');

  await sendResendEmail({
    to: [to],
    subject: `Nytt onboarding-skjema — ${payload.foretaksnavn}`,
    text,
  });
}
