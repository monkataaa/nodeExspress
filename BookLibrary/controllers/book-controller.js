const Book = require('../Data/bookUp')

module.exports = {
    getAddBook : (req, res) => {
        res.render('books/add')
    },
    postAddBook : (req, res) => {
        let book = req.body
        book.error = 'Title and Image URL are requered'

        if (!book.title || !book.imageUrl) {
            res.render('books/add', book)
        }

        
        Book.create(book)
            .then(() => {
                res.redirect('/all')
            })
    },
    getAllBooks : (req, res) => {
        Book
            .find()
            .sort('releaseYear')
            .then((books) => {
                res.render('books/all', {books} )
            }
            )
    },
    getDetails : (req, res) => {
        let bookId = req.params.id

        Book
        .findById(bookId)
        .then((book) => {
            let year = book.releaseYear
            year = year.getFullYear()
            book.year = year
            res.render('books/details', book)
        })
    }
}