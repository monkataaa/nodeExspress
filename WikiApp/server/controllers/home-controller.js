const User = require('mongoose').model('User')
const Article = require('mongoose').model('Article')
const Edit = require('mongoose').model('Edit')





module.exports = {
  index: (req, res) => {

  Article.find()
    .populate({
      path : "editList"
    })
    .then((articleSFromDB) => {
      let allLastContents = []
      let mainArticleLink = articleSFromDB[0]._id

      
      for (const list of articleSFromDB[0].editList) {
        allLastContents.push(list.content)
      }

      allLastContents.reduce((a,b)=> a+b)
      let allTogether = ''
      allLastContents = allLastContents.forEach((e,i) => allTogether += e)
      allTogether = allTogether.split(' ')
      allLastContents = ''
      for (let i = 0; i < allTogether.length; i++) {
        if (i <= 50) {
          allLastContents += " " + allTogether[i]
        } else {
          allLastContents += "..."
          break
        }
      }
         
      let recentTriArticles = []
      for (let i = 0; i < articleSFromDB.length; i++) {
        recentTriArticles.push(articleSFromDB[i])
        if (i == 2) {
          break
        }        
      }
      res.render('home/index', {allLastContents, mainArticleLink, recentTriArticles})
    })



    
  },
  about: (req, res) => {
    res.render('home/about')
  },
  

}
