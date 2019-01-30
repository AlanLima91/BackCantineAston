const menus = require('../Menu/lib')

module.exports = function (app) {
    // POST /menus
    app.post('/menus', menus.addMenu)

    //GET /menus
    app.get('/menus', menus.getMenus)

    // GET /menus/id
    app.get('/menus/:id', menus.getOneMenu)

    // PATCH /menus/id
    app.patch('/menus/:id', menus.editMenu)

    // DELETE /menus/id
    app.delete('/menus/:id', menus.deleteMenu)
}