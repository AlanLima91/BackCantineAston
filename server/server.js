const express       = require('express');
const bodyParser    = require('body-parser');
const _             = require('lodash');
const { ObjectID }  = require('mongodb');
const { mongoose }  = require('./db/mongoose');


var app = express();

// Load and initialize the controllers.
require('./lib/controllersLoader')(app);

// middleware décodant le json inclu dans le body des  requêtes
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Server listening !')
})

// POST /users
app.post('/users', (req, res) => {
    var user = new user({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
    });

    user.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
})

app.listen(8000, () => {
    console.log('Listening on port 8000');
    
})