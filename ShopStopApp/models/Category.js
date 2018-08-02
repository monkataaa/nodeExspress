const mongoose = require("mongoose")

let categorySchema = mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, require:true, unique: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
})

mongoose.model('Category', categorySchema)

module.exports = mongoose.model('Category')