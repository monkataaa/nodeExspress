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
    res.render('category/add.pug')
}

module.exports.addPost = (req, res) => {    
    let category = req.body
    category.creator = req.user._id
    Category.create(category).then((newCategory) => {
        console.log(newCategory._id);
        console.log(newCategory.id);
        req.user.createdCategories.push(newCategory.id)
        req.user.save()
        res.redirect('/')
    })
}

module.exports.productByCategory = (req, res) => {
    let categoryName = req.params.category

    Category.findOne({name: categoryName})
        .populate('products')
        .then((category) => {
            if (!category) {
                res.sendStatus(404)
                return
            }
            res.render('category/products.pug', {category: category})
        }).catch((err) => {
            res.sendStatus(404)
            return
        })
}
