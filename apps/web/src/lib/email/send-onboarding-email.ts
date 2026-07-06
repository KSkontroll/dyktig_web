import { sendResendEmail, emailButton, emailLayout } from '@/lib/email/resend';
import { CONTACT_EMAIL } from '@/lib/site/constants';
import { getSiteUrl } from '@/lib/site/url';

import type { OnboardingPayload } from '@/lib/validation/onboarding';

export async function sendOnboardingInviteEmail(email: string, inviteUrl: string) {
  const subject = 'Fyll ut oppstartsskjemaet — Dyktig Regnskapsfører AS';

  const text = [
    'Hei!',
    '',
    'Takk for interessen i Dyktig Regnskapsfører AS.',
    '',
    'Klikk her for å fylle ut oppstartsskjemaet:',
    inviteUrl,
    '',
    'Lenken er personlig, varer i 30 dager og kan brukes én gang.',
    '',
    'Vennlig hilsen',
    'Dyktig Regnskapsfører AS',
    'https://dyktigregnskapsforer.no',
  ].join('\n');

  const html = emailLayout(`
    <p style="margin:0 0 16px;">Hei!</p>
    <p style="margin:0 0 16px;">Takk for interessen i <strong>Dyktig Regnskapsfører AS</strong>.</p>
    <p style="margin:0 0 8px;">For å komme i gang trenger vi at du fyller ut oppstartsskjemaet. Det tar ca. 5–8 minutter.</p>
    <p style="margin:0 0 8px;text-align:center;">
      ${emailButton(inviteUrl, 'Klikk her for å fylle ut skjemaet')}
    </p>
    <p style="margin:0 0 16px;font-size:14px;color:rgba(30,37,34,.65);">
      Fungerer ikke knappen? Kopier denne lenken til nettleseren din:<br>
      <a href="${inviteUrl}" style="color:#A9761B;word-break:break-all;">${inviteUrl}</a>
    </p>
    <p style="margin:0;font-size:14px;color:rgba(30,37,34,.65);">Lenken er personlig, varer i 30 dager og kan brukes én gang.</p>
    <p style="margin:24px 0 0;">Vennlig hilsen<br><strong>Dyktig Regnskapsfører AS</strong></p>
  `);

  await sendResendEmail({ to: [email], subject, text, html });
}

export async function sendOnboardingSubmittedEmail(payload: OnboardingPayload) {
  const to = process.env.LEAD_NOTIFY_EMAIL ?? CONTACT_EMAIL;
  const subject = `Nytt onboarding-skjema — ${payload.foretaksnavn}`;

  const adminUrl = `${getSiteUrl()}/admin`;

  const text = [
    'Nytt onboarding-skjema er sendt inn.',
    '',
    `Foretak: ${payload.foretaksnavn} (${payload.orgNr})`,
    `Kontakt: ${payload.kontaktNavn} · ${payload.kontaktEpost} · ${payload.kontaktTelefon}`,
    `Tjenester: ${payload.tjenester.join(', ') || 'Ingen valgt'}`,
    'Firmaattest: lastet opp',
    '',
    `Se alle svar i admin: ${adminUrl}`,
  ].join('\n');

  const html = emailLayout(`
    <p style="margin:0 0 16px;"><strong>Nytt onboarding-skjema er sendt inn.</strong></p>
    <p style="margin:0 0 8px;">Foretak: ${payload.foretaksnavn} (${payload.orgNr})</p>
    <p style="margin:0 0 8px;">Kontakt: ${payload.kontaktNavn} · <a href="mailto:${payload.kontaktEpost}" style="color:#A9761B;">${payload.kontaktEpost}</a> · ${payload.kontaktTelefon}</p>
    <p style="margin:0 0 8px;">Tjenester: ${payload.tjenester.join(', ') || 'Ingen valgt'}</p>
    <p style="margin:0 0 16px;">Firmaattest: lastet opp</p>
    <p style="margin:0;text-align:center;">${emailButton(adminUrl, 'Åpne admin-panelet')}</p>
  `);

  await sendResendEmail({ to: [to], subject, text, html, replyTo: payload.kontaktEpost });
}
