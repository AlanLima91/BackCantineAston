const mongoose = require('mongoose');
const { Menu } = require('./menu');
const { User } = require('./user');

var Order = mongoose.model('Order', {
    menu: {
        type: [Menu]
    },
    user: {
        type: User
    },
    date: {
        // à définir
    },
    price: {

    },
});

module.exports = { Order }