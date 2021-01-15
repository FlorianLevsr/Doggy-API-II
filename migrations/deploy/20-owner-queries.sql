-- Deploy Doggy-API:20-dog-queries to pg

BEGIN;

-- vue pour obtenir list des propriétaires

CREATE VIEW gather_all_owners AS
SELECT
	owners.id as owner_id,
	owners.name as owner_name,
	json_build_object(
		'name', d.name, 
		'gender', g.name, 
		'breed', b.name, 
		'favorite_food', array_agg(COALESCE(f.name, 'Not specified by owner'))) as dog
FROM
	"doggyAPI"."owner" owners
LEFT JOIN
	"doggyAPI"."dog" d ON d.owner_id = owners.id
LEFT JOIN
	"doggyAPI"."gender" g ON d.gender_id = g.id
LEFT JOIN
	"doggyAPI"."breed" b ON d.breed_id = b.id
LEFT JOIN 
	"doggyAPI"."m2m_dog_favorite_food" m2m ON m2m.dog_id = d.id
LEFT JOIN 
	"doggyAPI"."favorite_food" f ON m2m.favorite_food_id = f.id
GROUP BY
	owners.id, owners.name, d.name, g.name, b.name;


CREATE TYPE owner_json_model AS ("owner_id" INT, "owner_name" TEXT, "number_of_dog" BIGINT, "dog" JSON[]);

-- fonction permettant d'obtenir la liste de tous les propriétaires.

CREATE FUNCTION get_all_owners() RETURNS SETOF owner_json_model AS 
$$
SELECT
    owner_id,
    owner_name,
    COUNT(dog) as number_of_dog,
    array_agg(dog) as dog
FROM
    gather_all_owners
GROUP BY
    owner_id, owner_name
ORDER BY
    owner_id;
$$
LANGUAGE SQL STRICT;

-- fonction permettant d'obtenir un propriétaire grâce à son id

CREATE FUNCTION get_one_owner(ownerId INT) RETURNS SETOF owner_json_model AS 
$$
SELECT
    owner_id,
    owner_name,
    COUNT(dog) as number_of_dog,
    array_agg(dog) as dog
FROM
    gather_all_owners
WHERE
    owner_id = ownerId
GROUP BY
    owner_name,
    owner_id;
$$ 
LANGUAGE SQL STRICT;

-- fonction permettant de créer un propriétaire

CREATE FUNCTION create_owner(ownerName TEXT) RETURNS SETOF "doggyAPI"."owner" AS
$$
	INSERT INTO "doggyAPI"."owner" ("name") VALUES (ownerName) RETURNING *;
$$
LANGUAGE SQL STRICT;

-- fonction pour supprimer un propriétaire

CREATE FUNCTION delete_owner(ownerId INT) RETURNS SETOF "doggyAPI"."owner" AS
$$
    DELETE FROM "doggyAPI"."owner" WHERE id = ownerId RETURNING *;
$$
LANGUAGE SQL STRICT;

-- fonction pour modifier un propriétaire

CREATE FUNCTION update_owner(ownerId INT, ownerName TEXT) RETURNS SETOF "doggyAPI"."owner" AS
$$
    UPDATE "doggyAPI"."owner" SET "name" = ownerName
    WHERE id = ownerId
    RETURNING *;
$$
LANGUAGE SQL STRICT;

COMMIT;