const { Menu } = require('./models/menu');

// POST /menus
app.post('/menus', (req, res) => {
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
})