var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/register', (req, res, next) => {
  var error = req.flash('error')[0];
  res.render('register', {error});
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) {
      if(err.code === 11000) {
        req.flash('error', "This email is already in use");
        return res.redirect('/users/register');
      }
      if(err.name === 'ValidationError') {
        req.flash('error', "Password is less than 5 characters");
          return res.redirect('/users/register');
      }
      return next(err);
    } 
    res.redirect('/users/login');
  })
});

router.get('/login', (req, res, next) => {
  var error = req.flash('error')[0];
  res.render('login', {error});
});

router.get('/success', (req, res, nect) => {
  res.render('success');
})

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if(!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if(err) return next(err);
    //no user
    if(!user) {
      req.flash('error', 'Invalid Email');
      return res.redirect('/users/login');
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      if(err) return next(err);
      if(!result) {
        req.flash('error', 'Invalid Password');
        return res.redirect('/users/login');
      }
      //persist logged in user information
      req.session.userId = user.id;
      res.redirect("/users/success")
    })
  })
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect('/users/login');
})

module.exports = router;
