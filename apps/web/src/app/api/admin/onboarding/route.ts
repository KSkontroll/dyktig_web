import { NextResponse } from 'next/server';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperadmin } from '@/lib/auth/roles';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const allowed = await isSuperadmin(supabase);
    if (!allowed) {
      return NextResponse.json({ error: 'Ingen tilgang.' }, { status: 403 });
    }

    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from('onboarding_svar')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Kunne ikke hente innsendte skjema.' }, { status: 500 });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch {
    return NextResponse.json({ error: 'Kunne ikke hente innsendte skjema.' }, { status: 500 });
  }
}
