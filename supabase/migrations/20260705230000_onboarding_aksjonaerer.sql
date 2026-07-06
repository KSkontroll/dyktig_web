alter table public.onboarding_svar
  add column if not exists aksjonaerer jsonb not null default '[]'::jsonb;
