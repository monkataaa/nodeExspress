const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    category : {type : String, required: [true, '{PATH} must be chosen'], enum: ['chicken', 'lamb', 'beef']},
    size : {type : Number, min: [7, 'size must be min 7'], max: [17, 'size must be max17']},
    image : {type : String, required: [true, 'the image is obligatory']},
    toppings : [{type : String, enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce','extra sauce'], required : true}]
})

let Product = mongoose.model('Product', productSchema)
module.exports = Product