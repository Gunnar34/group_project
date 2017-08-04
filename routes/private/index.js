var express = require('express');
var router  = express.Router();
var classes = require('./classes');
var students = require('./students');
var instructor = require('./instructor');
var comm = require('./communication');


/** ---------- SUBROUTES ---------- **/

router.use('/classes', classes);
router.use('/students', students);
router.use('/instructor', instructor);
router.use('/comm', comm);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
