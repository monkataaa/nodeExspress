const url = require('url')
// const database = require('../config/database')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const multiparty = require('multiparty')
const shortid = require('shortid')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
           Category.find().then((categories) => {
            res.render('products/add.pug', {categories:categories})
            res.end()
        })
}

module.exports.addPost = (req, res) => {
   
    let productObj = req.body
    productObj.image = '\\' + req.file.path
    console.log(req.file.path);
    productObj.creator = req.user._id
    Product.create(productObj).then((product) => {
        req.user.createdProducts.push(product.id)
        req.user.save()
        let productCategory = product.category
        Category.findById(productCategory).then((category) => {
            category.products.push(product.id)
            category.save()
        })
        res.redirect('/')
    })
}

module.exports.editGet = (req, res) => {
    let id = req.params.id

    Product.findById(id).then((product) => {
        if (!product) {
            return res.sendStatus(404)
        }
        if (product.creator.equals(req.user._id) || 
            req.user.roles.indexOf('Admin') >= 0) {
                Category.find().then((categories) => {
                    res.render('products/edit.pug', {
                        product: product,
                        categories: categories
                    })
                })
        } else{
            res.redirect(
                `/?error=${encodeURIComponent('You are not the owner of this product')}`)
                return
        }
    })
}

module.exports.editPost = (req,res) => {
    let id = req.params.id
    let editedProduct = req.body

    
    Product.findById(id).then((product) => {
        if (!product) {
            res.redirect(
                '/?error=' + encodeURIComponent("Product was not found!")
            )
               return
        }

        if (product.creator.equals(req.user._id) || 
        req.user.roles.indexOf('Admin') >= 0) {
            product.name = editedProduct.name
            product.description = editedProduct.description
            product.price = editedProduct.price
    
            if (req.file) {
                product.image = '\\'+req.file.path
            }
    
            if (product.category.toString() !== editedProduct.category) {
                Category.findById(product.category).then((currentCategory) => {
                    Category.findById(editedProduct.category).then((nextCategory) => {
                        let index = currentCategory.products.indexOf(product._id)
                        if (index >= 0) {
                            currentCategory.products.splice(index, 1)
                        }
                        currentCategory.save()
    
                        nextCategory.products.push(product.id)
                        nextCategory.save()
    
                        product.category = editedProduct.category
    
                        product.save().then(() => {
                            res.redirect(
                                '/?success=' + encodeURIComponent('Product was edited successfully!'))
                        })
                    })
                })
                
            } else{
                product.save().then(() => {
                    res.redirect(
                        
                        '/?success=' + encodeURIComponent("Product was edited successfully"))
                })
            }
          }

 
    })
}

module.exports.deleteGet = (req,res) => {
    let id = req.params.id
 
    Product.findById(id).then((product) => {
        if (!product) {
            return res.sendStatus(404)
        }

        if (product.creator.equals(req.user._id) || 
        req.user.roles.indexOf('Admin') >= 0) {
            res.render('products/delete.pug', {product})
    }  else{
        res.redirect(
            `/?error=${encodeURIComponent('You are not the owner of this product')}`)
            return
    }
       
    })
}

module.exports.deletePost = (req,res) => {
    let id = req.params.id

    Product.findById(id).then(product => {
        if (!product) {
            res.redirect(
                '/?error=' + encodeURIComponent("Product was not found!"))
               return
        }

        if (product.creator.equals(req.user._id) || 
        req.user.roles.indexOf('Admin') >= 0) {
           
            Category.findById(product.category).then((productCategory) => {
                let index = productCategory.products.indexOf(product._id)
                if (index >= 0) {
                    productCategory.products.splice(index, 1)
                }
                productCategory.save()
    
                Product.deleteOne({_id : id}).then((deletedProduct) => {
                    res.redirect(
                        '/?success=' + encodeURIComponent("Product was deleted successfully"))
                })
    
            })

    }  else{
        res.redirect(
            `/?error=${encodeURIComponent('You are not the owner of this product')}`)
            return
    }
     
    })
}

module.exports.buyGet = (req, res) => {
    let id = req.params.id

    Product.findById(id).then(product => {
        if (!product) {
            res.redirect(
                '/?error=' + encodeURIComponent("Product was not found!"))
               return
        }

        res.render('products/buy.pug', {product})
    })
}

module.exports.buyPost = (req, res) => {
    let productId = req.params.id

    Product.findById(productId).then((product) => {
        if (product.buyer) {
            res.redirect('/?error=' + encodeURIComponent("Product was not found!"))
            return
        }
        product.buyer = req.user._id
        product.save().then(() => {
            req.user.boughtProducts.push(productId)
            req.user.save().then(() => {
                res.redirect('/')
            })
        })
    })
}
