import { NextResponse } from 'next/server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperadmin } from '@/lib/auth/roles';

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const allowed = await isSuperadmin(supabase);
    if (!allowed) {
      return NextResponse.json({ error: 'Ingen tilgang.' }, { status: 403 });
    }

    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Manglende skjema-id.' }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const { data: item, error } = await admin
      .from('onboarding_svar')
      .select('firmaattest_url')
      .eq('id', id)
      .maybeSingle();

    if (error || !item?.firmaattest_url) {
      return NextResponse.json({ error: 'Firmaattest ikke funnet.' }, { status: 404 });
    }

    const { data: signed, error: signError } = await admin.storage
      .from('firmaattester')
      .createSignedUrl(item.firmaattest_url, 60 * 10);

    if (signError || !signed?.signedUrl) {
      console.error(signError);
      return NextResponse.json({ error: 'Kunne ikke åpne firmaattest.' }, { status: 500 });
    }

    return NextResponse.json({ url: signed.signedUrl });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke åpne firmaattest.' }, { status: 500 });
  }
}
