-- Deploy Doggy-API:10-account-queries to pg

BEGIN;

CREATE FUNCTION get_account (data TEXT) RETURNS "doggyAPI"."account" AS
$$
	SELECT * FROM "doggyAPI"."account" c WHERE c.username = data;
$$
LANGUAGE SQL STRICT;


CREATE FUNCTION store_token(token TEXT, username TEXT) RETURNS VOID AS
$$
	INSERT INTO "doggyAPI"."token" ("token", "user") VALUES (token, username);
$$
LANGUAGE SQL STRICT;

CREATE FUNCTION get_token(token TEXT) RETURNS "doggyAPI"."token" AS
$$
	SELECT * FROM "doggyAPI"."token" WHERE "token" = token;
$$
LANGUAGE SQL STRICT;

COMMIT;
