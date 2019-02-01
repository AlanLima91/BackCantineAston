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
        minLength: 1,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    orderKeys: {
        type: [String],
        default: [],
    },
    solde: {
        type: Number,
        default: 0,
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }],
});

module.exports = { User }