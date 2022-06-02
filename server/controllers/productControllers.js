require ('mongoose');
const db = require('../utils/mongoConfig');
//const products = require('../models/products');  
const productsDB = require('../models/productModel');

const getProducts = async (req, res) => {
    console.log("getProductsen gaude");
    try{
        const allProducts = await productsDB.getAllProducts();
        console.log(allProducts);
        res.status(200).json(allProducts);
        //res.status(200).send(allProducts);
    }
    catch(err){
        console.log(`Error en getProducts: ${err}`);
        throw(err);
    }
};

const getProductById = async (req, res) => {
    console.log("paramsssss");
    console.log(req.params);
    try {
        const oneProduct = await productsDB.getById(req.params.id);
        console.log(oneProduct);
        res.status(200).send(oneProduct);
    }
    catch(err) {
        console.log(`Error in postProducts: ${err}`);
        throw(err);
    }
}

const postProducts = async (req, res) => {
    console.log("postProducts BODY");
    console.log(req.body);
    try {
        await productsDB.postProduct(req.body);
        res.status(200).send({ msg: "Product created!" });
    }
    catch(err) {
        console.log(`Error in postProducts: ${err}`);
        throw(err);
    }
};

const putProducts = async (req, res) => {
    console.log("putProducotososos");
    console.log(req.body);
    console.log(req.params);
    const toEdit = {
        body: req.body,
        id: req.params.id
    }
    await productsDB.editProduct(toEdit)
        .then((id) => res.status(200).send({ msg: `Producto con id: ${id}, editado OK!`}))
        .catch((err) => res.status(500).send({ msg: `Error editando: ${err}`}));
};

const deleteProducts = async (req, res) => {
    console.log('dleltedleleteleldlelet');
    console.log(req.params.id);
    await productsDB.deleteProduct(req.params.id)
        .then((id) => res.status(200).send({ msg: `Producto con id: ${id} borrado.`}))
        .catch((err) => res.status(500).send(`Error: ${err}`));
//    res.send({ msg: "delete"});
};

const productControllers = {
    getProducts,
    getProductById,
    postProducts,
    putProducts,
    deleteProducts
};

module.exports = productControllers;