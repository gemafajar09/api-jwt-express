'use strict';

const User = require('../model/userModel');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.login = function(req, res) {
    const { email, password } = req.body;
    User.login(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password, data.user_password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });
};

exports.register = function(req, res) {
    const { nama, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(nama.trim(), email.trim(), hashedPassword);

    User.register(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.home = function(req, res) {
    const data = req.user;
    console.log(req.user);
    res.status(201).send({
        status: "success",
        data: data.id
    });
};