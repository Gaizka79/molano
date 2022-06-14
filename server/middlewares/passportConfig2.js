const userDB = require('../models/users');
const bcrypt = require('bcryptjs');
//const { user } = require('../controllers/userControllers');
const localStrategy = require('passport-local').Strategy;
const passportLocal = require('passport-local').Strategy;
//{ passReqToCallback: true}, <--- async ta username artean joango zen
module.exports = function(passport) {
    console.log("fdasjflsdjflassj");
    passport.use('local',   
        new localStrategy(async (username, password, done) => {  //email --> username
            console.log(username);
            console.log(password);
            if( username === "Gaizka" && password === "123456") {
                console.log("nos vamos en el iffff");
                return done(null, { id: 1, name: "Gaizka"});
            }
            else {
                done(null, false);
            }
            /* await userDB.findOne({ email: email }, (err, user) => {
                console.log("middleware passport");
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done( null, false);
                    }
                });
            }); */
        })
    );
    passport.serializeUser((user, done) => {
        console.log("SERIALIZEUSER******************");
        console.log(user);
        console.log(done);
        //cb(null, user.id);
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        done(null, { id: 1, name: "Gaizka"});
        /* userDB.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                username: user.username
            };
            cb(err, userInformation);
        }); */
    })
    
};