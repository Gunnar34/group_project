var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var funPage = require('./funPage');
var classes = require('./classes');
var students = require('./students');



/** ---------- SUBROUTES ---------- **/

router.use('/fun', funPage);
router.use('/calendar', calendar);
router.use('/classes', classes);
router.use('/students', students);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
