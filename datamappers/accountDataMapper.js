const client = require('../database/clients');
const bcrypt = require('bcrypt');

module.exports = {

    checkAccount: async (username, password) => {

        const preparedQuery = {

            text: 'SELECT * FROM get_account($1)',
            values: [username]

        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0 || result.rows[0].id === null) {
            return;
        };

        const comparison = bcrypt.compareSync(password, result.rows[0].password);

        if (!comparison) {
            return;
        };

        return result.rows[0];

    },

    storeToken: async (refreshToken, user) => {

        const preparedQuery = {

            text: 'SELECT * FROM store_token($1, $2) ',
            values: [refreshToken, user]

        };

        const result = await client.query(preparedQuery);

    },

    checkToken: async (refreshToken) => {

        const preparedQuery = {

            text: 'SELECT * FROM get_token($1)',
            values: [refreshToken]

        };

        const result = await client.query(preparedQuery);

        return result.rows[0];

    },


}