var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.render('register');
  })
});


module.exports = router;
