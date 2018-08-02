const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let articleSchema = new mongoose.Schema({
    title : { type: String, required: REQUIRED_VALIDATION_MESSAGE},
    lockedStatus : {type: Boolean, default: false,  required: REQUIRED_VALIDATION_MESSAGE},
    editList : [{type: mongoose.Schema.Types.ObjectId, ref: 'Edit'}],
})


let Article = mongoose.model('Article', articleSchema)

module.exports = Article


// module.exports.seedArticle = () => {
//     Article.find({}).then(articles => {
//       if (articles.length > 0) return
  
//       let salt = encryption.generateSalt()
//       let hashedPass = encryption.generateHashedPassword(salt, '123456')
  
//       Article.create({title: 'some default title' }).then((newArticle) => {
        
//         let editInput = {
//           author: 'me',
//           content : 'some defoult text',
//           articleId : newArticle._id
//         }
    
//         Edit.create(editInput).then((newEdit) => {
//           newArticle.editList.push(newEdit._id)
//           newArticle.save()

//         //   req.user.editedArticles.push(newArticle._id)
//         //   req.user.save()
//         //   res.redirect('/?successMsg=' + encodeURIComponent('New Article was created'))
//         })
      
//       })
//     })
//   }
  