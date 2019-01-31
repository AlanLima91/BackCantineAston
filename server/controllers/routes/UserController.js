const User = require('../User/lib')

module.exports = function (app) {
    // POST /users
    app.post('/users', User.addUsers)

    // GET /users
    app.get('/users', User.getUsers)

    // GET /users/id
    app.get('/users/:id', User.getUser)

    // DELETE /users/id
    app.delete('/users/:id', User.deleteUsers)

    // PATCH /users/id
    app.patch('/users/:id', User.patchUsers)
}