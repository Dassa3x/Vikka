
-- Vikka.lk: Listings RLS
-- Enable Row Level Security on all listing tables.

alter table public.categories enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;

-- Anyone can read active categories.
create policy "categories_read_active"
on public.categories
for select
to anon, authenticated
using (is_active = true);

-- Public can read approved listings.
-- Owners can read their own listings.
create policy "listings_read_approved_or_own"
on public.listings
for select
to anon, authenticated
using (
  status = 'approved'
  or seller_id = (select auth.uid())
);

-- Logged-in users can create their own draft or pending listings.
create policy "listings_insert_own"
on public.listings
for insert
to authenticated
with check (
  seller_id = (select auth.uid())
  and status in ('draft', 'pending')
);

-- Owners can update only their own non-approved listings.
create policy "listings_update_own"
on public.listings
for update
to authenticated
using (
  seller_id = (select auth.uid())
  and status in ('draft', 'pending', 'rejected')
)
with check (
  seller_id = (select auth.uid())
  and status in ('draft', 'pending', 'rejected')
);

-- Owners can delete their own non-approved listings.
create policy "listings_delete_own"
on public.listings
for delete
to authenticated
using (
  seller_id = (select auth.uid())
  and status in ('draft', 'pending', 'rejected')
);

-- Owners can view images linked to their own listings.
create policy "listing_images_read_own"
on public.listing_images
for select
to authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id
      and l.seller_id = (select auth.uid())
  )
);

-- Owners can add images to their own non-approved listings.
create policy "listing_images_insert_own"
on public.listing_images
for insert
to authenticated
with check (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id
      and l.seller_id = (select auth.uid())
      and l.status in ('draft', 'pending', 'rejected')
  )
);

-- Owners can delete images from their own non-approved listings.
create policy "listing_images_delete_own"
on public.listing_images
for delete
to authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_id
      and l.seller_id = (select auth.uid())
      and l.status in ('draft', 'pending', 'rejected')
  )
);
