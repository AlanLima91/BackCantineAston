const _= require('lodash');
const { ObjectID } = require('mongodb');
const { Order } = require('../../models/Order');

// CREATE
function addOrder(req, res) {
    console.log('req.body',req.body);
    
    var order = new Order({
        menu: req.body.menu,
        user: req.body.user,
        date: req.body.date,
        price: req.body.price,
    });

    

    order.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

// READ
function getOrders(req, res) {
    Order.find().then(orders => {
        res.send({orders})
    }).catch(err => {
        res.status(400).send(err)
    }) 
}

function getOneOrder(req, res) {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Menu.findById(id).then(menu => {
        if (!menu) {
            return res.status(404).send()
        }
        res.status(200).send({menu})
    })
    .catch( err => {
        res.status(400).send(err)
    })
}

// UPDATE
function editMenu(req, res) {  
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'entree', 'plat', 'dessert', 'day', 'price'])

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Menu.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then(menu => {
            if(!menu) {
                return res.status(404).send()
            }
            res.status(200).send({menu});
        }).catch(err => res.status(400).send())
}

// DELETE
function deleteMenu(req, res) {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Menu.findByIdAndDelete(id).then(menu => {
        //findByIdAndDelete renvoie l'objet supprimé
        if(!menu) {
            return res.status(404).send();
        }
        res.status(200).send({menu});
    }).catch( err => {
        res.status(400).send()
    })
    
}


exports.addMenu = addMenu;
exports.getMenus = getMenus;
exports.getOneMenu = getOneMenu;
exports.editMenu = editMenu;
exports.deleteMenu = deleteMenu;