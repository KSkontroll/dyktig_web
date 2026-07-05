import { NextResponse } from 'next/server';

import { sendOnboardingInviteEmail } from '@/lib/email/send-onboarding-email';
import {
  createInviteToken,
  getInviteExpiryDate,
  getOnboardingInviteUrl,
} from '@/lib/onboarding/invite';
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

    const token = createInviteToken();
    const inviteUrl = getOnboardingInviteUrl(token);

    const { error: inviteError } = await supabase.from('onboarding_invites').insert({
      lead_id: leadId,
      email,
      sent_by: user?.id ?? null,
      status: 'sent',
      token,
      expires_at: getInviteExpiryDate(),
    });

    if (inviteError) {
      console.error(inviteError);
      return NextResponse.json({ error: 'Kunne ikke registrere utsendelse.' }, { status: 500 });
    }

    try {
      await sendOnboardingInviteEmail(email, inviteUrl);
    } catch (emailError) {
      console.error(emailError);
      return NextResponse.json({ error: 'Invitasjon opprettet, men e-post feilet.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke sende skjema.' }, { status: 500 });
  }
}
