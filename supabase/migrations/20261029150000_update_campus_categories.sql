begin;

-- Hide Furniture from the dropdown.
update public.categories
set is_active = false
where slug = 'furniture';

-- Update existing display names, preserving IDs and slugs.
update public.categories
set name = 'Books & Study Materials'
where slug = 'textbooks-notes';

update public.categories
set name = 'Electronics & Accessories'
where slug = 'electronics';

update public.categories
set name = 'Stationery & Art Supplies'
where slug = 'stationery-supplies';

-- Add campus categories without duplicating existing slugs.
insert into public.categories
  (name, slug, is_active, requires_condition)
select v.name, v.slug, true, true
from (
  values
  ('Calculators', 'calculators'),
  ('Cameras & Accessories', 'cameras-accessories'),
  ('Hostel Essentials', 'hostel-essentials'),
  ('Clothing & Accessories', 'clothing-accessories')
) as v(name, slug)
where not exists (
  select 1
  from public.categories c
  where c.slug = v.slug
);

commit;