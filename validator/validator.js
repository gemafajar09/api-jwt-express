const Joi = require('joi');

const validatorHandler = require('../middleware/validatorhandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        user_nama: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),

        user_email: Joi.string()
            .trim()
            .email()
            .required(),

        user_password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        user_email: Joi.string()
            .trim()
            .email()
            .required(),
        user_password: Joi.string()
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