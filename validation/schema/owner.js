const Joi = require('joi');

module.exports = {

    createOwnerSchema: Joi.object({
    
        name: Joi.string().regex(/[a-zA-Z\-]/).required()

    }).required(),


    editOwnerSchema: Joi.object({
    
        name: Joi.string().regex(/[a-zA-Z\-]/).allow('', null)
        
    })

};