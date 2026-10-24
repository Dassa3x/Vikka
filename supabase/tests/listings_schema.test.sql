begin;

select plan(8);

select ok(
  to_regclass('public.categories') is not null,
  'Categories table exists'
);

select ok(
  to_regclass('public.listings') is not null,
  'Listings table exists'
);

select ok(
  to_regclass('public.listing_images') is not null,
  'Listing images table exists'
);

select ok(
  exists (
    select 1
    from pg_constraint
    where conrelid = 'public.listings'::regclass
      and conname = 'listings_status_check'
  ),
  'Listing status constraint exists'
);

select ok(
  exists (
    select 1
    from storage.buckets
    where id = 'listing-review'
      and public = false
      and file_size_limit = 8388608
  ),
  'Listing image bucket is private with an 8 MB limit'
);

select ok(
  exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'listing_storage_insert_own'
  ),
  'Listing image upload policy exists'
);

select ok(
  to_regprocedure('public.admin_approve_listing(uuid)') is not null,
  'Admin approval function exists'
);

select ok(
  exists (
    select 1
    from pg_indexes
    where schemaname = 'public'
      and indexname = 'listings_public_browse_idx'
  ),
  'Public browse index exists'
);

select * from finish();

rollback;
