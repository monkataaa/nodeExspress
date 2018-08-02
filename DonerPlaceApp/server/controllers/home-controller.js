const Product = require('mongoose').model('Product')
const auth = require('../config/auth')

module.exports = {
  index: (req, res) => {
    let successMsg = req.query.successMsg
    Product.find().then((products) => {
      let chicken = products.filter(p => p.category === 'chicken')
      let beef = products.filter(p => p.category === 'beef')
      let lamb = products.filter(p => p.category === 'lamb')
      let isAdmin = (req.user && req.user.roles[0] === "Admin")
      res.render('home/index', {chicken, beef, lamb, successMsg, isAdmin})
    })
  
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
