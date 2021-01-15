module.exports = {

    validateBody: schema => {

        return (request, response, next) => {
            
            const { error } = schema.validate(request.body);

            if (error) {
                response.status(400).json(error);
                return;
            }

            next();
        };
    }
};