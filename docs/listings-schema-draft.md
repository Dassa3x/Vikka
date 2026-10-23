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

### Completed Checks

- Local database test suite passed: 5 test files, 17 tests.
- Verified that Row Level Security (RLS) is enabled on categories, listings, and listing_images.
- Reviewed listing access policies for select, insert, update, and delete operations.
- Verified that anonymous users cannot execute the admin approval function.
- Verified that authenticated users can call the admin approval function, which performs internal admin-role and pending-status checks.
- Verified that the approved-only browse query returns approved listings.
- Verified that the listing photo bucket is private, with an 8 MB file-size limit and JPEG/PNG MIME types configured.
- Tested the maximum of three image records per listing. A fourth image record was rejected.
- Tested that adding an image record to an approved listing changes its status to pending.
- Frontend production build passed using `npm run build`.
- `npm audit` reported zero vulnerabilities after running `npm audit fix`.

### Checks Still Required

- Test listing access with separate authenticated seller accounts.
- Verify that one seller cannot read another seller's draft or pending listings and photos.
- Test actual Storage uploads with valid and invalid file types and file sizes.
- Implement and verify secure signed URLs for displaying approved listing photos.
- Test the approval function using real admin and non-admin authentication contexts.
- Confirm whether identity documents require a separate private storage bucket.
- Review the remaining Vite configuration warnings.

Note: The database tests and policy reviews do not, by themselves, prove that all authenticated-user access scenarios are secure.

## 7. Team Handover

- Share the field names, listing types, statuses, and validation rules with Dasun.
- Ask Irushi to review listing access, photo access, and moderation rules.
- This work depends on the profiles and roles migration created by Malsha.
- Explain that the secure public photo-display flow and actual authenticated-user security tests remain outstanding.

## 8. Known Decisions and Limitations

- Listing photos use the private Supabase Storage bucket `listing-review`.
- Allowed file types are JPEG and PNG, with a configured maximum size of 8 MB per file.
- Each listing supports a maximum of three image records.
- The storage path follows `userId/listingId/imageId.ext`.
- Photo changes to approved listings return the listing to pending review when the image metadata record changes.
- A secure signed-URL flow has not yet been found in the frontend.
- Actual authenticated-user security tests and actual Storage upload validation remain to be completed.
