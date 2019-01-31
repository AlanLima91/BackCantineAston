const orders = require('../Order/lib')

module.exports = function (app) {
    // POST /menus
    app.post('/menus', orders.addOrder)

    //GET /menus
    app.get('/menus', orders.getOrders)

    // GET /menus/id
    app.get('/menus/:id', orders.getOneOrder)

    // PATCH /menus/id
    app.patch('/menus/:id', orders.editOrder)

    // DELETE /menus/id
    app.delete('/menus/:id', orders.deleteOrder)
}