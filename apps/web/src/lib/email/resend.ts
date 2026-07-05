type ResendEmail = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendResendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: ResendEmail) {
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
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend feilet med status ${response.status}`);
  }
}

export function emailButton(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#E7A634;color:#0B2440;font-family:Barlow,Arial,sans-serif;font-size:16px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:9999px;margin:20px 0;">${label}</a>`;
}

export function emailLayout(content: string) {
  return `<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fbfbfa;font-family:Barlow,Arial,sans-serif;color:#1E2522;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbfbfa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid rgba(11,36,64,.1);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(150deg,#14335A 0%,#0B2440 100%);padding:28px 32px;">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#E7A634;">Dyktig Regnskapsfører AS</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-size:16px;line-height:1.6;color:#1E2522;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;font-size:13px;line-height:1.5;color:rgba(30,37,34,.55);">
              Dyktig Regnskapsfører AS · Oslo<br>
              <a href="https://dyktigregnskapsforer.no" style="color:#A9761B;">dyktigregnskapsforer.no</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
