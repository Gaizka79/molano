const express = require('express');
const routesUsers = express.Router();
const { login, signUp, logOut, amILogged } = require('../controllers/userControllers');
const passport = require('passport');
require('../utils/auth')(passport);

routesUsers.post('/Login', login , (req, res) => {console.log("Siguiente del login!!");} );
routesUsers.post('/Signup', signUp, login, (req, res) => {console.log("Siguiente del SignUp!!");});
routesUsers.get('/Logout', logOut);
routesUsers.get('/Islogged', amILogged);
/* routesUsers.post('/Products/create', postProducts);
routesUsers.put('/Products/edit/:id', putProducts)
routesUsers.delete('/Products/delete/:id', deleteProducts); */

module.exports = routesUsers;