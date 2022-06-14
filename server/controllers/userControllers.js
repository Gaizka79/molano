require('mongoose');
require('../config/mongoConfig');
const passport = require('passport');
const createHash = require('../utils/hash');
const bcrypt = require('bcryptjs');

const passportLocal = require('passport-local').Strategy;
const express = require('express');
const app = express();
const session = require('express-session');
//require('../middlewares/passportConfig')(passport);
const passport2 = require('../middlewares/passportConfig');

const usersDB = require('../models/users');



const login = (req, res, next) => {
    console.log("req.body=");
    console.log(req.body);
    passport.use(new passportLocal('local', (username, password, done) => {
        console.log("en la mierda del middleware");
        console.log(username);
        console.log(password);
          if (username === "Gaizka" && password === "123456"){
            console.log("usernamey passwordes todo ok");
            return done( null, { id: 1, name: "Gaizka"})
          } else {
            console.log("no es igual a gaizka");
          }
        })
      );
    passport.serializeUser((user, done) => {
        done(null, user.id);
        console.log("serilizeuser");
        console.log(req.isAuthenticated());
    });
    passport.deserializeUser((id, done) => {
        console.log("desiralizeuser");
        done(null, { id: 1, name: "Gaizka" })
    })
    passport.authenticate('local', {
    successRedirect: 'http://localhost:5000/api/Products',
    successMessage: "Todo ok",
    failureRedirect: '/About'
    });
    console.log("login okokoko");
    //console.log(req.cookies);
    console.log(req.isAuthenticated());
    //next();
}
passport.use(new passportLocal('local', (username, password, done) => {
    console.log("en la mierda del middleware");
    console.log(username);
    console.log(password);
      if (username === "Gaizka" && password === "123456"){
        console.log("usernamey passwordes todo ok");
        return done( null, { id: 1, name: "Gaizka"})
      } else {
        console.log("no es igual a gaizka");
      }
    })
  );
passport.serializeUser((user, done) => {
    done(null, user.id);
    consoel.log("serilizeuser");
    console.log(req.isAuthenticated());
});
passport.deserializeUser((id, done) => {
    console.log("desiralizeuser");
    done(null, { id: 1, name: "Gaizka" })
})

const register = (req, res, next) => {
    passport.authenticate('register', {

    })
}
const login2 = (req, res, next) => {
    console.log("loginnnnn");
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/Products',
        successMessage: "Todo ok",
        failureRedirect: "/kaixo"
    });
    next();
};
const login3 = (req, res, next) => { //Next jarri dut neuk
    console.log("logindndndnd");
    console.log(req.body);
    passport.authenticate('login', async ( err, user, info) => {   //login --> local
        user = req.body.email;
        console.log("authenitcate");
        //console.log(req);
        //console.log(req.logIn());
        console.log(err);
        console.log(user);
        console.log(info);
        if (err) throw err;
        if (!user) res.send("no User exists");
        else {
            console.log("vamos a req.login");
            await req.logIn(user, err => {
                console.log("estamos en logIn");
                console.log(user);
                console.log(err);
                if (err) throw err;
                //res.send("succesfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
    console.log("fin");
    next();
};

const register2 = async (req, res, next) => {
    usersDB.findOne({email: req.body.email}, async (err, doc) => {
        if ((err) => console.log("Mierda de error: " + err)) ;
        if (doc) res.status(202).send("User already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password,10);
            const newUser = new usersDB({
                email: req.body.email,
                password: hashedPassword
            });
            try {
                await newUser.save()
                /* .then(console.log(`${newUser.email} creado OK!`))
                .then(res.status(200).send("user created")) */
                req.body.password = newUser.password;
                next();
            }
            catch(err) {
                console.log(`Error: ${err}`);
                (res.status(500).send(err));
            }
        }
    })
};

const user = (req, res) => {
    console.log(req);
    res.send(req.user);
};

const userControllers = {
    login,
    register,
    user
};

module.exports = userControllers;