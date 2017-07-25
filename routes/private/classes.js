var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var classesModel = require('../../models/classesModel');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/classes', function(req, res){
  console.log(req.body);
});//end post classes
module.exports = router;
