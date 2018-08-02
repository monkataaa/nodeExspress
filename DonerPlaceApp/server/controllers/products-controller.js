const Product = require('mongoose').model('Product')
const fs = require('fs')
const path = require('path')

module.exports = {
    addGet : (req, res) => {
        let errorMsg = req.query.errorMsg
        res.render('product/create', errorMsg)
        return
    },
    addPost : (req, res) => {
        let allowedToppings =  ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce','extra sauce']
        let inputtedToppings = req.body.toppings.split(/,|\s/).filter(a => a != '')
       for (let input of inputtedToppings) {
           if (!allowedToppings.includes(input)) {
               let errorMsg = `${input} is not allowed topping`
               req.body.errorMsg = errorMsg
               res.render('product/create', req.body)
               return
           }
       }
       
       let imageToUpload = '\\' + req.file.path     
    
       Product.create({
        category: req.body.category,
        image: imageToUpload,
        size: req.body.size,
        toppings: inputtedToppings
       }).then(() => {
           res.redirect('/?successMsg=' + encodeURIComponent('New doner type was created successfully!'))
           
           return
       }).catch((err) => {
        let data = req.body
        data.errorMsg = err
        res.render('product/create', data)
        return
       })
        
    },
   
}