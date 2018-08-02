const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let editSchema = new mongoose.Schema({
   author : {type: String, required: REQUIRED_VALIDATION_MESSAGE},
   creationDate : {type: Date, default : Date.now},
   content : {type: String, required: REQUIRED_VALIDATION_MESSAGE},
   articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'}
})


let Edit = mongoose.model('Edit', editSchema)

module.exports = Edit