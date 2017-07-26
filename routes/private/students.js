var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send({ message: 'nice students and shit' });
});

router.put('/:id', function(req, res) {
    console.log('db add student', req.params.id);
var myQuery = {
    _id: req.params.id
};
console.log(myQuery);
var newValues = { $push:
    { students: {
      parentID: req.body.parentID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      grade: req.body.grade,
      selfCheck: req.body.selfCheck,
      receiveTexts: req.body.receiveTexts,
      usePin: req.body.usePin,
      emergencyInfo: req.body.emergencyInfo
            }
          }
        };
console.log('new student: ', newValues);
    patients.findOneAndUpdate(myQuery, newValues, function(err) {
        if (!err) {
            res.send('added to class');
        } else {
            res.send('error');
        }
    });
});

module.exports = router;
