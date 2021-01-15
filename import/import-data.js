require('dotenv').config();

const { Client } = require('pg');


const dogs = require('../data/dogs.json');
const genders = require('../data/genders.json');
const breeds = require('../data/breeds.json');
const owners = require('../data/owners.json');
const favoriteFoods = require('../data/favorite_foods.json');
const dogFavoriteFoodRelation = require('../data/dogs_favorite_food.json');
const accounts = require('../data/accounts.json');


( async () => {

    const client = new Client();
    await client.connect();
    console.log('Client connected');


    console.log('Cleaning tables "dog", "gender", "breed", "owner", "favorite_food" and "m2m_dog_favourite_food"');
    await client.query('TRUNCATE TABLE "doggyAPI"."dog", "doggyAPI"."gender", "doggyAPI"."breed", "doggyAPI"."owner", "doggyAPI"."favorite_food", "doggyAPI"."m2m_dog_favorite_food" RESTART IDENTITY');


    console.log('Processing: genders.json');

    for (let entry of genders) {

        const result = await client.query('INSERT INTO "doggyAPI"."gender" ("name") VALUES ($1)', [entry.name]);

    };

    console.log('Processing: breeds.json');

    for (let entry of breeds) {

        const result = await client.query('INSERT INTO "doggyAPI"."breed" ("name") VALUES ($1)', [entry.name]);

    };

    console.log('Processing: owners.json');

    for (let entry of owners) {

        const result = await client.query('INSERT INTO "doggyAPI"."owner" ("name") VALUES ($1)', [entry.name]);

    };

    console.log('Processing: favorite_foods.json');

    for (let entry of favoriteFoods) {

        const result = await client.query('INSERT INTO "doggyAPI"."favorite_food" ("name") VALUES ($1)', [entry.name]);

    };

    console.log('Processing: dogs.json');

    for (let entry of dogs) {

        const result = await client.query('INSERT INTO "doggyAPI"."dog" ("name", "gender_id", "breed_id", "owner_id") VALUES ($1, $2, $3, $4)', [entry.name, entry.gender_id, entry.breed_id, entry.owner_id]);

    };

    console.log('Processing: dogs_favorite_foods.json');

    for (let entry of dogFavoriteFoodRelation) {

        const result = await client.query('INSERT INTO "doggyAPI"."m2m_dog_favorite_food" ("dog_id", "favorite_food_id") VALUES ($1, $2)', [entry.dog_id, entry.favorite_food_id]);

    };

    console.log('Processing: accounts.json');

    for (let entry of accounts) {

        const result = await client.query('INSERT INTO "doggyAPI"."account" ("username", "password") VALUES ($1, $2)', [entry.username, entry.password]);

    };

    console.log('Data import OK')

    client.end();
    console.log('Client disconnected');

})();