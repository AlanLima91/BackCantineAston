const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    menus: {
        type: [String]
    },
    userKey: {
        type: String,
    },
    date: {
        type: Date,
    },
    price: {
        type: Number,
    },
});

module.exports = { Order }