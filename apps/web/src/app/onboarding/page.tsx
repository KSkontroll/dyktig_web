import type { Metadata } from 'next';

import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { FormPageShell } from '@/components/forms/form-shell';
import { getValidInviteByToken } from '@/lib/onboarding/invite';
import { sx } from '@/lib/site/sx';

export const metadata: Metadata = {
  title: 'Oppstartsskjema — Dyktig Regnskapsfører AS',
  description: 'Fyll ut oppstartsskjemaet for å komme i gang som kunde.',
};

type OnboardingPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const { token } = await searchParams;
  const invite = token ? await getValidInviteByToken(token) : null;

  if (!invite) {
    return (
      <FormPageShell
        eyebrow="Oppstartsskjema"
        title="Lenken er ugyldig eller utløpt"
        description="Du trenger en personlig lenke fra Dyktig Regnskapsfører AS for å fylle ut skjemaet. Sjekk e-posten din, eller ta kontakt med oss hvis du trenger en ny lenke."
      >
        <div
          style={sx(
            'max-width:520px;margin:0 auto;background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:32px;box-shadow:0 20px 44px -32px rgba(11,36,64,.3)',
          )}
        >
          <p style={sx('margin:0;font-size:16px;line-height:1.6;color:rgba(30,37,34,.8)')}>
            Har du fått en lenke på e-post? Åpne den direkte fra innboksen — den kan ikke deles eller
            gjenbrukes etter at skjemaet er sendt inn.
          </p>
        </div>
      </FormPageShell>
    );
  }

  return (
    <FormPageShell
      eyebrow="Oppstartsskjema · Steg 2 av onboarding"
      title="Velkommen som kunde — fortell oss om bedriften din"
      description={
        <>
          Takk for forespørselen! For at vi skal komme raskt i gang trenger vi litt informasjon om
          selskapet, eierne og hvilke tjenester du ønsker. Det tar ca. 5–8 minutter. Felt merket{' '}
          <span className="req">*</span> er obligatoriske.
        </>
      }
    >
      <OnboardingForm token={token!} inviteEmail={invite.email} />
    </FormPageShell>
  );
}
