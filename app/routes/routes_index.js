
var express = require('express');
var router = express.Router();

////https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
// router.use(function(req, res, next) {
//   // .. some logic here .. like any other middleware
//   next();
// });

// GET home page.
router.get('/', function(req, res) {
  	res.render('index', { title: 'Influence' });
});

router.get('/markdown', function(req, res) {
  	res.render('markdown', { title: 'markdown | Influence' });
});

module.exports = router;
