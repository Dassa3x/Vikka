
-- Secure admin-only listing approval function.

create or replace function public.admin_approve_listing(
  p_listing_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or not exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'admin'
  ) then
    raise exception 'Only admins can approve listings'
      using errcode = '42501';
  end if;

  update public.listings
  set status = 'approved'
  where id = p_listing_id
    and status = 'pending';

  if not found then
    raise exception 'Listing not found or not pending approval';
  end if;
end;
$$;

revoke all on function public.admin_approve_listing(uuid)
from public, anon, authenticated;

grant execute on function public.admin_approve_listing(uuid)
to authenticated;
