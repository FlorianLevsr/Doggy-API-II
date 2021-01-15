require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const accountDataMapper = require('../datamappers/accountDataMapper');

module.exports = {

    login: async (request, response) => {

        try {

            if (!request.body.username || !request.body.password) {

                return response.status(400).json({ message: 'Username or password field cannot be blank.' });

            };

            const checkAccount = await accountDataMapper.checkAccount(request.body.username, request.body.password);

            if (!checkAccount) {

                return response.status(400).json({ message: 'Utilisateur inconnu!' })

            };

            const comparison = await bcrypt.compareSync(request.body.password, checkAccount.password);

            if (!comparison) {

                return response.status(400).json({ message: 'Mot de passe incorrect!' })

            };

            const accessToken = jwt.sign({ username: request.body.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

            const refreshToken = jwt.sign({ username: request.body.username }, process.env.REFRESH_TOKEN_SECRET);

            await accountDataMapper.storeToken(refreshToken, request.body.username);

            // tokens are in this case directly returned in json format for teaching purposes
            // copy accessToken and use it as authorization headers, format: Bearer <token>. Otherwise, you won't be able to use routes which need an authentification 

            response.cookie('jwt', accessToken, refreshToken).json({ message: 'Connecté!', acces_token: accessToken, refresh_token: refreshToken });


        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    logout: (_, response) => {

        response.cookie('jwt', { maxAge: 0 }).status(200).json({ message: "ok" });

    }

};