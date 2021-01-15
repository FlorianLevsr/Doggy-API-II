-- Revert Doggy-API:10-account-queries from pg

BEGIN;

DROP FUNCTION get_account (TEXT);

DROP FUNCTION store_token(TEXT, TEXT);

DROP FUNCTION get_token(TEXT);

COMMIT;
