
-- Vikka.lk: Private listing image storage
-- Prototype requirements: JPG/PNG, maximum 8 MB per image.

-- Create a private bucket with upload restrictions.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'listing-review',
  'listing-review',
  false,
  8388608,
  array['image/jpeg', 'image/png']
)
on conflict (id) do update set
  name = excluded.name,
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Sellers can view images belonging to their own listings.
create policy "listing_storage_read_own"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'listing-review'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[2]
      and l.seller_id = (select auth.uid())
  )
);

-- Sellers can upload only to their own non-approved listings.
create policy "listing_storage_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'listing-review'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[2]
      and l.seller_id = (select auth.uid())
      and l.status in ('draft', 'pending', 'rejected')
  )
);

-- Sellers can delete images from their own non-approved listings.
create policy "listing_storage_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'listing-review'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1
    from public.listings l
    where l.id::text = (storage.foldername(name))[2]
      and l.seller_id = (select auth.uid())
      and l.status in ('draft', 'pending', 'rejected')
  )
);
-- Limit each listing to a maximum of 3 image records.
create or replace function public.enforce_listing_image_limit()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  existing_count integer;
begin
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(new.listing_id::text, 0)
  );

  select count(*)
    into existing_count
    from public.listing_images
    where listing_id = new.listing_id;

  if existing_count >= 3 then
    raise exception 'A listing can have at most 3 images';
  end if;

  return new;
end;
$$;

create trigger listing_images_limit_trigger
before insert on public.listing_images
for each row
execute function public.enforce_listing_image_limit();