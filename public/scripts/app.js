//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/partials/home.html',
    controller: 'IndexController'
  }).when('/instructor', {
    templateUrl: 'view/partials/instructor.html',
    controller: 'IndexController'
  }).when('/parent', {
    templateUrl: 'view/parent.html',
    controller: 'ParentController as pc'
  }).when('/emergencyContact', {
    templateUrl: 'view/parentQuestions/emergencyContact.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/selfCheckOut', {
    templateUrl: 'view/parentQuestions/selfCheckOut.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/reciveText', {
    templateUrl: 'view/parentQuestions/reciveTexts.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/pinSystem', {
    templateUrl: 'view/parentQuestions/pinSystem.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/pinPad', {
    templateUrl: 'view/parentQuestions/pinPad.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  });
});//end config
