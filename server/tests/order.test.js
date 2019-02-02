const expect = require('expect'); // == mocha
// const expect = require('chai').expect; // == mocha
const request = require('supertest') // Comme ST sert à tester des requêtes
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Order} = require('./../models/Order');
const {users} = require('./user.test');
const {menus} = require('./menu.test');

const orders = [
    { 
        _id: new ObjectID(),
        menuKeys: [menus[0]._id, menus[1]._id],
        userKey: users[0]._id,
        date: new Date(),
        price: 7
    },
    { 
        _id: new ObjectID(),
        menuKeys: [menus[0]._id],
        userKey: users[1]._id,
        date: new Date(),
        price: 7
    }
];

beforeEach((done) => {
    Order.deleteMany({}).then(() => {
      return Order.insertMany(orders); 
    }).then(() => done())
})

describe('----------------------------------------ORDER----------------------------------------', () => {
    
    describe('POST /orders', () => {
    
        it('doit créer une nouvelle commande', (done) => {
            var menu1 = new ObjectID()
            var menu2 = new ObjectID()
            var order =
                {
                    menuKeys: [menu1, menu2],
                    userKey: users[0]._id,
                    date: new Date(),
                    price: 7
                }
            var i = 0
            request(app)
                .post('/orders')
                .send(order)
                .expect(200)
                .expect(res => {
                    res.body.menuKeys.forEach(key => {
                        expect(key).toBe(order.menuKeys[i].toHexString());
                        i++
                    });
                    expect(res.body.userKey).toBe(order.userKey.toHexString());
                    expect(new Date(res.body.date)).toEqual(order.date);
                    expect(res.body.price).toBe(order.price);
                })
                .end(done);
            
        })
        it('ne doit pas créer une commande avec un body non valide', (done) => {
            var order =
            {
                menuKeys: [new ObjectID(), new ObjectID()],
                userKey: [new ObjectID()],
                price: 7
            }
    
            request(app)
                .post('/orders')
                .send(order)
                .expect(400)
                .end(done);
        })
    
    })
    
    describe('GET /orders', () => {
        it('doit recevoir tous les orders', (done) => {
            request(app)
                .get('/orders')
                .expect(200)
                .expect(res => {
                    expect(res.body.orders.length).toBe(2);
                })
                .end(done);
        })
    })
    
    describe('GET /orders/id', () => {
        it('doit retourner un order', (done) => {
            var i = 0
            request(app)
                .get(`/orders/${orders[0]._id}`)
                .expect(200)
                .expect(res => {
                    res.body.order.menuKeys.forEach(key => {
                        expect(key).toBe(orders[0].menuKeys[i].toHexString());
                        i++
                    });
                    expect(res.body.order.userKey).toBe(orders[0].userKey.toHexString());
                    expect(new Date(res.body.order.date)).toEqual(orders[0].date);
                    expect(res.body.order.price).toBe(orders[0].price);
                })
                .end(done)
        })
    
        it('doit retourner 404 si l\'order n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .get(`/orders/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 404 si l\'order n\'est pas conforme', (done) => {
            request(app)
                .get(`/orders/123`)
                .expect(400)
                .end(done);
        })
    })
    
    describe( 'PATCH /orders/id', () => {
        it('doit mettre à jour l\'order', (done) => {
            var id  = orders[0]._id.toHexString();
            var order =
                {
                    date: new Date()
                }
    
            request(app)
                .patch(`/orders/${id}`)
                .send(order)
                .expect(200)
                .expect(res => {
                    expect(new Date(res.body.order.date)).toEqual(order.date);
                })
                .end(done)
        })
    
    
        it('doit ajouter une menu', (done) => {
                var id  = orders[1]._id.toHexString();
                var push = orders[1].menuKeys
                push.push(menus[1]._id)
                var order =
                {
                    menuKeys: push
                }
                request(app)
                    .patch(`/orders/${id}`)
                    .send(order)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.order.menuKeys[1]).toBe(order.menuKeys[1].toHexString());
                    })
                    .end(done)
        })
    
        it('doit retourner 404 si l\'order n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .patch(`/orders/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 400 si l\'order n\'est pas conforme', (done) => {
            request(app)
                .patch(`/orders/123`)
                .expect(400)
                .end(done);
        })
    })
    describe('DELETE /orders/id', () => {
        it('doit supprimer un order', (done) => {
            var id = orders[1]._id.toHexString();
            request(app)
                .delete(`/orders/${id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.order._id).toBe(id)
                })
                .end((err, res) => {
                    if(err) {
                        return done(err)
                    }
                    Order.findById(id).then(order => {
                        expect(order).toBeFalsy();
                        done();
                    }).catch(err => done())
                })
        })
    
        it('doit retourner 404 si le user n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .delete(`/users/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 404 si le todo n\'est pas conforme', (done) => {
            request(app)
                .delete(`/users/123`)
                .expect(404)
                .end(done);
        })
    
    })
})