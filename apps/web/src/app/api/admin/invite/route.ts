import { NextResponse } from 'next/server';

import { sendOnboardingInviteEmail } from '@/lib/email/send-onboarding-email';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperadmin } from '@/lib/auth/roles';

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const allowed = await isSuperadmin(supabase);
    if (!allowed) {
      return NextResponse.json({ error: 'Ingen tilgang.' }, { status: 403 });
    }

    const body = await request.json();
    const leadId = typeof body.leadId === 'string' ? body.leadId : null;
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Ugyldig e-post.' }, { status: 400 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createSupabaseAdminClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dyktigregnskapsforer.no';

    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: `${siteUrl}/onboarding` },
    });

    if (linkError || !linkData.properties?.action_link) {
      console.error(linkError);
      return NextResponse.json({ error: 'Kunne ikke opprette innloggingslenke.' }, { status: 500 });
    }

    const { error: inviteError } = await supabase.from('onboarding_invites').insert({
      lead_id: leadId,
      email,
      sent_by: user?.id ?? null,
      status: 'sent',
    });

    if (inviteError) {
      console.error(inviteError);
      return NextResponse.json({ error: 'Kunne ikke registrere utsendelse.' }, { status: 500 });
    }

    try {
      await sendOnboardingInviteEmail(email, linkData.properties.action_link);
    } catch (emailError) {
      console.error(emailError);
      return NextResponse.json({ error: 'Lenke opprettet, men e-post feilet.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke sende skjema.' }, { status: 500 });
  }
}
