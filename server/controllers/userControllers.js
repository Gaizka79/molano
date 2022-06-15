require ('mongoose');
const passport = require('passport');
require('../utils/auth')(passport);
const bcrypt = require('bcryptjs'),
    users = require('../models/users'),
    jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    try{
        users.findOne({username: req.body.username}, async (err, doc) => {
            if (err) res.status(500).send(err);
            if (doc) res.status(409).send("User already exists");
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password,10);
                const newUser = new users({
                    username: req.body.username,
                    password: hashedPassword,
                    email: "fake@email.com"
                });
                console.log(newUser);
                await newUser.save();
                res.status(200).send(req.body);
                next();
            }
        })
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

const login = (req, res, next) => {
    console.log("loginnnnnnn");
    console.log((req.body));
    passport.authenticate('local', async (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User exists");
        else {
            req.login(
                user,
                { session: false },
                async (error) => {
                    
                    if (error) return next(error);
    
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, 'TOP_SECRET');
    
                    //return res.json({ token });
                    console.log(token);
                    next();
                }
            );
        }
    })(req, res, next);
};

const userControllers = {
    signUp,
    login
};

module.exports = userControllers;