const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    menuKeys: {
        type: [String],
        required: true
    },
    userKey: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
    },
});

module.exports = { Order }