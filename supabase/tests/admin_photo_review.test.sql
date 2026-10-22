begin;

select plan(2);

select ok(
  to_regprocedure('public.can_admin_review_listing_photo(text,text)') is not null,
  'Admin photo review function exists'
);

select ok(
  exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'listing_storage_admin_review_pending'
      and cmd = 'SELECT'
  ),
  'Admin pending photo review policy exists'
);

select * from finish();

rollback;