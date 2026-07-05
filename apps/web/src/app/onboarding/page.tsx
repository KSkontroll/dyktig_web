import type { Metadata } from 'next';

import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { FormPageShell } from '@/components/forms/form-shell';

export const metadata: Metadata = {
  title: 'Oppstartsskjema — Dyktig Regnskapsfører AS',
  description: 'Fyll ut oppstartsskjemaet for å komme i gang som kunde.',
};

export default function OnboardingPage() {
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
      <OnboardingForm />
    </FormPageShell>
  );
}
