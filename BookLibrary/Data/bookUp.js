const mongoose = require('mongoose')

const bookUpSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type : String },
    releaseYear: {type: Date, required: true},
    imageUrl : {type: String, required: true}
})

mongoose.model('bookUp', bookUpSchema)
module.exports = mongoose.model('bookUp')