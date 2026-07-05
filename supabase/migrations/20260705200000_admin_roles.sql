create type public.app_role as enum ('customer', 'superadmin');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
  );
$$;

create policy "Brukere leser egen profil"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Superadmin leser alle profiler"
  on public.profiles
  for select
  to authenticated
  using (public.is_superadmin());

create policy "Superadmin leser leads"
  on public.leads
  for select
  to authenticated
  using (public.is_superadmin());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'customer')
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

insert into public.profiles (id, email, role)
select id, email, 'superadmin'::public.app_role
from auth.users
where email = 'johansen@dyktigregnskapsforer.no'
on conflict (id) do update
set
  role = 'superadmin',
  email = excluded.email,
  updated_at = now();
