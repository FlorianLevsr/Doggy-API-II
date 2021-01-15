const client = require('../redis/cached-client');

module.exports = {

    getAllOwners: async () => {

        const preparedQuery = { text: `SELECT * FROM get_all_owners()` };

        const result = await client.query(preparedQuery);

        for (const item of result.rows) {


            if (item.dog[0].name == null) {
                item.dog = 'Aucun chien enregistré';
                item.number_of_dog = '0';
            };

        };

        return result.rows;
    },

    getOneOwner: async (ownerId) => {

        const preparedQuery = {
            text: `SELECT * FROM get_one_owner($1)`,
            values: [ownerId]
        };

        const result = await client.query(preparedQuery);

        console.log(result.rows);

        if(!result.rows[0]) {

            return;

        } else if (result.rows[0].dog[0].dog == null) {

            result.rows[0].dog = 'Aucun chien enregistré';
            result.rows[0].number_of_dog = '0';

        };

        return result.rows[0];
    },

    createOneOwner: async (ownerName) => {

        console.log(ownerName);
        
        const preparedQuery = {
            text: `SELECT * FROM create_owner($1)`,
            values: [ownerName]
        };

        const result = await client.query(preparedQuery);

        return result.rows[0];

    },

    deleteOneOwner: async (ownerId) => {

        const preparedQuery = {
            text: `SELECT * FROM delete_owner($1)`,
            values: [ownerId]
        };

        const result = await client.query(preparedQuery);

        return result.rows;
        
    },

    updateOneOwner: async (ownerId, ownerName) => {

        const preparedQuery = {
            text: `SELECT * FROM update_owner($1, $2)`,
            values: [ownerId, ownerName]
        };

        const result = await client.query(preparedQuery);

        return result.rows;
        
    },


}