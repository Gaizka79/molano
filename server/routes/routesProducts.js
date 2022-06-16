const express = require('express');
const routesProducts = express.Router();
//const { getProducts, putProducts, postProducts, deleteProducts } = require('../controllers/productControllers');
const { getProducts, getProductById, postProducts, putProducts, deleteProducts } = require('../controllers/productControllers');
const { isLogged } = require('../controllers/userControllers');

routesProducts.get('/Products', getProducts);
routesProducts.get('/Products/:id', getProductById)
routesProducts.post('/Products/create', isLogged, postProducts);
routesProducts.put('/Products/edit/:id', putProducts)
routesProducts.delete('/Products/delete/:id', deleteProducts);

module.exports = routesProducts;