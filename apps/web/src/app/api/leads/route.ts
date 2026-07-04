import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { sendLeadNotification } from '@/lib/email/send-lead-notification';
import { validateLeadPayload } from '@/lib/validation/lead';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = validateLeadPayload(payload);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('leads').insert({
      navn: validated.data.navn,
      epost: validated.data.epost,
      telefon: validated.data.telefon,
      selskapsform: validated.data.selskapsform,
      bokforing: validated.data.bokforing,
      bilag: validated.data.bilag,
      ansatte: validated.data.ansatte,
      omsetning_aar1: validated.data.omsetningAar1,
      omsetning_aar2: validated.data.omsetningAar2,
      revisorpliktig: validated.data.revisorpliktig,
      anbefaling: validated.data.anbefaling,
      estimat: validated.data.estimat,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Kunne ikke lagre forespørselen.' },
        { status: 500 },
      );
    }

    try {
      await sendLeadNotification(validated.data);
    } catch (emailError) {
      console.error(emailError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke behandle forespørselen.' }, { status: 500 });
  }
}
