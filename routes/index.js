const express = require('express');
const router = express.Router();
const { WEB } = process.env;

router.get('/', function(req, res, next) {
  // res.render('home', { title: 'Express' });
  res.render('index', { WEB });
});

router.get('/blog', (req, res, next) => {
  res.render('blog', { WEB });
});

router.get('/draw', (req, res, next) => {
  res.render('draw', { WEB });
});

router.get('/login', (req, res, next) => {
  res.render('login', { WEB });
});

module.exports = router;
