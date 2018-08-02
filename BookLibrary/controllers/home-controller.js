const Book = require('../Data/bookUp')

module.exports = {
    getIndex: (req, res) => {
        Book
        .count()
        .then(booksCount => {
            res.render('index', {booksCount})
        })
    }
}