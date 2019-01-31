const Menu = require('../Menu/lib')

module.exports = function (app) {
    // POST /menus
    app.post('/menus', Menu.addMenu)

    //GET /menus
    app.get('/menus', Menu.getMenus)

    // GET /menus/id
    app.get('/menus/:id', Menu.getOneMenu)

    // PATCH /menus/id
    app.patch('/menus/:id', Menu.editMenu)

    // DELETE /menus/id
    app.delete('/menus/:id', Menu.deleteMenu)
}