var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('home', { title: 'Express' });
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/blog', (req, res, next) => {
  res.render('blog-details');
});

module.exports = router;
