const express = require('express');
const router = express.Router();
const { WEB, API_URL } = process.env;

router.get('/', function(req, res, next) {
  // res.render('home', { title: 'Express' });
  res.render('index', { WEB, API_URL });
});

router.get('/blog', (req, res, next) => {
  res.render('blog', { WEB, API_URL });
});

router.get('/draw', (req, res, next) => {
  res.render('draw', { WEB, API_URL });
});

router.get('/login', (req, res, next) => {
  res.render('login', { WEB, API_URL });
});

module.exports = router;
