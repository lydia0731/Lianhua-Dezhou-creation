var express = require('express');
var router = express.Router();
var db = require('../service/firebase');

const { WEB } = process.env;

/* GET home page. */
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

router.post('/api',async (req, res, next) => {
  let data = req.body || '';
  let test = await db.init();
  console.log('data', data);
  console.log('test', test);
  return {data: '>A<'};
});

module.exports = router;
