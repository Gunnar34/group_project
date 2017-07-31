var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var classesModel = require('../../models/classesModel');


router.get('/', function(req, res) {
  res.send({
    message: 'nice students'
  });
}); //end get students

router.get('/:id', function(req, res) {
  console.log('id hit', req.params.id);
  classesModel.findOne({_id: req.params.id}).then(function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    } //end else
  }); //end find one then
}); //end find one student

//gets emergencyInfo with id
router.get('/emergencyInfo/:id', function(req, res){
  var id = req.params.id;
  parentID = id.split('$', 1);

  classesModel.findOne({'_id': parentID[0], 'students.studentID': req.params.id}).then(function(data, err){
    if (err) {
      console.log('err', err);
      res.send(err)
    } else {
      for (var i = 0; i < data.students.length; i++) {
        if (data.students[i].studentID == id){
          res.send(data.students[i]);
        }
      }//end for loop
    } //end else
  });//end find one studentID
});//end emergencyInfo

//adds students to db
router.put('/:id', function(req, res) {
  console.log('db add student', req.params.id);
  var myQuery = {
    _id: req.params.id
  }; //end myQuery object
  console.log(myQuery);
  var newValues = {
    $push: {
      students: {
        studentID: req.body.studentID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        grade: req.body.grade,
        selfCheck: req.body.selfCheck,
        receiveTexts: req.body.receiveTexts,
        usePin: req.body.usePin,
        pin: req.body.pin,
        checkedIn: req.body.checkedIn,
        initialized: req.body.initialized,
        emergencyName: req.body.emergencyName,
        emergencyPhone: req.body.emergencyPhone,
        emergencyRelation: req.body.emergencyRelation
      } //end students object
    } //end $push
  }; //end newValues object
  console.log('new student: ', newValues);
  classesModel.findOneAndUpdate(myQuery, newValues, function(err) {
    if (!err) {
      res.send('added to class');
    } else {
      res.send('error');
    } //end else
  }); //end findOne and update
}); //end put

//edits students to db
router.put('/init/:id', function(req, res) {
  console.log('db notes update', req.body);

  var myQuery = {
    '_id': req.params.id,
    'students.studentID': req.body.studentID
  };
  //
  console.log('query, ', myQuery);

  console.log("-----------------", req.body);
  var newValues = {
    $set: {
      'students.$': {
        studentID: req.body.studentID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        grade: req.body.grade,
        selfCheck: req.body.selfCheck,
        receiveTexts: req.body.receiveTexts,
        usePin: req.body.usePin,
        pin: req.body.pin,
        checkedIn: req.body.checkedIn,
        initialized: req.body.initialized,
        emergencyName: req.body.emergencyName,
        emergencyPhone: req.body.emergencyPhone,
        emergencyRelation: req.body.emergencyRelation
      }
    } //end $set
  };
  console.log('new notes: ', newValues);
  classesModel.findOneAndUpdate(myQuery, newValues, function(err) {
    console.log('Did we make it in?');
    if (!err) {
      res.send('added to class');
    } else {
      res.send('error');
    } //end else
  }); //end findOne and update
}); //end put

// route to check-out all students
router.put('/checkoutAllStudents/:id', function(req, res) {
  console.log('in checkoutAllStudents, req.body is:', req.body);

  // var myQuery = {
  //   '_id': req.params.id,
  //   'students.studentID': req.body.studentID
  // };
  // //
  // var newValues = {
  //   $set: {
  //     'students.$': {
  //       studentID: req.body.studentID,
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       grade: req.body.grade,
  //       selfCheck: req.body.selfCheck,
  //       receiveTexts: req.body.receiveTexts,
  //       usePin: req.body.usePin,
  //       pin: req.body.pin,
  //       checkedIn: req.body.checkedIn,
  //       initialized: req.body.initialized,
  //       emergencyName: req.body.emergencyName,
  //       emergencyPhone: req.body.emergencyPhone,
  //       emergencyRelation: req.body.emergencyRelation
  //     }
  //   } //end $set
  // };
  // console.log('new notes: ', newValues);
  // classesModel.findOneAndUpdate(myQuery, newValues, function(err) {
  //   console.log('Did we make it in?');
  //   if (!err) {
  //     res.send('added to class');
  //   } else {
  //     res.send('error');
  //   } //end else
  // }); //end findOne and update
}); //end put


router.delete('/:id', function(req, res) {
  console.log('db student delete', req.params.id);
  var newValues = {
    $pull: {
      students: {
        studentID: req.params.id
      }
    }
  }; //end new value
  console.log('new student: ', newValues);
  classesModel.update({}, newValues, {
    multi: true
  }, function(err) {
    console.log('Did we make it in?');
    if (!err) {
      res.send('safe');
    } else {
      console.log(err);
      res.send('error');
    }
  }); // end update
}); //end router.delete

module.exports = router;
