const mongoose = require('mongoose');
const {Order} = require('./Order');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 1,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    orders: {
        type: [String],
        default: [],
    },
    solde: {
        type: Number,
        default: 0,
    }
});

module.exports = { User }