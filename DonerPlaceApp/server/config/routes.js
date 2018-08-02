const controllers = require('../controllers')
const auth = require('./auth')
const multer = require('multer')
let upload = multer({dest: './public/img'})

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.get('/users/logout', auth.isAuthenticated, controllers.users.logout)
  app.get('/products/create',auth.isInRole('Admin'), controllers.products.addGet)
  app.post('/products/create', auth.isInRole('Admin'), upload.single('image'), controllers.products.addPost)
  app.get('/orders/:id', auth.isAuthenticated,  controllers.orders.addOrderGet)
  app.post('/orders/:id', auth.isAuthenticated,  controllers.orders.addOrderPost)
  app.get('/orders/details/:id',   controllers.orders.detailsOrderGet)
  app.get('/orders/user/status/:id',   controllers.orders.orderStatusUserGet)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
