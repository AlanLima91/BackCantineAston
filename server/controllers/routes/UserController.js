const Users = require('../User/lib')

// POST /users
app.post('/users', users.addUsers)

// GET /users
app.get('/users', users.getUsers)

// GET /users/id
app.get('users/:id', users.getUser)

// DELETE /users/id
app.delete('users/:id', users.deleteUsers)

// PATCH /users/id
app.patch('users/:id', users.patchUsers)