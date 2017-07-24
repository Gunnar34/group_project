var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var funPage = require('./funPage');
var classes = require('./classes');



/** ---------- SUBROUTES ---------- **/

router.use('/fun', funPage);
router.use('/calendar', calendar);
router.use('/classes', classes);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
