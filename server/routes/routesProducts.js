const express = require('express');
const routesProducts = express.Router();
const { getProducts, getProductById, postProducts, putProducts, deleteProducts, isAuthenticated } = require('../controllers/productControllers');
//const isAuthenticated = require('../utils/authenticated');

/* const isAuthenticated =  (req, res, next) => {
    console.log(req);
    if (req.isAuthenticated()) return next();
    res.redirect('/api');
}; */

routesProducts.get('/Products', getProducts);
routesProducts.get('/Products/:id', getProductById);
routesProducts.post('/Products/create', postProducts);
/* routesProducts.post('/Products/create', (req, res, next)=> {
    if (req.isAuthenticated()){
        console.log("autenticado");
        //return next();
    }else{
        console.log("no autenticado");
    }
} ,postProducts); */
routesProducts.put('/Products/edit/:id', putProducts)
routesProducts.delete('/Products/delete/:id', deleteProducts);

module.exports = routesProducts;