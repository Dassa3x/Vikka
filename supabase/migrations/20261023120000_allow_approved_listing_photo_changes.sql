
-- Allow owners to change photos on their approved listings.
-- The image-change trigger returns the listing to pending.

drop policy if exists listing_images_insert_own
on public.listing_images;

create policy listing_images_insert_own
on public.listing_images
for insert
to authenticated
with check (
  exists (
    select 1
    from public.listings l
    where l.id = listing_images.listing_id
      and l.seller_id = (select auth.uid())
      and l.status in ('draft', 'pending', 'rejected', 'approved')
  )
);

drop policy if exists listing_images_delete_own
on public.listing_images;

create policy listing_images_delete_own
on public.listing_images
for delete
to authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_images.listing_id
      and l.seller_id = (select auth.uid())
      and l.status in ('draft', 'pending', 'rejected', 'approved')
  )
);

drop policy if exists listing_storage_insert_own
on storage.objects;

create policy listing_storage_insert_own
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
      and l.status in ('draft', 'pending', 'rejected', 'approved')
  )
);

drop policy if exists listing_storage_delete_own
on storage.objects;

create policy listing_storage_delete_own
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
      and l.status in ('draft', 'pending', 'rejected', 'approved')
  )
);
