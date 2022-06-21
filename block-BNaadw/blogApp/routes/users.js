var express = require('express');
var router = express.Router();
var User = require('../models/users');

router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.render('login');
  })
})

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if(!email || !password) {
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if(err) return next(err);
    if(!user) {
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if(!result) {
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/articles');
    })
  })
})

module.exports = router;
