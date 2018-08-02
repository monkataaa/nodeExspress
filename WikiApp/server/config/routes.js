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
  app.post('/users/logout', controllers.users.logout)
  app.get('/articles/create', auth.isAuthenticated, controllers.articles.createGet)
  app.post('/articles/create', auth.isAuthenticated,  controllers.articles.createPost)
  app.get('/articles/all', controllers.articles.allGet)
  app.get('/articles/detailed/:id', controllers.articles.detailedGet)
  app.get('/articles/edit/:id',auth.isAuthenticated,  controllers.articles.editGet)
  app.post('/articles/edit/:id',auth.isAuthenticated,  controllers.articles.editPost)


  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
