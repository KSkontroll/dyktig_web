import { NextResponse } from 'next/server';

import { getValidInviteByToken } from '@/lib/onboarding/invite';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = String(formData.get('token') ?? '').trim();
    const file = formData.get('file');

    if (!token) {
      return NextResponse.json({ error: 'Manglende invitasjonstoken.' }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'Ingen fil valgt.' }, { status: 400 });
    }

    const invite = await getValidInviteByToken(token);
    if (!invite) {
      return NextResponse.json({ error: 'Lenken er ugyldig eller utløpt.' }, { status: 403 });
    }

    const admin = createSupabaseAdminClient();
    const path = `${invite.id}/${Date.now()}-${file.name.replace(/[^\w.\-() ]+/g, '_')}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await admin.storage
      .from('firmaattester')
      .upload(path, buffer, { contentType: file.type || undefined, upsert: false });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json({ error: 'Kunne ikke laste opp filen.' }, { status: 500 });
    }

    return NextResponse.json({ path });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke laste opp filen.' }, { status: 500 });
  }
}
