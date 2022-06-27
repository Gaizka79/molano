const User = require('../models/users');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy({ passReqToCallback: true }, (req, username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        console.log("login ok");
                        return done(null, user);
                    } else {
                        return done( null, false);
                    }
                });
            });
        })
    );
    passport.serializeUser((user, cb) => {
        console.log("En el serializeUser");
        cb(null, user.id);
    })
    passport.deserializeUser((id, cb) => {
        console.log("En el DEserializeUser");
        User.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                username: user.username
            };
            console.log(userInformation);
            cb(err, userInformation);
        });
    })
};