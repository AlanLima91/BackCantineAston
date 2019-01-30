const Menu = require('../../models/menu');
const {ObjectID} = require('mongodb');

// CREATE
function addMenu(req, res) {
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
        return res.status(404).send()
    }
    Menu.findById(id).then(menu => {
        if (!menu) {
            return res.status(404).send()
        }
        res.status(200).send({todo})
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