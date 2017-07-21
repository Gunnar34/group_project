//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/partials/home.html'
  }).when('/parent', {
    templateUrl: 'view/partials/parent.html',
    controller: 'ParentController as pc'
  }).when('/emergencyContact', {
    templateUrl: 'view/partials/parentQuestions/emergencyContact.html',
    controller: 'ParentController as pc'
  });
});//end config

//main controller
app.controller('mainController', mainController);

function mainController(){
  var vm = this;

}
