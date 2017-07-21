var express = require('express');
var router = express.Router();
var path = require( 'path' );
var config = require('../config');

router.get('/', function(req, res){
  res.send(config.Oauth);
});

module.exports = router;
