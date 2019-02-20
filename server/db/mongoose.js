const mongoose = require('mongoose');

const password = encodeURIComponent('aston2018')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cantine:'+password+'@ns218.evxonline.net:27017/CantineApp?authSource=admin');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {mongoose};