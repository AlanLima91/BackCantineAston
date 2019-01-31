const _= require('lodash');
const { ObjectID } = require('mongodb');
const { Order } = require('../../models/Order');
const { User } = require('../../models/Order');
const { Menu } = require('../../models/Order');

// CREATE
function addOrder(req, res) {
    console.log('req.body',req.body);

    var userId = req.body.user;
    var menusId = req.body.menus;

    if ( !ObjectID.isValid(userId))
        res.status(400).send()
    else
    {
        User.findById(userId).then(user => {
            if(!user)
                res.status(404).send()
            else {
                menusId.forEach(singleMenu => {
                    if( !ObjectID.isValid(singleMenu)) {
                        res.status(400).send();
                    } else {
                        Menu.findById(singleMenu).then(menu => {
                            if(!menu) {
                                res.status(404).send();
                            } 
                        }).catch(err => { res.status(400).send(err) }) // !# Menu.findById() 
                    }
                }); // !# menusId.forEach()
                var order = new Order({
                    menu: menusId,
                    user: userId,
                    date: req.body.date,
                    price: req.body.price,
                });
            
                order.save().then(doc => {
                    res.status(200).send(doc);
                }).catch(err => {
                    res.status(400).send(err);
                })
            }
        }).catch(err => { res.status(400).send(err) }) // !# User.findById()
    }
} // !#addOrder()

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
    Order.findById(id).then( order => {
        if (!order) {
            return res.status(404).send()
        }
        res.status(200).send({order})
    })
    .catch( err => {
        res.status(400).send(err)
    })
}

// UPDATE
function editOrder(req, res) {  
    var id = req.params.id;
    var userId = req.body.user;
    var menusId = req.body.menus;
    var body = _.pick(req.body, ['menus', 'user', 'date', 'price'])

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    } else {
        User.findById(userId).then(user => {
            if(!user) {
                res.status(404).send()
            } else {
                menusId.forEach(singleMenu => {
                    if( !ObjectID.isValid(singleMenu)) {
                        res.status(400).send();
                    } else {
                        Menu.findById(singleMenu).then(menu => {
                            if(!menu) {
                                res.status(404).send();
                            } 
                        }).catch(err => { res.status(400).send(err) }) // !# Menu.findById() 
                    }
                }); // !# menusId.forEach()
            }
            Order.findByIdAndUpdate(id, {$set: body}, {new: true})
                .then(order => {
                    if(!order) {
                        return res.status(404).send()
                    }
                    res.status(200).send({order});
                }).catch(err => res.status(400).send())
        }).catch(err => { res.status(400).send(err) }) // !# User.findById()
    }
}

// DELETE
function deleteOrder(req, res) {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Order.findByIdAndDelete(id).then(order => {
        //findByIdAndDelete renvoie l'objet supprimé
        if(!order) {
            return res.status(404).send();
        }
        res.status(200).send({order});
    }).catch( err => {
        res.status(400).send()
    })
    
}


exports.addOrder = addOrder;
exports.getOrders = getOrders;
exports.getOneOrder = getOneOrder;
exports.editOrder = editOrder;
exports.deleteOrder = deleteOrder;