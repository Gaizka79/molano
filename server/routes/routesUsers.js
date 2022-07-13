const express = require('express');
const routesUsers = express.Router();
const { login, restore, signUp, logOut, amILogged } = require('../controllers/userControllers');
const { verifyJWT } = require('../utils/jwt');
const passport = require('passport');
require('../config/passport');
//require('../utils/auth')(passport);

routesUsers.post('/Login', login, (req, res) => {
    console.log("Login ok!");
    //res.status(200).send({ msg: "Login OK" });
    });
routesUsers.get('/Restore', restore);
routesUsers.post('/Signup', signUp, login, (req, res) => {console.log("Siguiente del SignUp!!");});
routesUsers.get('/Logout', logOut);
routesUsers.get('/Islogged', passport.authenticate('local'));
routesUsers.get('/User', verifyJWT, (req, res) => { res.status(200).send(res)});
routesUsers.get('/isUserAuth', verifyJWT, (req, res) => { res.send("You're authenticated")});
/* routesUsers.post('/Products/create', postProducts);
routesUsers.put('/Products/edit/:id', putProducts)
routesUsers.delete('/Products/delete/:id', deleteProducts); */

module.exports = routesUsers;