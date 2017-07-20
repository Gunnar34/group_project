//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/partials/home.html'
  });
});

//main controller
app.controller('mainController', mainController);

function mainController(){
  var vm = this;

}
