create extension if not exists pgcrypto with schema extensions;

alter table public.onboarding_invites
  add column if not exists token text,
  add column if not exists expires_at timestamptz;

update public.onboarding_invites
set
  token = coalesce(token, encode(extensions.gen_random_bytes(32), 'hex')),
  expires_at = coalesce(expires_at, sent_at + interval '30 days')
where token is null or expires_at is null;

alter table public.onboarding_invites
  alter column token set not null,
  alter column expires_at set not null;

create unique index if not exists onboarding_invites_token_key
  on public.onboarding_invites (token);

alter table public.onboarding_svar
  alter column user_id drop not null;

drop policy if exists "Bruker leser egne invites" on public.onboarding_invites;
drop policy if exists "Insert egne onboarding-svar" on public.onboarding_svar;
drop policy if exists "Les egne onboarding-svar" on public.onboarding_svar;
drop policy if exists "Brukere laster opp egne attester" on storage.objects;
drop policy if exists "Brukere leser egne attester" on storage.objects;
