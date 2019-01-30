const mongoose = require('mongoose');
const { Menu } = require('./Menu');
const { User } = require('./User');

var Order = mongoose.model('Order', {
    menu: {
        type: [String]
    },
    user: {
        type: User,
    },
    date: {
        type: Date,
    },
    price: {
        type: Number,
    },
});

module.exports = { Order }