module.exports = {

    error: (_, response) => {

        response.status(404).json('route inconnue!');

    }

};