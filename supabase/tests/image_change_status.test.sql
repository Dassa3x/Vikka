begin;

select plan(1);

-- Confirm the trigger is attached to listing_images
select ok(
  exists (
    select 1
    from information_schema.triggers
    where trigger_schema = 'public'
      and event_object_table = 'listing_images'
      and trigger_name = 'listing_images_reset_approved_status'
      and event_manipulation = 'INSERT'
  )
  and exists (
    select 1
    from information_schema.triggers
    where trigger_schema = 'public'
      and event_object_table = 'listing_images'
      and trigger_name = 'listing_images_reset_approved_status'
      and event_manipulation = 'UPDATE'
  )
  and exists (
    select 1
    from information_schema.triggers
    where trigger_schema = 'public'
      and event_object_table = 'listing_images'
      and trigger_name = 'listing_images_reset_approved_status'
      and event_manipulation = 'DELETE'
  ),
  'Image changes have status-reset triggers for INSERT, UPDATE and DELETE'
);

select * from finish();

rollback;