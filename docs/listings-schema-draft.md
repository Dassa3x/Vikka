# Vikka.lk — Listings Schema

## 1. Purpose

This schema stores marketplace categories, listings, and listing images for Vikka.lk.

It depends on the existing profiles and roles migration:

`20261018182010_create_profiles_roles.sql`

## 2. Database Tables

### Categories

Stores the categories available for marketplace listings.

- `id`: Unique category ID.
- `name`: Category name.
- `slug`: Unique category URL identifier.
- `is_active`: Indicates whether the category can be selected.
- `requires_condition`: Indicates whether a listing must provide its condition.
- `created_at`: Date and time the category was created.

### Listings

Stores the information about items or services listed by sellers.

- `id`: Unique listing ID.
- `seller_id`: References the seller's profile.
- `title`: Listing title.
- `description`: Listing description.
- `category_id`: Selected category.
- `listing_type`: `sell`, `rent`, `exchange`, or `donate`.
- `price`: Listing price, following the rules below.
- `price_period`: Rental price period.
- `location`: Listing location.
- `condition`: Condition of the item, when required.
- `status`: `draft`, `pending`, `approved`, or `rejected`.
- `created_at`: Creation date and time.
- `updated_at`: Last update date and time.

### Listing Images

Stores the database records for listing photos.

- `id`: Unique image ID.
- `listing_id`: Listing linked to the image.
- `storage_path`: Unique path of the stored image.
- `sort_order`: Display order of the image.
- `created_at`: Upload record creation date and time.

## 3. Validation Rules

- Selling and rental listings require a price greater than zero.
- Donation listings use a price of zero.
- Exchange listings may have no price or a non-negative price.
- Rental listings require a price period.
- Non-rental listings must not have a price period.
- A category is required before a listing can be submitted for review or approved.
- The selected category must be active when a listing is submitted or approved.
- Categories that require a condition must have one before submission or approval.
- Each listing can have up to three image records.

## 4. Listing Status and Access

- `draft`: The seller is preparing the listing.
- `pending`: The listing is waiting for review.
- `approved`: The listing can be shown in public listing queries.
- `rejected`: The listing was not approved.

Row Level Security (RLS) policies control access to categories, listings, and image records. Public users can read active categories and approved listings. Sellers can access their own listings according to the configured policies.

The `admin_approve_listing` database function allows an authenticated user with the `admin` role to approve a pending listing.

## 5. Image Storage

Listing photos use the private Supabase Storage bucket named `listing-review`.

- Maximum file size: 8 MB.
- Allowed file types: JPEG and PNG.
- Maximum image records per listing: three.
- The storage path follows this structure: `userId/listingId/imageId.ext`.

Storage policies check the authenticated user's ID and listing ownership. Public access to the private bucket is not enabled.

**Implementation notes:**

- Public display of approved listing photos requires a secure method to provide access, such as short-lived signed URLs after checking that the listing is approved.
- Changes to photos on an approved listing must also return the listing to `pending` for review.
## 6. Test Evidence and Remaining Checks

- Local database test suite passed: 4 test files, 12 tests.
- Verified that listing RLS policies exist for select, insert, update, and delete.
- Verified that sellers can insert and update only their own listings with draft, pending, or rejected status through the configured policies.
- Verified that the listing photo bucket is private and has an 8 MB limit.
- Verified that photo storage policies and the admin photo review policy exist.
- Verified that adding an image record to an approved listing changes its status to pending in the database trigger test.

The following checks are still required:
- Test access using separate authenticated seller and admin users.
- Verify that users cannot read another seller's draft or pending listing or photos.
- Verify file-size and file-type rejection through Storage uploads.
- Confirm the secure signed-URL flow for displaying approved listing photos.
- Confirm whether identity documents require a separate private storage bucket.

## 7. Team Handover

- Share the field names, listing types, statuses, and validation rules with Dasun.
- Ask Irushi to review the listing access and moderation rules.
- This work depends on the existing profiles and roles migration created by Malsha.

## 8. Known Decisions and Limitations

- Listing photos are stored in the private `listing-review` bucket.
- Only JPEG and PNG files are allowed, up to 8 MB per file.
- Each listing supports a maximum of three image records.
- Photo changes to approved listings should return the listing to pending review.
- Actual authenticated-user security tests and the secure public photo-display flow remain to be completed.