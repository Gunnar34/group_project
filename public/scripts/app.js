//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/partials/home.html'
  }).when('/', {
    templateUrl: 'view/partials/parent.html',
    controller: 'ParentController as pc'
  });
});//end config

//main controller
app.controller('mainController', mainController);

function mainController(){
  var vm = this;

}
