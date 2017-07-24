var express = require('express');
var router = express.Router();
var path = require( 'path' );
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({
  extend: true
}));
router.use(bodyParser.json());


router.get('/', function(req, res){
  console.log('Base URL hit');
  res.sendFile(path.join(__dirname, '../public/view/index.html'));
  // res.sendFile( path.resolve( 'public/view/index.html' ) );
});

module.exports = router;
