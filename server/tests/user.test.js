const expect = require('expect'); // == mocha
// const expect = require('chai').expect; // == mocha
const request = require('supertest') // Comme ST sert à tester des requêtes
const {ObjectID} = require('mongodb')

const {app} = require('../server');
const {User} = require('./../models/User');

const users = [
    { 
        _id: new ObjectID(),
        name: 'LINSKI',
        firstname: 'Gwenn',
        email: 'gwenn.linski@gmail.com',
        password: '12345678',
        admin: false,
        orderKeys: [],
        solde: 0
    },
    { 
        _id: new ObjectID(),
        name: 'LIMA',
        firstname: 'Alan',
        email: 'alan.lima@email.com',
        password: '23456789',
        orderKeys: [new ObjectID(), new ObjectID()]
    },
    { 
        _id: new ObjectID(),
        name: 'CANTINIER',
        firstname: 'Jean-Michel',
        email: 'jm.cantinier@gmail.com',
        password: '87654321',
        admin: true,
        orderKeys: [],
        solde: 0
    }
];

beforeEach((done) => {
    User.deleteMany({}).then(() => {
      return User.insertMany(users); 
    }).then(() => done())
})
describe('----------------------------------------USER----------------------------------------', () => {
    
    describe('POST /users', () => {
    
        it('doit créer un nouveau user', (done) => {
            var user =
                {
                    name: "AFFAME",
                    firstname: "Jean-Michel",
                    email: "jm.affame@email.com",
                    password: "chihuahua",
                    admin: false
                }
    
            request(app)
                .post('/users')
                .send(user)
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toBe(user.name);
                    expect(res.body.firstname).toBe(user.firstname);
                    expect(res.body.email).toBe(user.email);
                    if (user.admin) {
                        expect(res.body.admin).equal(user.admin);
                    }
                })
                .end(done);
            
        })
        it('doit créer un nouveau user si pas de données facultative fournies', (done) => {
            var user =
                {
                    name: "AFFAME",
                    firstname: "Jean-Michel",
                    email: "jm.affame@email.com",
                    password: "chihuahua",
                }
    
            request(app)
                .post('/users')
                .send(user)
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toBe(user.name);
                    expect(res.body.firstname).toBe(user.firstname);
                    expect(res.body.email).toBe(user.email);
                    if (user.admin) {
                        expect(res.body.admin).equal(user.admin);
                    }
                })
                .end(done);
            
        })
        it('ne doit pas créer un user avec un body non valide', (done) => {
            var user = {
                name: 'AFFAME',
                firstname: 'Jean-Michel',
                email: 'jm.affame@email.com',
            };
            request(app)
                .post('/users')
                .send(user)
                .expect(400)
                .end(done);
        })
    
    })
    
    describe('GET /users', () => {
        it('doit recevoir tous les users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect(res => {
                    expect(res.body.users.length).toBe(3);
                })
                .end(done);
        })
    })
    
    describe('GET /users/id', () => {
        it('doit retourner un user', (done) => {
            request(app)
                .get(`/users/${users[0]._id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.user.name).toBe(users[0].name);
                    expect(res.body.user.firstname).toBe(users[0].firstname);
                    expect(res.body.user.email).toBe(users[0].email);
                })
                .end(done)
        })
    
        it('doit retourner 404 si le user n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .get(`/users/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 404 si le todo n\'est pas conforme', (done) => {
            request(app)
                .get(`/users/123`)
                .expect(404)
                .end(done);
        })
    })
    
    describe( 'PATCH /users/id', () => {
        it('doit mettre à jour le user', (done) => {
            var id  = users[0]._id.toHexString();
            var user =
                {
                    firstname: "Agathe",
                    password: "topsecret",
                }
    
            request(app)
                .patch(`/users/${id}`)
                .send(user)
                .expect(200)
                .expect(res => {
                    expect(res.body.user.firstname).toBe(user.firstname);
                })
                .end(done)
        })
    
    
        it('doit ajouter une commande', (done) => {
                var id  = users[1]._id.toHexString();
                var push = users[1].orderKeys
                push.push(ObjectID())
                var user =
                {
                    orderKeys: push
                }
                request(app)
                    .patch(`/users/${id}`)
                    .send(user)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.user.orderKeys[3]).toBe(user.orderKeys[3]);
                    })
                    .end(done)
        })
        it('doit ajouter au solde', (done) => {
                var id  = users[0]._id.toHexString();
                var newSolde = users[0].solde + 1
                var user =
                {
                    solde: newSolde
                }
                request(app)
                    .patch(`/users/${id}`)
                    .send(user)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.user.solde).toBe(user.solde);
                    })
                    .end(done)
        })
    
        it('doit retourner 404 si le user n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .patch(`/users/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 400 si le todo n\'est pas conforme', (done) => {
            request(app)
                .patch(`/users/123`)
                .expect(400)
                .end(done);
        })
    })
    
    describe('DELETE /users/id', () => {
        it('doit supprimer un user', (done) => {
            var id = users[1]._id.toHexString();
            request(app)
                .delete(`/users/${id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.user._id).toBe(id)
                })
                .end((err, res) => {
                    if(err) {
                        return done(err)
                    }
                    User.findById(id).then(order => {
                        expect(user).toBeFalsy();
                        done();
                    }).catch(err => done())
                })
        })
    
        it('doit retourner 404 si le order n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .delete(`/orders/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 404 si le todo n\'est pas conforme', (done) => {
            request(app)
                .delete(`/orders/123`)
                .expect(404)
                .end(done);
        })
    
    })
})

module.exports = {users}