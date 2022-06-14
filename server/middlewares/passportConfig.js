const userDB = require('../models/users');
const bcrypt = require('bcryptjs');
//const { user } = require('../controllers/userControllers');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
//{ passReqToCallback: true}, <--- async ta username artean joango zen

passport.use(new passportLocal(function(username, password, done) {
    if (username === "Gaizka" && password === '123456')
        return done(null, { id: 1, name: 'Gaizka'});
    done(null, false);
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    done(null, { id: 1, name: 'Gaizka'});
})
