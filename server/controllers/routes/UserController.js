const User = require('../User/lib');
const {authenticate} = require('../../middleware/authenticate');

module.exports = function (app) {
    // POST /users
    app.post('/users', User.signUp)

    // POST /users/login
    app.post('/users/login', User.logIn)

    // GET /users
    app.get('/users', User.getUsers)

    // GET /users/me
    app.get('/users/me', authenticate, User.getMe)
    
    // GET /users/id
    app.get('/users/:id', User.getUser)


    // DELETE /users/id
    app.delete('/users/:id', User.deleteUsers)

    // PATCH /users/id
    app.patch('/users/:id', User.patchUsers)
}