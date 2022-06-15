const express = require('express');
const routesUsers = express.Router();
const { login, signUp } = require('../controllers/userControllers');
//const passport = require('passport').Strategy;

routesUsers.post('/Login', login , (req, res) => {console.log("Siguiente del login!!");} );
routesUsers.post('/Signup', signUp, login, (req, res) => {console.log("Siguiente del SignUp!!");});
/* routesUsers.post('/Products/create', postProducts);
routesUsers.put('/Products/edit/:id', putProducts)
routesUsers.delete('/Products/delete/:id', deleteProducts); */

module.exports = routesUsers;