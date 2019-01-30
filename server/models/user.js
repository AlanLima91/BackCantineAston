const mongoose = require('mongoose');
const {Order} = require('./order');

var User = mongoose.model('Todo', {
    name: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    admin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: [Order],
        default: []
    }
});

module.exports = { User }