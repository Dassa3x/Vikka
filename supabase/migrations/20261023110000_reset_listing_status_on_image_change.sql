-- Return an approved listing to pending when its image records change.

create or replace function public.reset_listing_status_on_image_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_listing_id uuid;
begin
  if tg_op = 'DELETE' then
    target_listing_id := old.listing_id;
  else
    target_listing_id := new.listing_id;
  end if;

  update public.listings
  set status = 'pending'
  where id = target_listing_id
    and status = 'approved';

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

create trigger listing_images_reset_approved_status
after insert or update or delete
on public.listing_images
for each row
execute function public.reset_listing_status_on_image_change();