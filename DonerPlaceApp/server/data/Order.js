const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    orderDate : {type: Date, default : Date.now},
    toppings : [{type : String, enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce','extra sauce'], required : true}],
    status : {type : String, enum: ['Pending', 'In Progress', 'In transit', 'Delivered'], default: 'Pending'}
})

let Order = mongoose.model('Order', orderSchema)
module.exports = Order