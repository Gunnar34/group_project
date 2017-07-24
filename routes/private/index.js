var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var funPage = require('./funPage');




/** ---------- SUBROUTES ---------- **/

router.use('/fun', funPage);
router.use('/calendar', calendar);



/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
