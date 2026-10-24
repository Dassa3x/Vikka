# Admin Rules + QA Permission Matrix

**Project:** Vikka.lk  
**Owner:** Irushi  
**Purpose:** Document expected permissions and security checks for listings and admin actions.

## 1. Test Roles

- Guest
- Buyer A
- Buyer B
- Seller A
- Admin A

## 2. Permission Matrix

| Action | Guest | Buyer | Seller | Admin |
|---|---|---|---|---|
| Browse approved listings | Allowed | Allowed | Allowed | Allowed |
| Read own profile | Denied | Own profile only | Own profile only | Own profile only |
| Read another user's private profile | Denied | Denied | Denied | Only if explicitly authorized |
| Read own draft/pending listing | Denied | If permitted by the agreed role rules | Own listings only | According to review rules |
| Create a draft listing | Denied | Confirm required role | Own listing | Confirm agreed rules |
| Approve or reject a listing | Denied | Denied | Denied | Admin only |
| Change own role to admin | Denied | Denied | Denied | Must use a trusted, authorized process |

## 3. Negative Security Tests

- Verify that a guest cannot access private listings.
- Verify that Buyer A cannot read Buyer B's private listing.
- Verify that a seller cannot approve or reject their own listing.
- Verify that a normal user cannot grant themselves the admin role.
- Verify that sending `status=approved` from the client does not bypass authorization.
- Verify that unauthorized users cannot access private listing photos.

## 4. Evidence to Capture

For each test, record:

- Test case ID
- Account role used
- Steps performed
- Expected result
- Actual result
- Pass/Fail
- Screenshot or relevant error/log
- Preview URL and build, where applicable

**Status:** Draft — complete testing results after running the checks against the agreed staging/preview environment.

**Open questions:** Confirm with Malsha and Dulakmi whether buyers can create listings or must first have the seller role. Confirm the agreed admin review rules before marking those cases as passed.