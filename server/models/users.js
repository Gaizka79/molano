const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    direction: {
        type: String
    },
    telephone: {
        type: String,
        trim: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Users", userSchema);