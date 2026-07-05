import { randomBytes } from 'crypto';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getSiteUrl } from '@/lib/site/url';

const INVITE_VALID_DAYS = 30;

export function createInviteToken() {
  return randomBytes(32).toString('base64url');
}

export function getInviteExpiryDate() {
  return new Date(Date.now() + INVITE_VALID_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

export function getOnboardingInviteUrl(token: string) {
  return `${getSiteUrl()}/onboarding?token=${encodeURIComponent(token)}`;
}

export async function getValidInviteByToken(token: string) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('onboarding_invites')
    .select('id, email, lead_id, status, expires_at')
    .eq('token', token)
    .eq('status', 'sent')
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
