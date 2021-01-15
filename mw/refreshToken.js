require('dotenv').config();
const jwt = require('jsonwebtoken');

const accountDataMapper = require('../datamappers/accountDataMapper');

module.exports = {

    refreshToken: async (request, response, next) => {

        const refreshToken = request.body.token;

        if(refreshToken == null) {

            return response.status(401).json({ message: 'Aucun token'});

        };

        const checkToken = await accountDataMapper.checkToken(refreshToken);

        if(!checkToken) {

            return response.status(401).json({ message: 'Token non enregistré'});

        };

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

            if (err) return response.status(403);

            const accessToken = jwt.sign({ username: checkToken.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

            // accessToken is here directly returned in json for educational purposes

            response.cookie('jwt', accessToken).json({ message: 'Connecté!', acces_token: accessToken });

        });


    }

};