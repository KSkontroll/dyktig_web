create table public.onboarding_invites (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id) on delete set null,
  email text not null,
  sent_by uuid references auth.users (id) on delete set null,
  sent_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'sent' check (status in ('sent', 'completed'))
);

create table public.onboarding_svar (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete set null,
  invite_id uuid references public.onboarding_invites (id) on delete set null,
  created_at timestamptz not null default now(),
  org_nr text not null,
  foretaksnavn text not null,
  selskapsform text not null,
  bransje text,
  adresse text not null,
  kommune text not null,
  registrert_enhetsreg text not null,
  nettside text,
  firmaattest_url text,
  kontakt_navn text not null,
  kontakt_rolle text not null,
  kontakt_epost text not null,
  kontakt_telefon text not null,
  signaturrett text not null,
  reelle_rettighetshavere text not null,
  eierandeler text not null,
  pep text not null,
  statsborgerskap text,
  bank text,
  dagens_system text,
  har_tripletex text not null,
  forrige_regnskapsforer text,
  tjenester text[] not null default '{}',
  antall_ansatte int not null check (antall_ansatte >= 0),
  omsetning_ifjor bigint,
  mva_registrert text not null,
  revisorpliktig text not null,
  oppstartsdato text,
  tilleggsinfo text,
  samtykke boolean not null
);

alter table public.onboarding_invites enable row level security;
alter table public.onboarding_svar enable row level security;

create policy "Superadmin leser invites"
  on public.onboarding_invites
  for select
  to authenticated
  using (public.is_superadmin());

create policy "Superadmin oppretter invites"
  on public.onboarding_invites
  for insert
  to authenticated
  with check (public.is_superadmin());

create policy "Superadmin oppdaterer invites"
  on public.onboarding_invites
  for update
  to authenticated
  using (public.is_superadmin());

create policy "Bruker leser egne invites"
  on public.onboarding_invites
  for select
  to authenticated
  using (email = (select auth.jwt() ->> 'email'));

create policy "Insert egne onboarding-svar"
  on public.onboarding_svar
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Les egne onboarding-svar"
  on public.onboarding_svar
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Superadmin leser onboarding-svar"
  on public.onboarding_svar
  for select
  to authenticated
  using (public.is_superadmin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'firmaattester',
  'firmaattester',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "Brukere laster opp egne attester"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'firmaattester'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Brukere leser egne attester"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'firmaattester'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Superadmin leser attester"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'firmaattester'
    and public.is_superadmin()
  );
