var express = require('express');
var router = express.Router();
var path = require( 'path' );

router.get('/', function(req, res){
  console.log('Base URL hit');
  res.sendFile( path.resolve( 'public/view/index.html' ) );
});

module.exports = router;
