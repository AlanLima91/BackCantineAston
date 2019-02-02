const { User }     = require('../../models/User');
const _            = require('lodash');
const { mongoose } = require('./../../db/mongoose');
const { ObjectID } = require('mongodb');

function signUp(req, res)
{
  var body = _.pick(req.body, ['name', 'firstname','email', 'password', 'admin']);
  var user = new User(body);
  
  user.save().then(doc => {
      res.status(200).send(doc);
  }).catch(err => {
      res.status(400).send(err);
  })
}

function logIn(req, res) {
  var body = _.pick(req.body, ['email', 'password']);
  
  User.findByCredentials(body.email, body.password)
    .then(user => {
      //res.status(200).send(user);
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      })
    })
    .catch(err => {
      res.status(400).send();
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

function getMe(req, res) {
  res.send(req.user);
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
      // console.log(user);
      
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send({user});
    }).catch(err => res.status(400).send());
}

exports.signUp      = signUp;
exports.logIn       = logIn;
exports.getUsers    = getUsers;
exports.getUser     = getUser;
exports.getMe     = getMe;
exports.deleteUsers = deleteUsers;
exports.patchUsers  = patchUsers;