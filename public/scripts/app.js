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
    templateUrl: 'view/partials/parent.html',
    controller: 'ParentController'
  });
});//end config
