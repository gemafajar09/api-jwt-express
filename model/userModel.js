'use strict';
var conn = require('../config/koneksi');
var passwordHash = require('password-hash');

var User = function(user){
    this.user_nama     = user.user_nama;
    this.user_email    = user.user_email;
    this.user_password = user.user_password;
};

User.login = function (user, result) {
    conn.query("SELECT * FROM tb_user WHERE user_email = ?", [user.user_email], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            var pass = passwordHash.verify(user.user_password, res.user_password)
            if(!pass) return
            result(null, res.id);
        }
    });
};

User.register = function (user, result) {
    var pass = passwordHash.generate(user.user_password);
    conn.query("INSERT INTO tb_user (user_nama,user_email,user_password) VALUES (?,?,?)", [user.user_nama, user.user_email, pass], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

module.exports= User;