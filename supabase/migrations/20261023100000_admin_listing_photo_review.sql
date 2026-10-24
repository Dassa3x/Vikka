
-- Allow admins to review photos for pending listings only.
-- The storage bucket remains private.

create or replace function public.can_admin_review_listing_photo(
  p_owner_id text,
  p_listing_id text
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and exists (
      select 1
      from public.user_roles ur
      where ur.user_id = (select auth.uid())
        and ur.role = 'admin'
    )
    and exists (
      select 1
      from public.listings l
      where l.id::text = p_listing_id
        and l.seller_id::text = p_owner_id
        and l.status = 'pending'
    );
$$;

revoke all on function
  public.can_admin_review_listing_photo(text, text)
  from public, anon;

grant execute on function
  public.can_admin_review_listing_photo(text, text)
  to authenticated;

create policy "listing_storage_admin_review_pending"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'listing-review'
  and public.can_admin_review_listing_photo(
    (storage.foldername(name))[1],
    (storage.foldername(name))[2]
  )
);
