-- ===== Tables =====
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  registration_no text unique,
  created_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'buyer'
    check (role in ('buyer', 'seller', 'admin')),
  created_at timestamptz not null default now()
);

-- ===== RLS enable + grants =====
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

revoke all on public.profiles from anon, authenticated;
revoke all on public.user_roles from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant select on public.user_roles to authenticated;

-- ===== RLS policies (user කෙනෙකුට තම record එක පමණයි) =====
create policy "profile_read_own" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "profile_update_name_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "role_read_own" on public.user_roles
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- ===== Signup trigger: profile + default buyer role =====
create function public.handle_new_vikka_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  insert into public.user_roles (user_id, role)
    values (new.id, 'buyer');
  return new;
end;
$$;

revoke all on function public.handle_new_vikka_user()
  from public, anon, authenticated;

create trigger on_auth_user_created_vikka
  after insert on auth.users
  for each row execute function public.handle_new_vikka_user();