var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var classesModel = require('../../models/classesModel');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/classes', function(req, res){
  console.log(req.body);
  var newClass = {
    grades: req.body.grades,
    location: req.body.location,
    subject: req.body.subject,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    instructors: req.body.instructors,
    students: []
  }
  console.log(newClass);
  classesModel(newClass).save();
});//end post classes

router.get('/popClasses', function(req, res){
  console.log('pop classes hit');

  var foundClasses = [];

  classesModel.find(function(err, classes){
    if (err){
      console.log('no classes found');
      res.sendStatus(400);
    }else{
      console.log('found classes');
      foundClasses.push(classes)
    }//end else
    console.log(foundClasses);
    res.send(foundClasses)
  });//end classes find
});//end popClassess

router.delete('/:id', function(req, res){
  console.log('delete hit', req.params.id);
  classesModel.remove({_id: req.params.id}).then(function(err){
    if (!err){
      res.send('nudes');
    }else{
      res.send('error');
    }//end else
  });//end then
});//end delete

module.exports = router;






















//spacer
