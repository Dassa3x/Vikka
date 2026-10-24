# Listing Moderation Contract

**Project:** Vikka.lk  
**Owner:** Irushi  
**Purpose:** Define the expected rules for listing approval and rejection.

## 1. Listing Review Process

1. A seller creates a listing.
2. The listing remains in draft or pending status until it is reviewed.
3. An authorized admin opens the pending listing.
4. The admin chooses to approve or reject the listing.
5. A rejection must include a reason.
6. The decision and its details must be recorded for auditing.

## 2. Approval and Rejection Rules

- Only an authorized admin can approve or reject a listing.
- A seller must not approve or reject their own listing.
- A normal user must not be able to approve a listing by sending `status=approved` from the client.
- A normal user must not be able to grant themselves admin privileges.
- Rejection reasons should be recorded and shown only to the users authorized to view them.

## 3. Audit Record

Each moderation decision should record:

- Listing ID
- Admin user ID (actor)
- Previous listing status
- New listing status
- Decision timestamp
- Rejection reason, when applicable

## 4. Security Requirements

- The server-side process must verify the user's admin permission.
- Client-side buttons or hidden UI elements must not be treated as security controls.
- Only authorized users should be able to update moderation status.
- Audit records must not be editable by ordinary users.
- Approval or rejection should not succeed if the authorization check fails.

## 5. Acceptance Tests

| Test ID | Test | Expected Result |
|---|---|---|
| MOD-01 | Admin approves a pending listing | Listing becomes approved and decision is audited |
| MOD-02 | Admin rejects a pending listing with a reason | Listing becomes rejected and reason is recorded |
| MOD-03 | Seller attempts to approve a listing | Request is denied |
| MOD-04 | Seller attempts to approve their own listing | Request is denied |
| MOD-05 | Buyer attempts to change status to approved | Request is denied |
| MOD-06 | User attempts to assign themselves the admin role | Request is denied |
| MOD-07 | Unauthorized user attempts to view a private listing | Access is denied |

## 6. Pending Confirmations

- Confirm the final listing status values with Dulakmi.
- Confirm the admin approval/rejection flow with Dasun.
- Confirm who can view rejection reasons.
- Run acceptance tests against the agreed staging or preview environment before marking them as passed.

**Status:** Draft — pending team confirmation and implementation/testing.