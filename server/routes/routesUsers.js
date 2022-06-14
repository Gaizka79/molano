const express = require('express');
const routesUsers = express.Router();
const { login, register, user } = require('../controllers/userControllers');
const passport = require('passport');

routesUsers.post('/login', login, (req, res) => {
    console.log("siguiente del login");
    console.log(req.isAuthenticated());
    //res.redirect('/Products');
    res.status(202);
})

/* routesUsers.post('/login', passport.authenticate('local', {
    successRedirect: 'http://localhost:5000/api/Products',
    successMessage: "Todo ok",
    failureRedirect: '/About'
}), (req, res) => {
    console.log("siguiente del login");
    //res.redirect('/Products');
    res.status(202);
}) */
    //console.log("fuera del login"));
routesUsers.get('/login', (req, res) => {
    res.send("Hola mundo");
})
routesUsers.post('/register', register, (req, res) => {
    console.log("loginnnn middleware del register");
    console.log(req.body);
});
routesUsers.get('/user', user);

routesUsers.get('/logout');

module.exports = routesUsers;