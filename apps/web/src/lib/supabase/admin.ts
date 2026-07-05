import { createClient } from '@supabase/supabase-js';

import type { Database } from '@dyktig/supabase';
import { getSupabaseEnv, getSupabaseServiceRoleKey } from '@dyktig/supabase';

export function createSupabaseAdminClient() {
  const { url } = getSupabaseEnv();
  return createClient<Database>(url, getSupabaseServiceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
