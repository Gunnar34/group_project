//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'public/view/partials/login.html',
    controller: 'AuthController',
    controllerAs: 'auth',
  }).when('/instructor', {
    templateUrl: 'view/partials/instructor.html',
    controller: 'IndexController'
  }).when('/parent', {
    templateUrl: 'public/view/parent.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/emergencyContact', {
    templateUrl: 'public/view/parentQuestions/1-emergencyContact.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/selfCheckout', {
    templateUrl: 'public/view/parentQuestions/2-selfCheckOut.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/receiveTexts', {
    templateUrl: 'public/view/parentQuestions/3-receiveTexts.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/pinSystem', {
    templateUrl: 'public/view/parentQuestions/4a-pinSystem.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/pinPad', {
    templateUrl: 'public/view/parentQuestions/4b-pinPad.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/complete', {
    templateUrl: 'public/view/parentQuestions/5-complete.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  });

}); //end config
