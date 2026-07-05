import type { Metadata } from 'next';
import Link from 'next/link';

import { FormPageShell } from '@/components/forms/form-shell';
import { sx } from '@/lib/site/sx';

export const metadata: Metadata = {
  title: 'Oppstartsskjema — Dyktig Regnskapsfører AS',
  robots: { index: false, follow: false },
};

export default function OnboardingLoginPage() {
  return (
    <FormPageShell
      eyebrow="Oppstartsskjema"
      title="Du trenger en personlig lenke"
      description="Kunder får oppstartsskjemaet tilsendt på e-post fra Dyktig Regnskapsfører AS. Det er ingen offentlig innlogging."
    >
      <div
        style={sx(
          'max-width:520px;margin:0 auto;background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:32px;box-shadow:0 20px 44px -32px rgba(11,36,64,.3)',
        )}
      >
        <p style={sx('margin:0 0 16px;font-size:16px;line-height:1.6;color:rgba(30,37,34,.8)')}>
          Sjekk innboksen din etter en e-post fra oss med lenken «Klikk her for å fylle ut skjemaet».
          Lenken er personlig og kan brukes én gang.
        </p>
        <p style={sx('margin:0;font-size:14px;color:rgba(30,37,34,.6)')}>
          Er du ansatt i byrået?{' '}
          <Link href="/admin/login" style={sx('color:var(--c-ad);font-weight:600')}>
            Admin-innlogging
          </Link>
        </p>
      </div>
    </FormPageShell>
  );
}
