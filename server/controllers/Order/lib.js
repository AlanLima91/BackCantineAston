const _= require('lodash');
const { ObjectID } = require('mongodb');
const { Order } = require('../../models/Order');
const { User } = require('../../models/User');
const { Menu } = require('../../models/Menu');

// CREATE
function addOrder(req, res) {
    // console.log('req.body',req.body);

    var userId = req.body.userKey;
    var menusId = req.body.menuKeys
    // var menusId = req.body.menuKeys;

    // console.log(menusId);
    
    if ( !ObjectID.isValid(userId))
        res.status(400).send({text: 'userId is not valid'})
    else
    {
        User.findById(userId).then(user => {
            if(!user)
                res.status(404).send();
            else {
                var order = new Order({
                    menuKeys: menusId,
                    userKey: userId,
                    date: req.body.date,
                    price: req.body.price,
                });
            
                order.save().then(doc => {
                    res.status(200).send(doc);
                }).catch(err => {
                    res.status(400).send({
                        error: err,
                        text: 'error at saving order'
                    });
                })
            }
        }).catch(err => { res.status(400).send({
            error: err,
            text: 'error at user findById'
        }) }) // !# User.findById()
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
        return res.status(400).send()
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
    var userId = req.body.userKey;
    var menusId = req.body.menuKeys;
    var body = _.pick(req.body, ['menuKeys', 'userKey', 'date', 'price'])

    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    } else {
        if(req.body.userKey) {
            User.findById(userId).then(user => {
                if(!user) {
                    res.status(404).send('utilisateur non trouvé')
                }
            }).catch(err => { res.status(400).send(err) }) // !# User.findById()
        } else if (menusId){
            menusId.forEach(singleMenu => {
                if( !ObjectID.isValid(singleMenu)) {
                    res.status(400).send('menu invalide');
                } else {
                    Menu.findById(singleMenu).then(menu => {
                        if(!menu) {
                            res.status(404).send('menu non trouvé');
                        } 
                    }).catch(err => { res.status(400).send(err) }) // !# Menu.findById() 
                }
            }); // !# menusId.forEach()
        }
        Order.findByIdAndUpdate(id, {$set: body}, {new: true})
            .then(order => {
                if(!order) {
                    return res.status(404).send('commande non trouvé')
                }
                res.status(200).send({order});
            }).catch(err => res.status(400).send())
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