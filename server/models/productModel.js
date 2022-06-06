require('mongoose');
const products = require('./products');

const getAllProducts = async () => {
    try{
        const allProducts = await products.find({});
        return allProducts;
    }
    catch(err){
        console.log(`Error en getAllProducts: ${err}`);
        throw (err);
    }
}

const getById = async (product) => {
    console.log("byidididididi");
    console.log(product);
    try {
        const oneProduct = await products.findOne({ _id: product})
        return oneProduct;
    }
    catch(err) {
        console.log(`Error en getById: ${err}`);
        throw (err);
    }
}

const postProduct = async (product) => {
    console.log("modelssssss");
    console.log(product);
    try {
        const newProduct = new products(product);
        await products.create(newProduct);
        console.log(newProduct);
    }
    catch(err) {
        console.log(`Error en postProduct: ${err}`);
        throw (err);
    }
}

const editProduct = async (product)=>{
    console.log(product);
    try {
        const newProduct = product.body
        await products.findOneAndUpdate({ _id: product.id }, newProduct, { new: true });
    } catch (error) {
        console.log(`Error en editProduct: ${err}`);
        throw (err);
    }
}

const deleteProduct = async (id) => {
    console.log("id a borrar");
    console.log(id);
    try {
        await products.deleteOne({ _id: id })
    }
     catch (err) {
        console.log(`Error delete: ${err}`);
        throw (err);
    }
} 

const productsDB = {
    getAllProducts,
    getById,
    postProduct,
    editProduct,
    deleteProduct
};

module.exports = productsDB;