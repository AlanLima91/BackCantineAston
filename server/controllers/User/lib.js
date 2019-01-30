const Users         = require('../../models/user');
const { ObjectID }  = require('mongodb');

function addUsers(req, res)
{
    var user = new Users({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
    });

    user.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

function getUsers(req, res)
{
    Users.find().then(users => {
        res.status(200).send({users});
      }).catch(err => {
        res.status(400).send(err);
      })
}

function getUser(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    Todo.findById(id).then(todo => {
      if (!todo)
        return res.status(404).send();
      res.status(200).send({todo});
    }).catch(err => {
      res.status(400).send(err);
    })
}

function deleteUsers(req, res)
{

}

function patchUsers(req, res)
{
    
}

exports.addUsers    = addUsers;
exports.getUsers    = getUsers;
exports.getUser     = getuser;
exports.deleteUsers = deleteUsers;
exports.patchUsers  = patchUsers;