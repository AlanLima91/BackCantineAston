const mongoose = require('mongoose');

var Menu = mongoose.model('Menu', {
    name: {
        type: String,
        required: true,
        minLength: 1,
    } ,
    entree: {
        type: String,
        required: true,
        minLength: 1,
    } ,
    plat: {
        type: String,
        required: true,
        minLength: 1,
    } ,
    dessert: {
        type: String,
        required: true,
        minLength: 1,
    } ,
    day: {
        type: String,
        required: true,
        minLength: 1,
    } ,
    price: {
        type: Number,
        required: true,
        minLength: 1,
    } 
});

module.exports = { Menu }