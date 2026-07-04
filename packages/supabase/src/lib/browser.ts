import { createBrowserClient } from '@supabase/ssr';

import type { Database } from './database.types.js';
import { getSupabaseEnv } from './env.js';

export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv();

  return createBrowserClient<Database>(url, anonKey);
}
