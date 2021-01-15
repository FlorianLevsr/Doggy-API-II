-- Deploy Doggy-API:00-create-tables to pg

BEGIN;

-- SCHEMAS

CREATE SCHEMA "doggyAPI";

-- TABLES DU SCHEMA DOGGYAPI (8)

CREATE TABLE "doggyAPI"."gender" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."breed" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."owner" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."favorite_food" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."dog" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender_id" INT NOT NULL REFERENCES "doggyAPI"."gender"("id") ON DELETE CASCADE,
    "breed_id" INT NOT NULL REFERENCES "doggyAPI"."breed"("id") ON DELETE CASCADE,
    "owner_id" INT NOT NULL REFERENCES "doggyAPI"."owner"("id") ON DELETE CASCADE

);

CREATE TABLE "doggyAPI"."m2m_dog_favorite_food" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "dog_id" INT NOT NULL REFERENCES "doggyAPI"."dog"("id") ON DELETE CASCADE,
    "favorite_food_id" INT NOT NULL REFERENCES "doggyAPI"."favorite_food"("id") ON DELETE CASCADE
    
);

CREATE TABLE "doggyAPI"."account" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
    
);

CREATE TABLE "doggyAPI"."token" (

    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "token" TEXT NOT NULL,
    "user" TEXT NOT NULL
);


COMMIT;
