var express = require('express');
const articles = require('../models/articles');
var router = express.Router();
let Article = require('../models/articles');

router.get('/', (req, res, next) => {
    console.log(req.session);
    Article.find({}, (err, articles) => {
        if(err) return next(err);
        res.render('articles', {articles});
    })
})

module.exports = router;