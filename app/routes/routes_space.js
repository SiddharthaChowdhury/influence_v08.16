var express = require('express');
var router = express.Router();

var Space = require('../controllers/spaceController');


											// Space creation
router.post('/create', function(req, res){
	// console.log(req.body);
	Space.create_newSpace(req, res);
});

router.post('/code/check', function(req, res){
	Space.check_code(req, res);
});

module.exports = router;