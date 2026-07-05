import { NextResponse } from 'next/server';

import { sendOnboardingSubmittedEmail } from '@/lib/email/send-onboarding-email';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateOnboardingPayload } from '@/lib/validation/onboarding';

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Du må være innlogget.' }, { status: 401 });
    }

    const payload = await request.json();
    const validated = validateOnboardingPayload(payload);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { data: invite } = await supabase
      .from('onboarding_invites')
      .select('id, lead_id')
      .eq('email', user.email ?? '')
      .order('sent_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await supabase.from('onboarding_svar').insert({
      user_id: user.id,
      lead_id: invite?.lead_id ?? null,
      invite_id: invite?.id ?? null,
      org_nr: validated.data.orgNr,
      foretaksnavn: validated.data.foretaksnavn,
      selskapsform: validated.data.selskapsform,
      bransje: validated.data.bransje || null,
      adresse: validated.data.adresse,
      kommune: validated.data.kommune,
      registrert_enhetsreg: validated.data.registrertEnhetsreg,
      nettside: validated.data.nettside || null,
      firmaattest_url: validated.data.firmaattestUrl,
      kontakt_navn: validated.data.kontaktNavn,
      kontakt_rolle: validated.data.kontaktRolle,
      kontakt_epost: validated.data.kontaktEpost,
      kontakt_telefon: validated.data.kontaktTelefon,
      signaturrett: validated.data.signaturrett,
      reelle_rettighetshavere: validated.data.reelleRettighetshavere,
      eierandeler: validated.data.eierandeler,
      pep: validated.data.pep,
      statsborgerskap: validated.data.statsborgerskap || null,
      bank: validated.data.bank || null,
      dagens_system: validated.data.dagensSystem || null,
      har_tripletex: validated.data.harTripletex,
      forrige_regnskapsforer: validated.data.forrigeRegnskapsforer || null,
      tjenester: validated.data.tjenester,
      antall_ansatte: validated.data.antallAnsatte,
      omsetning_ifjor: validated.data.omsetningIfjor
        ? Number(validated.data.omsetningIfjor)
        : null,
      mva_registrert: validated.data.mvaRegistrert,
      revisorpliktig: validated.data.revisorpliktig,
      oppstartsdato: validated.data.oppstartsdato || null,
      tilleggsinfo: validated.data.tilleggsinfo || null,
      samtykke: validated.data.samtykke,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Kunne ikke lagre skjemaet.' }, { status: 500 });
    }

    if (invite?.id) {
      await supabase
        .from('onboarding_invites')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', invite.id);
    }

    try {
      await sendOnboardingSubmittedEmail(validated.data);
    } catch (emailError) {
      console.error(emailError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke behandle skjemaet.' }, { status: 500 });
  }
}
