const { User }     = require('../../models/User');
const _            = require('lodash');
const { mongoose } = require('./../../db/mongoose');
const { ObjectID } = require('mongodb');

function addUsers(req, res)
{
    var user = new User({
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
    User.find().then(users => {
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
    User.findById(id).then(user => {
      if (!user)
        return res.status(404).send();
      res.status(200).send({user});
    }).catch(err => {
      res.status(400).send(err);
    })
}

function deleteUsers(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    User.findByIdAndDelete(id).then(user => {
      if (!user)
        return res.status(404).send();
      res.status(200).send({user});
    }).catch(err => res.status(400).send());
}

function patchUsers(req, res)
{
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'firstname', 'email', 'password', 'admin', 'orderKeys', 'solde']);
  
    if (!ObjectID.isValid(id))
      return res.status(400).send();
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then(user => {
      if (!user)
        return res.status(404).send();
      res.status(200).send({user});
    }).catch(err => res.status(400).send());
}

exports.addUsers    = addUsers;
exports.getUsers    = getUsers;
exports.getUser     = getUser;
exports.deleteUsers = deleteUsers;
exports.patchUsers  = patchUsers;