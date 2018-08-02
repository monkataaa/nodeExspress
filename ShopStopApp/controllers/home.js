const url = require('url')
const fs = require('fs')
const path = require('path')
const Product = require('../models/Product')
const qs = require('querystring')


    module.exports.index = (req, res) => {
              let quaryData = req.query
              Product.find({buyer:null}).populate('category').then((products) => {
                  if (quaryData.query) {
                      products = products.filter(p => p.description.includes(quaryData.query) || p.name.includes(quaryData.query))
                  }
                  let data = {products : products}
                  if (req.query.error) {
                      data.error = req.query.error
                  } else if (req.query.success) {
                      data.success = req.query.success
                  }
                  res.render('home/index.pug', data)
              })
   } 
