const User = require('mongoose').model('User')
const Article = require('mongoose').model('Article')
const Edit = require('mongoose').model('Edit')


module.exports = {
    createGet: (req, res) => {
      let successMsg = req.query.successMsg
      console.log(successMsg);
      res.render('articles/create', {successMsg})
    },

    createPost: (req,res) => {
      let titleInput = req.body.title
      let contentInput = req.body.content

      Article.create({title: titleInput }).then((newArticle) => {
        // console.log(req.user.id);
        // console.log(req.user._id);
        let editInput = {
          author: req.user._id,
          content : contentInput,
          articleId : newArticle._id
        }
        // console.log(editInput);
        Edit.create(editInput).then((newEdit) => {
          newArticle.editList.push(newEdit._id)
          newArticle.save()

          req.user.editedArticles.push(newArticle._id)
          req.user.save()
          res.redirect('/?successMsg=' + encodeURIComponent('New Article was created'))
        })
      
      })

      
    },
    allGet: (req, res) => {
      Article.find().then((allArticles) => {
        res.render('articles/all', {allArticles})
      })
    },
    detailedGet: (req,res) => {
      Article.findById(req.params.id)
      .populate({
        path : "editList"
      })
      .then((articleFromDB) => {
        let allContents = []

        for (const list of articleFromDB.editList) {
          allContents.push(list.content)
        }
        let articleTitle = articleFromDB.title
        let articleId = articleFromDB._id
        res.render('articles/detailed', {allContents, articleTitle, articleId})
      })
     
    },
    editGet : (req, res) => {
      Article.findById(req.params.id)
      .populate({
        path : "editList"
      })
      .then((articleFromDB) => {
        let allContents = []

        for (const list of articleFromDB.editList) {
          allContents.push(list.content)
        }
        let articleTitle = articleFromDB.title
        let articleId = articleFromDB._id
        res.render('articles/edit', {allContents, articleTitle, articleId})
      })

    },
    editPost : (req, res) => {
     
      res.json(req.body)

    }
  
}

  