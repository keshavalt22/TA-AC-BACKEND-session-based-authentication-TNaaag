var express = require('express');
const user = require('../models/user');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.render('login');
  })
});

router.get('/login', (req, res, next) => {
  res.render('login');
})


router.post('/login', (req, res, next) => {
  var{email, password} = req.body;
  User.findOne({email}, (err, user) => {
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
        req.flash('error', 'Invalid Email');
        return res.redirect('/users/login');
      }
      res.redirect("/users/success")
    })

  })
})


module.exports = router;
