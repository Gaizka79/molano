const express = require('express');
const routesUsers = express.Router();
const { login, signUp, logOut, amILogged } = require('../controllers/userControllers');
const passport = require('passport');
require('../utils/auth')(passport);

routesUsers.post('/Login', passport.authenticate('local', {
    //successRedirect: 'http://localhost:3000/Products',
    failureRedirect: '/Login' 
    }), (req, res) => {
        console.log("Siguiente del login!!");
        console.log(req.isAuthenticated());
        console.log(req.headers);
        console.log("ya ahora header");
        console.log(req.header);
    });
routesUsers.post('/Signup', signUp, login, (req, res) => {console.log("Siguiente del SignUp!!");});
routesUsers.get('/Logout', logOut);
routesUsers.get('/Islogged', passport.authenticate('local'));
/* routesUsers.post('/Products/create', postProducts);
routesUsers.put('/Products/edit/:id', putProducts)
routesUsers.delete('/Products/delete/:id', deleteProducts); */

module.exports = routesUsers;