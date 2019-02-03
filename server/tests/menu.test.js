const expect = require('expect'); // == mocha
// const expect = require('chai').expect; // == mocha
const request = require('supertest') // Comme ST sert à tester des requêtes
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Menu} = require('./../models/Menu');
const {users} = require('./user.test');

const menus = [
    { 
        _id: new ObjectID(),
        name: 'menu 1',
        entree: 'salade',
        plat: 'kebab',
        dessert: 'glace',
        day: 'Mardi',
        price: 5
    },
    { 
        _id: new ObjectID(),
        name: 'menu 2',
        entree: 'salade',
        plat: 'gratin',
        dessert: 'yaourt',
        day: 'Mercredi',
        price: 5
    }
];

beforeEach((done) => {
    Menu.deleteMany({}).then(() => {
      return Menu.insertMany(menus); 
    }).then(() => done())
})

describe('----------------------------------------MENU----------------------------------------', () => {
    describe('POST /menus', () => {
    
        it('doit créer un nouveau menu', (done) => {
            var menu =
                {
                    name: 'menu 1',
                    entree: 'salade',
                    plat: 'Pizza',
                    dessert: 'baklawa',
                    day: 'Jeudi',
                    price: 5
                }
    
            request(app)
                .post('/menus')
                .send(menu)
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toBe(menu.name);
                    expect(res.body.entree).toBe(menu.entree);
                    expect(res.body.plat).toBe(menu.plat);
                    expect(res.body.dessert).toBe(menu.dessert);
                    expect(res.body.day).toBe(menu.day);
                    expect(res.body.price).toBe(menu.price);
                })
                .end(done);
            
        })
    
        it('ne doit pas créer un menu avec un body non valide', (done) => {
            var menu = {
                entree: 'salade',
                plat: 'Pizza',
                dessert: 'baklawa',
            };
            request(app)
                .post('/menus')
                .send(menu)
                .expect(400)
                .end(done);
        })
    
    })
    
    describe('GET /menus', () => {
        it('doit recevoir tous les menus', (done) => {
            request(app)
                .get('/menus')
                .expect(200)
                .expect(res => {
                    expect(res.body.menus.length).toBe(2);
                })
                .end(done);
        })
    })
    
    describe('GET /menus/id', () => {
        it('doit retourner un menu', (done) => {
            var i = 0
            request(app)
                .get(`/menus/${menus[0]._id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.menu.name).toBe(menus[0].name);
                    expect(res.body.menu.entree).toBe(menus[0].entree);
                    expect(res.body.menu.plat).toBe(menus[0].plat);
                    expect(res.body.menu.dessert).toBe(menus[0].dessert);
                    expect(res.body.menu.day).toBe(menus[0].day);
                    expect(res.body.menu.price).toBe(menus[0].price);
                })
                .end(done)
        })
    
        it('doit retourner 404 si le menu n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .get(`/menus/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 400 si le menu n\'est pas conforme', (done) => {
            request(app)
                .get(`/menus/123`)
                .expect(400)
                .end(done);
        })
    })

    describe('GET /menus/prop=value', () => {
        it('doit retourner les menu selon les paramètres demandé en URL', (done) => {
            var i = 0
            request(app)
                .get(`/menus/day=Mardi`)
                .expect(200)
                .expect(res => {
                    expect(res.body.menus[0].name).toBe(menus[0].name);
                    expect(res.body.menus[0].entree).toBe(menus[0].entree);
                    expect(res.body.menus[0].plat).toBe(menus[0].plat);
                    expect(res.body.menus[0].dessert).toBe(menus[0].dessert);
                    expect(res.body.menus[0].day).toBe(menus[0].day);
                    expect(res.body.menus[0].price).toBe(menus[0].price);
                })
                .end(done)
        })
    
        it('doit retourner 404 si le menu n\'est pas trouvé', (done) => {
            request(app)
                .get(`/menus/day=Lundi`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 400 si le jour n\'est pas conforme', (done) => {
            request(app)
                .get(`/menus/mercredi`)
                .expect(400)
                .end(done);
        })
    })
    
    describe( 'PATCH /menus/id', () => {
        it('doit mettre à jour le menu', (done) => {
            var id  = menus[0]._id.toHexString();
            var menu =
                {
                    plat: 'cordon bleu'
                }
    
            request(app)
                .patch(`/menus/${id}`)
                .send(menu)
                .expect(200)
                .expect(res => {
                    expect(res.body.menu.plat).toBe(menu.plat);
                })
                .end(done)
        })
    
        it('doit retourner 404 si le menu n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .patch(`/menus/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 400 si le menus n\'est pas conforme', (done) => {
            request(app)
                .patch(`/menus/123`)
                .expect(400)
                .end(done);
        })
    })
    
    describe('DELETE /menus/id', () => {
        it('doit supprimer un menu', (done) => {
            var id = menus[1]._id.toHexString();
            request(app)
                .delete(`/menus/${id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.menu._id).toBe(id)
                })
                .end((err, res) => {
                    if(err) {
                        return done(err)
                    }
                    Menu.findById(id).then(menu => {
                        expect(menu).toBeFalsy();
                        done();
                    }).catch(err => done())
                })
        })
    
        it('doit retourner 404 si le order n\'est pas trouvé', (done) => {
            var id = new ObjectID()
            request(app)
                .delete(`/menus/${id}`)
                .expect(404)
                .end(done);
        })
        it('doit retourner 400 si le todo n\'est pas conforme', (done) => {
            request(app)
                .delete(`/menus/123`)
                .expect(400)
                .end(done);
        })
    
    })

})

module.exports = {menus}