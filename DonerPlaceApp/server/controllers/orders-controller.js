const Product = require('mongoose').model('Product')
const User = require('mongoose').model('User')
const Order = require('mongoose').model('Order')

module.exports = {
    addOrderGet : (req, res) => {
        let productId = req.params.id
        Product.findById(productId).then((product) => {
            product.name = product.category.charAt(0).toUpperCase() + product.category.slice(1)
            res.render('orders/addOrder', product)
        })
        
    },

    addOrderPost : (req, res) => {
        let allowedToppings =  ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce','extra sauce']
        let inputtedToppings = []
        for (let input of Object.keys( req.body)) {
            if (allowedToppings.includes(input)) {
                inputtedToppings.push(input)
            }
        }
        console.log("producta id trqbva da e "+req.params.id);

        let newOrderInput = {
            creator : req.user.id,
            productId : req.params.id,
            toppings : inputtedToppings
        }
        
        Order.create(newOrderInput).then((newOrder) => {
            req.user.orders.push(newOrder.id)
            // console.log("1 ="+newOrder.id);
            // console.log("2 ="+newOrder._id);
            req.user.save()
            res.redirect(`/orders/details/${newOrder.id}?successMsg='` + encodeURIComponent('The order was created successfully!'))
            return
        })
    },

    detailsOrderGet : (req, res) => {
        let orderId = req.params.id
        Order.findById(orderId).populate('productId').then((orderFromDb) => {
            orderFromDb.image = orderFromDb.productId.image
            let successMsg = req.query.successMsg
            let check = {}
         
            check.pending = orderFromDb.status === 'Pending'
            check.inProgress = orderFromDb.status === 'In Progress'
            check.inTransit = orderFromDb.status === 'In transit'
            check.delivered = orderFromDb.status === 'Delivered'
        res.render('orders/detailsOrder', {orderFromDb,check, successMsg})
        })
        
    },

    orderStatusUserGet : (req, res) => {
     let user = req.user

     Order.find({creator : user._id})
        .populate({
            path : "productId",

        }).then((orders) => {

            let allOrders = []
            for (const order of orders) {

                order.time = order.orderDate.toLocaleDateString('bg-BG')
                order.productCategory = order.productId.category
                order.productSize = order.productId.size
                order.status
                allOrders.push(order)
            }
            
            res.render('orders/orderStatusUser', {allOrders})
        })
    
        
    }
}

