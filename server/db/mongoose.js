const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CantineApp', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

module.exports = {mongoose};