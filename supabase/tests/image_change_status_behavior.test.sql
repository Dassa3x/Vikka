
begin;

select plan(1);

select lives_ok(
  $test$
  do $$
  declare
    test_seller_id uuid;
    test_category_id bigint;
    test_listing_id uuid;
    actual_status text;
  begin
    select id into test_seller_id
    from public.profiles
    limit 1;

    if test_seller_id is null then
      raise exception 'No test profile found';
    end if;

    insert into public.categories
      (name, slug, is_active, requires_condition)
    values
      ('Trigger Test Category',
       'trigger-test-' || gen_random_uuid()::text,
       true,
       true)
    returning id into test_category_id;

    insert into public.listings
      (seller_id, title, category_id, listing_type,
       price, location, condition, status)
    values
      (test_seller_id, 'Trigger Test Listing',
       test_category_id, 'sell', 100,
       'Test Location', 'good', 'approved')
    returning id into test_listing_id;

    insert into public.listing_images
      (listing_id, storage_path)
    values
      (test_listing_id,
       test_seller_id::text || '/' ||
       test_listing_id::text || '/test-image.jpg');

    select status into actual_status
    from public.listings
    where id = test_listing_id;

    if actual_status <> 'pending' then
      raise exception
        'Expected pending, got %', actual_status;
    end if;
  end;
  $$;
  $test$,
  'Adding an image returns an approved listing to pending'
);

select * from finish();

rollback;
