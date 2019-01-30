const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    menu: {
        menu
    } ,
    user: {
        user
    } ,
    date: {
        // à définir
    } ,
});

module.exports = { Todo }