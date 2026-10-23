begin;

select plan(5);

select ok(
  to_regprocedure('public.admin_approve_listing(uuid)') is not null,
  'Admin approval function exists'
);

select ok(
  has_function_privilege(
    'anon',
    'public.admin_approve_listing(uuid)',
    'EXECUTE'
  ) = false,
  'Anonymous users cannot execute approval function'
);

select ok(
  has_function_privilege(
    'authenticated',
    'public.admin_approve_listing(uuid)',
    'EXECUTE'
  ),
  'Authenticated users can call the function for internal role checks'
);

select ok(
  pg_get_functiondef(
    'public.admin_approve_listing(uuid)'::regprocedure
  ) like '%user_roles%',
  'Function checks user roles'
);

select ok(
  pg_get_functiondef(
    'public.admin_approve_listing(uuid)'::regprocedure
  ) like '%pending%',
  'Function checks pending listing status'
);

select * from finish();

rollback;