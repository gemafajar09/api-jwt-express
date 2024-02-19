const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generate = (id) => jwt.sign({ id }, SECRET_KEY, { expiresIn: '1d' });

const decode = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}