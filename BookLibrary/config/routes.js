const homeController = require('../controllers/home-controller')
const bookController = require('../controllers/book-controller')

module.exports = (app) => {
    app.get('/', homeController.getIndex ),
    app.get('/addBook', bookController.getAddBook)
    app.post('/addBook', bookController.postAddBook)
    app.get('/all', bookController.getAllBooks)
    app.get('/details/:id', bookController.getDetails)

}