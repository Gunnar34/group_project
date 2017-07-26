var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var classesModel = require('../../models/classesModel');


router.get('/', function (req, res) {
  res.send({ message: 'nice students' });
});//end get students

router.get('/:id', function(req, res){
  console.log('id hit', req.params.id);
  classesModel.findOne({_id: req.params.id}).then(function(err, data){
    if(!err){
      res.send(data);
    }else{
      res.send(err);
    }//end else
  });//end find one then
});//end find one student

router.put('/:id', function(req, res) {
  console.log('db add student', req.params.id);
  var myQuery = {
    _id: req.params.id
  };//end myQuery object
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
      checkedIn: req.body.checkedIn,
      emergencyInfo: req.body.emergencyInfo
    }//end students object
  }//end $push
};//end newValues object
console.log('new student: ', newValues);
patients.findOneAndUpdate(myQuery, newValues, function(err) {
  if (!err) {
    res.send('added to class');
  } else {
    res.send('error');
  }//end else
});//end findOne and update
});

module.exports = router;
