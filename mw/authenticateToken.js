require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {

    authenticateToken: (request, response, next) => {

        const authHeader = request.headers['authorization'];

        const token = authHeader.split(' ')[1];

        if (!token) {

            return response.sendStatus(401);

        };

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

            if (error) {

                return response.sendStatus(403);

            }

            next();

        });

    }

};