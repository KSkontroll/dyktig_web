import { sendResendEmail, emailLayout } from '@/lib/email/resend';
import { CONTACT_EMAIL } from '@/lib/site/constants';
import { getSiteUrl } from '@/lib/site/url';

import type { LeadPayload } from '@/lib/calculator/types';

export async function sendLeadNotification(lead: LeadPayload) {
  const to = process.env.LEAD_NOTIFY_EMAIL ?? CONTACT_EMAIL;
  const subject = `Ny lead fra priskalkulatoren — ${lead.navn}`;
  const adminUrl = `${getSiteUrl()}/admin`;

  const text = [
    'Ny lead fra priskalkulatoren',
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
    '',
    `Admin: ${adminUrl}`,
  ].join('\n');

  const html = emailLayout(`
    <p style="margin:0 0 16px;"><strong>Ny lead fra priskalkulatoren</strong></p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;line-height:1.6;">
      <tr><td style="padding:4px 0;"><strong>Navn:</strong> ${lead.navn}</td></tr>
      <tr><td style="padding:4px 0;"><strong>E-post:</strong> <a href="mailto:${lead.epost}" style="color:#A9761B;">${lead.epost}</a></td></tr>
      <tr><td style="padding:4px 0;"><strong>Telefon:</strong> ${lead.telefon}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Selskapsform:</strong> ${lead.selskapsform}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Bokføring:</strong> ${lead.bokforing}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Bilag:</strong> ${lead.bilag}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Ansatte:</strong> ${lead.ansatte}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Omsetning:</strong> ${lead.omsetningAar1} / ${lead.omsetningAar2}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Revisorpliktig:</strong> ${lead.revisorpliktig}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Anbefaling:</strong> ${lead.anbefaling}</td></tr>
      <tr><td style="padding:4px 0;"><strong>Estimat:</strong> ${lead.estimat}</td></tr>
    </table>
    <p style="margin:20px 0 0;text-align:center;">
      <a href="${adminUrl}" style="display:inline-block;background:#E7A634;color:#0B2440;font-family:Barlow,Arial,sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:9999px;">Åpne admin og send skjema</a>
    </p>
  `);

  await sendResendEmail({
    to: [to],
    subject,
    text,
    html,
    replyTo: lead.epost,
  });
}
