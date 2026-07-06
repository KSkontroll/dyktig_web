import { NextResponse } from 'next/server';

import { getValidInviteByToken } from '@/lib/onboarding/invite';
import { sendOnboardingSubmittedEmail } from '@/lib/email/send-onboarding-email';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { validateOnboardingPayload, formatAksjonaererSummary } from '@/lib/validation/onboarding';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';

    if (!token) {
      return NextResponse.json({ error: 'Manglende invitasjonstoken.' }, { status: 400 });
    }

    const invite = await getValidInviteByToken(token);
    if (!invite) {
      return NextResponse.json({ error: 'Lenken er ugyldig eller utløpt.' }, { status: 403 });
    }

    const validated = validateOnboardingPayload(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const aksjonaerSummary = formatAksjonaererSummary(validated.data.aksjonaerer);
    const { error } = await admin.from('onboarding_svar').insert({
      user_id: null,
      lead_id: invite.lead_id,
      invite_id: invite.id,
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
      reelle_rettighetshavere: aksjonaerSummary.reelleRettighetshavere,
      eierandeler: aksjonaerSummary.eierandeler,
      aksjonaerer: validated.data.aksjonaerer,
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

    await admin
      .from('onboarding_invites')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', invite.id);

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
