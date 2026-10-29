-- Vikka.lk: Grant table access for the listings schema
--
-- Fix for "permission denied for table categories" (staging, listing UI).
-- Root cause: 20261020110000_create_listings_schema.sql and
-- 20261020111000_listings_rls.sql created the tables and RLS policies but
-- never granted table-level privileges. PostgREST checks GRANTs before RLS,
-- so anon/authenticated were rejected before any policy ran.
--
-- These grants mirror the existing RLS policies exactly. The policies are
-- unchanged; cross-account tests confirm they still gate the rows.

-- Anyone can read active categories (RLS: categories_read_active).
grant select on public.categories to anon, authenticated;

-- Public can read approved listings; owners read their own
-- (RLS: listings_read_approved_or_own).
grant select on public.listings to anon, authenticated;

-- Owners create/update/delete their own non-approved listings
-- (RLS: listings_insert_own, listings_update_own, listings_delete_own).
grant insert, update, delete on public.listings to authenticated;

-- Owners read/add/delete images of their own listings
-- (RLS: listing_images_read_own, listing_images_insert_own,
-- listing_images_delete_own). There is no anon policy on listing_images:
-- public image display uses signed Storage URLs after an approval check,
-- not direct table reads.
grant select, insert, delete on public.listing_images to authenticated;
