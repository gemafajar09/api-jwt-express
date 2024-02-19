const Joi = require('joi');

const validatorHandler = require('../middleware/validatorhandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        nama: Joi.string()
            .trim()
            .required(),

        email: Joi.string()
            .trim()
            .email()
            .required(),

        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin
};