var express = require('express');
const articles = require('../models/articles');
var router = express.Router();
let Article = require('../models/articles');
let Comment = require('../models/comments');

router.get('/', (req, res, next) => {
  var userId = req.session.userId;
    Article.find({}, (err, articles) => {
        if(err) return next(err);
        res.render('articles', {articles, userId: userId});
    })
});

router.get("/new", (req, res,) => {
    res.render("addArticle");
});

router.post("/", (req, res, next) => {
    Article.create(req.body, (err, createdArticle) => {
      if(err) return next(err);
      res.redirect('/articles');
    });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Article.findById(id).populate('comments').exec((err, article) => {
      if(err) return next(err);
      res.render('articleDetails', {article})
    })
});


router.post("/:id", (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
        if(err) return next(err);
        res.redirect('/articleDetails/' + id);
    })
});

router.get("/:id/delete", (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id, (err, article) => {
        if(err) return next(err);
        Comment.deleteMany({articleId: article.id}, (err, info) => {
          if(err) return next(err);
          res.redirect("/articles");
        })
    })
})
  
router.get("/:id/likes", (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, article) => {
      if(err) return next(err);
      res.redirect("/articles")
    })
})
  
router.get("/:id/dislikes", (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, article) => {
      if(err) return next(err);
      res.redirect("/articles")
    })
})

router.post("/:id/comments", (req, res, next) => {
    let id = req.params.id;
    req.body.articleId = id;
    Comment.create(req.body, (err, comment) => {
      if(err) return next(err);
      Article.findByIdAndUpdate(id, {$push: {comments: comment._id}}, (err, updatedArticle) => {
        if(err) return next(err);
        res.redirect("/articles/" + id)
      })
    })
})  
module.exports = router;