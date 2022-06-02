const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    family: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    foto: {
        type: String
    },
    price: {
        type: Number,
        trim: true
    }
});
module.exports = mongoose.model("Products", productSchema);