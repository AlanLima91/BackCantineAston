const orders = require('../Order/lib')

module.exports = function (app) {
    // POST /orders
    app.post('/orders', orders.addOrder)

    //GET /orders
    app.get('/orders', orders.getOrders)

    // GET /orders/id
    app.get('/orders/:id', orders.getOneOrder)

    // PATCH /orders/id
    app.patch('/orders/:id', orders.editOrder)

    // DELETE /orders/id
    app.delete('/orders/:id', orders.deleteOrder)
}