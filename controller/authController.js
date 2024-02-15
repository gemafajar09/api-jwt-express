'use strict';
const jwt               = require('jsonwebtoken');

const User = require('../model/userModel');
const secret_key = process.env.SECRET_KEY

exports.login = function(req, res) {
    const newUser = User.login(req.body);
    console.log(newUser);
    res.json(newUser)
    // if (!newUser) {
    //     return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // const token = jwt.sign({ userId: newUser.id }, secret_key);
    // res.json({ token });
};

exports.register = function(req, res) {
    const newUser = new User(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
    {
        res.status(400).send({ error:true, message: 'Harap lengkapi data User' });
    }
    else
    {
        User.register(newUser, function(err, user) {
            if (err)
            res.send(err);
            res.json({error:false,message:"simpan data berhasil!",data:user});
        });
    }
};