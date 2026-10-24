
-- Vikka.lk: Listings Schema
-- Depends on the profiles and roles migration.

create table public.categories (
  id bigint generated always as identity primary key,
  name text not null check (length(trim(name)) > 0),
  slug text not null unique check (length(trim(slug)) > 0),
  is_active boolean not null default true,
  requires_condition boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null
    references public.profiles(id) on delete restrict,
  title text not null check (length(trim(title)) > 0),
  description text,
  category_id bigint
    references public.categories(id) on delete restrict,
  listing_type text not null
    check (listing_type in ('sell', 'rent', 'exchange', 'donate')),
  price numeric(12,2),
  price_period text,
  location text not null check (length(trim(location)) > 0),
  condition text,
  status text not null default 'pending'
    check (status in ('draft', 'pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint listings_price_rules check (
    (
      listing_type in ('sell', 'rent')
      and price is not null
      and price > 0
    )
    or (
      listing_type = 'donate'
      and price is not null
      and price = 0
    )
    or (
      listing_type = 'exchange'
      and (price is null or price >= 0)
    )
  ),

  constraint listings_price_period_rules check (
    (
      listing_type = 'rent'
      and price_period is not null
      and length(trim(price_period)) > 0
    )
    or (
      listing_type <> 'rent'
      and price_period is null
    )
  ),

  constraint listings_publish_category check (
    status in ('draft', 'rejected')
    or category_id is not null
  )
);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null
    references public.listings(id) on delete cascade,
  storage_path text not null unique,
  sort_order integer not null default 0
    check (sort_order >= 0),
  created_at timestamptz not null default now()
);

create index listings_public_browse_idx
  on public.listings(created_at desc)
  where status = 'approved';

create index listings_seller_idx
  on public.listings(seller_id, created_at desc);

create index listings_category_idx
  on public.listings(category_id, created_at desc);

create index listing_images_listing_order_idx
  on public.listing_images(listing_id, sort_order);

create or replace function public.set_listing_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger listings_updated_at_trigger
before update on public.listings
for each row
execute function public.set_listing_updated_at();
-- Validate category and condition before publishing/review.
create or replace function public.validate_listing_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  category_is_active boolean;
  category_requires_condition boolean;
begin
  if new.status in ('pending', 'approved') then
    if new.category_id is null then
      raise exception 'A category is required before publishing';
    end if;

    select c.is_active, c.requires_condition
      into category_is_active, category_requires_condition
      from public.categories c
      where c.id = new.category_id;

    if not found then
      raise exception 'Selected category does not exist';
    end if;

    if not category_is_active then
      raise exception 'Selected category is inactive';
    end if;

    if category_requires_condition
       and (new.condition is null
            or length(trim(new.condition)) = 0) then
      raise exception 'Condition is required for this category';
    end if;
  end if;

  return new;
end;
$$;

create trigger listings_validate_before_write
before insert or update on public.listings
for each row
execute function public.validate_listing_before_write();