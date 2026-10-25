# Vikka.lk — QA Smoke Test Results

**Tester:** Irushi  
**Environment:** Staging / Cloudflare Preview  
**Date:** 2026-10-23

## 1. Guest User Tests

| Test ID | Test | Result | Status |
|---|---|---|---|
| QA-01 | Open staging website | Website loaded successfully | Pass |
| QA-02 | View approved listings as guest | Listings were visible | Pass |
| QA-03 | Open listing details as guest | Details page opened | Pass |
| QA-04 | Access private/pending listing as guest | No suitable test listing was found | Not Tested |

## 2. Buyer Account Tests

| Test ID | Test | Result | Status |
|---|---|---|---|
| QA-05 | Login as Buyer A | Test account not available | Blocked |
| QA-06 | View Buyer A profile | Not tested because the account is unavailable | Not Tested |

## 3. Outstanding Items

- Request approved staging test accounts from Malsha or Dasun.
- Obtain a suitable test listing with pending/private status.
- Continue profile and listing permission tests when the test accounts and data are available.

**Note:** Only observed results are marked Pass. Blocked and untested cases must be tested before final QA sign-off.

## 4. Authentication Integration Check

| Test ID | Test | Result | Status |
|---|---|---|---|
| QA-07 | Check frontend for Supabase authentication integration | Searches for `createClient`, `signInWithPassword`, `supabase`, and `VITE_SUPABASE_URL` returned no results in the inspected codebase | Needs Investigation |
| QA-08 | Check login button behavior | The inspected login button calls `done()` directly, which sets `loggedIn` to `true` and navigates to the dashboard | Needs Investigation |

**Finding:** The inspected frontend code does not show a Supabase authentication integration. The login flow appears to navigate to the dashboard without a visible credential-verification call. Further investigation is required before confirming authentication behavior across the whole project.

**Follow-up:** Confirm the intended frontend integration and authentication setup with the team before changing code or signing off QA.