const Users = require('../User/lib')

module.exports = function (app) {
    // POST /users
    app.post('/users', Users.addUsers)

    // GET /users
    app.get('/users', Users.getUsers)

    // GET /users/id
    app.get('users/:id', Users.getUser)

    // DELETE /users/id
    app.delete('users/:id', Users.deleteUsers)

    // PATCH /users/id
    app.patch('users/:id', Users.patchUsers)
}