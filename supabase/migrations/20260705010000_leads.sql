create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  navn text not null check (char_length(trim(navn)) >= 2),
  epost text not null check (epost ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  telefon text not null check (char_length(trim(telefon)) >= 8),
  selskapsform text not null,
  bokforing text not null,
  bilag text not null,
  ansatte text not null,
  omsetning_aar1 bigint not null check (omsetning_aar1 >= 0),
  omsetning_aar2 bigint not null check (omsetning_aar2 >= 0),
  revisorpliktig text not null,
  anbefaling text not null,
  estimat text not null
);

alter table public.leads enable row level security;

create policy "Anonyme kan sende inn lead"
  on public.leads
  for insert
  to anon
  with check (true);

revoke all on public.leads from anon;
grant insert on public.leads to anon;
