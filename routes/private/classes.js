var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../../services/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


module.exports = router;
