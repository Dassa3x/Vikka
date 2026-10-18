# Supabase Auth + RLS — Test Evidence (Malsha)

**Branch:** feature/supabase-auth-rls
**Staging project:** vikka-staging (South Asia — Mumbai) · Project ref: `<PROJECT_REF>`
**Migration:** supabase/migrations/20261018182010_create_profiles_roles.sql
**Date:** 2026-10-18

## Schema

- `public.profiles(id → auth.users, full_name, registration_no unique, created_at)`
- `public.user_roles(user_id → auth.users, role check(buyer/seller/admin) default 'buyer', created_at)`
- RLS enabled on both tables. Policies: `profile_read_own`, `profile_update_name_own`, `role_read_own`
- Trigger `on_auth_user_created_vikka` → `handle_new_vikka_user()` (security definer): auto profile + `buyer` role on signup

## Commands run

- `npx supabase login` → logged in
- `npx supabase link --project-ref <PROJECT_REF>` → linked to vikka-staging
- `npx supabase db push --dry-run` → "Would push these migrations: 20261018182010_create_profiles_roles.sql"
- `npx supabase db push` → "Applying migration... Finished supabase db push."
- Local `supabase start` / `db reset` skipped (no Docker) — migration reviewed via dry-run output then pushed to staging only

## Security test matrix

| Case ID | Account | Action | Expected | Observed |
|---|---|---|---|---|
| RLS-01 | Guest | Read profiles | No records | Pass — 401 Unauthorized |
| AUTH-02 | Buyer A | Login + read own profile | Own record only | Pass — 1 row |
| AUTH-02b | Buyer A | Read own role | role=buyer | Pass |
| RLS-02 | Buyer B | Read Buyer A profile by id | No record | Pass — empty |
| AUTH-03 | Buyer A | Update own full_name | Success | Pass |
| RLS-03 | Buyer A | Update role to admin | Denied | Pass — 403 Forbidden |
| RLS-04 | Buyer A | Update registration_no | Denied | Pass — 403 Forbidden |
| RLS-05 | Buyer A | Update Buyer B full_name | No change | Pass — 0 rows |
| AUTH-04 | Buyer A | Re-read after update | Value persists | Pass |
| AUTH-01 | Test user | Signup → email confirm → login | Session returned | Pass |
| AUTH-05 | Test user | Reset password → new password login | Login works | Pass |

## Security notes

- No secret/service-role keys, DB passwords, tokens or test passwords committed.
- `user_roles` UPDATE denied to client (403) — role grants only via trusted admin SQL.
- `registration_no` self-edit denied (403) — user grant limited to `full_name`.
- Guest access denied (401).

## Reviewers

- Irushi (access/security)
- Dulakmi (listing integration)
- Dasun (frontend contract)