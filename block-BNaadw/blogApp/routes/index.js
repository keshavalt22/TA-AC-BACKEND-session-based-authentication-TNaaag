var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId = req.session.userId;
  console.log(userId);
  res.render('index', { title: 'Express', userId: userId });
});

module.exports = router;
