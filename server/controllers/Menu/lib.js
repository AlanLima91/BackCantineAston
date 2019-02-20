const _= require('lodash');
const { ObjectID } = require('mongodb');
const { Menu } = require('../../models/Menu');


const days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi'
]

// CREATE
function addMenu(req, res) {
    // console.log('req.body',req.body);
    
    var menu = new Menu({
        name: req.body.name,
        entree: req.body.entree,
        plat: req.body.plat,
        dessert: req.body.dessert,
        day: req.body.day,
        price: req.body.price,
    });

    menu.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

// READ
function getMenus(req, res) {
    Menu.find().then(menus => {
        res.send({menus})
    }).catch(err => {
        res.status(400).send(err)
    }) 
}

function getOneMenu(req, res) {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send()
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
function getMenusByProps(req, res) {
    var prop = req.params.prop
    var value = req.params.value;
    var QueryParam = {}
    QueryParam[prop] = value
    // if(_.indexOf(days, day) < 0) {
    //     return res.status(400).send()
    // }
    // console.log(prop)
    Menu.find(QueryParam).then(menus => {
        if (menus.length === 0) {
            return res.status(404).send()
        }
        
        res.status(200).send({menus})
    })
    .catch( err => {
        res.status(400).send('test')
    })
}

// UPDATE
function editMenu(req, res) {  
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'entree', 'plat', 'dessert', 'day', 'price'])

    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
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
        return res.status(400).send()
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
exports.getMenusByProps = getMenusByProps;
exports.editMenu = editMenu;
exports.deleteMenu = deleteMenu;
