let express = require('express');
let router = express.Router();
let Product = require('../models/products');

router.get('/', (req, res, next) => {
    var userId = req.session.userId;
    Product.find({}, (err, products) => {
        if(err) return next(err);
        res.render('product', {userId, products});
    });
});

router.get('/new', (req, res, next) => {
    res.render('addProduct');
})

router.post('/new', (req, res, next) => {
    Product.create(req.body, (err, product) => {
        if(err) return next(err);
        res.redirect('/products');
    })
});

router.get("/:id/likes", (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, product) => {
      if(err) return next(err);
      res.redirect("/products")
    })
});
  
router.get("/:id/dislikes", (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, product) => {
      if(err) return next(err);
      res.redirect("/products")
    })
});

router.get("/:id/edit", (req, res, next) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
      if(err) return next(err);
      res.render('editProduct', {product});
    })
});

router.post("/:id", (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, (err, updatedProduct) => {
        if(err) return next(err);
        res.redirect('/products');
    })
});

router.get("/:id/delete", (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndDelete(id, (err, product) => {
        if(err) return next(err);
        res.render("/products");
    })
});


module.exports = router;