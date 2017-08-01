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
  classesModel.findOne({
    _id: req.params.id
  }).then(function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    } //end else
  }); //end find one then
}); //end find one student

//gets emergencyInfo with id
router.get('/emergencyInfo/:id', function(req, res) {
  var id = req.params.id;
  parentID = id.split('$', 1);

  classesModel.findOne({
    '_id': parentID[0],
    'students.studentID': req.params.id
  }).then(function(data, err) {
    if (err) {
      console.log('err', err);
      res.send(err);
    } else {
      for (var i = 0; i < data.students.length; i++) {
        if (data.students[i].studentID == id) {
          res.send(data.students[i]);
        }
      } //end for loop
    } //end else
  }); //end find one studentID
}); //end emergencyInfo

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

//edits students to db from the parent controller
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

// route to check-in all students
router.put('/checkInAllStudents/:id', function(req, res) {
  var query = classesModel.where({
    _id: req.params.id
  });
  //finds the correct class
  query.findOne(
    function(err, doc) {
      if (!err) {
        console.log('doc', doc.students.length);
        //iterates through students array and updates individually
        for (var i = 0; i < doc.students.length; i++) {
          query = {
            _id: doc._id,
            students: {
              $elemMatch: {
                studentID: doc.students[i].studentID,
                usePin: {
                  $ne: true
                },
                checkedIn: {
                  $ne: "false"
                }
              }
            }
          }; //end query
          classesModel.findOneAndUpdate(query, {
            $set: {
              "students.$.checkedIn": "true"
            }
          }, function(err, doc) {
            if (!err) {
              console.log('updated');
            } else {
              console.log('err is', err);
            }
          });
        }
      } else {
        console.log('err', err);
      }
    }).then(function(doc, err) {
    if (err) {
      res.send('err');
    } else {
      console.log(doc);
      res.send('safe');
    }
  }); //end promise
});//end checkedIn put

// route to check-out all students
router.put('/checkoutAllStudents/:id', function(req, res) {
  var query = classesModel.where({
    _id: req.params.id
  });
  //finds the correct class
  query.findOne(
    function(err, doc) {
      if (!err) {
        console.log('doc', doc.students.length);
        //iterates through students array and updates individually
        for (var i = 0; i < doc.students.length; i++) {
          query = {
            _id: doc._id,
            students: {
              $elemMatch: {
                studentID: doc.students[i].studentID,
                usePin: {
                  $ne: true
                },
                checkedIn: {
                  $ne: "true"
                }
              }
            }
          }; //end query
          classesModel.findOneAndUpdate(query, {
            $set: {
              "students.$.checkedIn": "false"
            }
          }, function(err, doc) {
            if (!err) {
              console.log('updated');
            } else {
              console.log('err is', err);
            }
          });
        }
      } else {
        console.log('err', err);
      }
    }).then(function(doc, err) {
    if (err) {
      res.send('err');
    } else {
      console.log(doc);
      res.send('safe');
    }
  }); //end promise
});//end checkedIn put

router.put('/forceCheckout/:id', function(req, res) {
  var query = classesModel.where({
    _id: req.params.id
  });
  //finds the correct class
  query.findOne(
    function(err, doc) {
      if (!err) {
        console.log('doc', doc.students.length);
        //iterates through students array and updates individually
        for (var i = 0; i < doc.students.length; i++) {
          query = {
            _id: doc._id,
            students: {
              $elemMatch: {
                studentID: doc.students[i].studentID,
                checkedIn: {
                  $ne: "true"
                }
              }
            }
          }; //end query
          classesModel.findOneAndUpdate(query, {
            $set: {
              "students.$.checkedIn": "false"
            }
          }, function(err, doc) {
            if (!err) {
              console.log('updated');
            } else {
              console.log('err is', err);
            }
          });
        }
      } else {
        console.log('err', err);
      }
    }).then(function(doc, err) {
    if (err) {
      res.send('err');
    } else {
      console.log(doc);
      res.send('safe');
    }
  }); //end promise
});//end checkedIn put

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

router.put('/edit/:id', function (req, res){
  console.log('edit id hit');
  console.log(req.params.id, 'body', req.body);
  classId = req.params.id.split('$', 1);
  var myQuery = {
    '_id': classId[0],
    'students.studentID': req.body.id
  };
  console.log(myQuery);
  var newValues = {
    '$set': {
      'students.$': {
        studentID: req.body.id,
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
  classesModel.findOneAndUpdate(myQuery, newValues, function(err){
    if(!err){
      console.log('nice');
      res.send('nice');
    }else{
      console.log(err);
      res.send(err);
    }//end else
  }//end findOneAndUpdate function
);// end findOneAndUpdate


});//end put edit


module.exports = router;
