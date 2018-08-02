const User = require('../models/User')
const encryption  = require('../utilities/encryption')

module.exports.registerGet = (req, res) => {
    res.render('user/register.pug')
}


module.exports.registerPost = (req, res) => {
    let user = req.body

    if (user.password === '' || user.password !== user.confirmedPassword) {
        user.error  = user.password === '' ? 'Passwords can not be empty':'Passwords do not match'
         return res.render('user/register.pug', user)
    }
    let salt = encryption.generateSalt()
    user.salt = salt
    
    let hashedPassword = encryption.generateHashedPassword(salt, user.password)
    user.password = hashedPassword
    

    User.create(user)
    .then(user => {
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('users/register', { error: 'Authentiocation not working !'})
                return
            }

            res.redirect('/')
        })
    }).catch(error => {
        user.error = error
        res.render('user/register.pug', user)
    })
}

module.exports.loginGet = (req, res) => {
    res.render('user/login.pug')
}

module.exports.loginPost = (req,res) => {
    let userToLogin = req.body

    User.findOne({username: userToLogin.username}).then((user) => {
        if (!user || !user.authenticate(userToLogin.password)) {
            res.render('user/login.pug', {error: 'Invalid credentials!'})
            return
        }
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('user/login.pug', {error: "Authentication not working !"})
                return
            }

            res.redirect('/')
        })
    })
}

module.exports.logoutPost = (req, res) => {
    req.logout()
    
    res.redirect('/')
}