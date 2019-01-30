const menus = require('../menu/lib')

module.exports = function (app) {
    // POST /menus
    app.post('/menus', menus.addMenu)
}