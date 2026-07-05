import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@dyktig/supabase';

export type AppRole = Database['public']['Enums']['app_role'];

export async function getCurrentProfile(
  supabase: SupabaseClient<Database>,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('id', user.id)
    .maybeSingle();

  return profile;
}

export async function isSuperadmin(supabase: SupabaseClient<Database>) {
  const profile = await getCurrentProfile(supabase);
  return profile?.role === 'superadmin';
}
