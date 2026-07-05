'use client';

import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '@dyktig/supabase';
import { getSupabaseEnv } from '@dyktig/supabase';

export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey);
}
