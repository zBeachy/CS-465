const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async (req, res) => {
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);

    if(!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message":"All fields required"});
    }

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        console.log('Attempting to save user');
        await user.save();
        console.log('User saved successfully');

        const token = user.generateJwt();
        res
            .status(200)
            .json({token});
    } catch (err) {
        console.log('Error saving user:', err);
        res
            .status(400)
            .json(err);
    }
};

const login = (req, res) => {
    console.log('Login endpoint hit');
    console.log('Request body:', req.body);

    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message":"All fields required"});
    }
    passport.authenticate('local', (err, user, info) => {
        console.log('Passport authenticate callback reached');
        console.log('Error:', err);
        console.log('User:', user);
        console.log('Info:', info);
        
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        } else {
            res
                .status(401)
                .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
};