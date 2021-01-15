-- Revert Doggy-API:20-dog-queries from pg

BEGIN;

DROP FUNCTION get_all_owners();
DROP FUNCTION get_one_owner(INT);
DROP FUNCTION create_owner(TEXT);
DROP FUNCTION delete_owner(INT);
DROP FUNCTION update_owner(INT, TEXT);

DROP TYPE owner_json_model;

DROP VIEW gather_all_owners;

COMMIT;
