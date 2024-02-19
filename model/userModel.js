'use strict';
const conn = require('../database/koneksi');
const { logger } = require('../utils/logger');
const {
    registerUser: formRegister,
    loginUser: formLogin,
    getUser: getUser
} = require('../database/query')

class User {
    constructor(nama, email, password) {
        this.nama = nama;
        this.email = email;
        this.password = password;
    }

    static register(newUser, cb) {
        conn.query(formRegister, [
            newUser.nama,
            newUser.email,
            newUser.password
        ], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, {
                id: res.insertId,
                nama: newUser.nama,
                email: newUser.email
            });
        });
    }

    static login(email, cb) {
        conn.query(formLogin, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static home(id, cb) {
        conn.query(getUser, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;