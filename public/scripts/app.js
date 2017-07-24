//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function ($routeProvider){
  $routeProvider.when('/', {
      templateUrl: 'public/view/partials/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    }).when('/classes', {
      templateUrl: 'public/view/partials/classesDashboard.html',
      controller: 'ClassesController',
      controllerAs: 'cc'
    }).when('/students', {
      templateUrl: 'public/view/partials/studentDashboard.html',
      controller: 'StudentsController',
      controllerAs: 'sc'
    });
  // .when('/instructor', {
  //   templateUrl: 'view/partials/instructor.html',
  //   controller: 'IndexController'
  // }).when('/parent', {
  //   templateUrl: 'view/parent.html',
  //   controller: 'ParentController as pc'
  // }).when('/emergencyContact', {
  //   templateUrl: 'view/parentQuestions/emergencyContact.html',
  //   controller: 'ParentController',
  //   controllerAs: 'pc'
  // }).when('/selfCheckOut', {
  //   templateUrl: 'view/parentQuestions/selfCheckOut.html',
  //   controller: 'ParentController',
  //   controllerAs: 'pc'
  // }).when('/reciveText', {
  //   templateUrl: 'view/parentQuestions/reciveTexts.html',
  //   controller: 'ParentController',
  //   controllerAs: 'pc'
  // }).when('/pinSystem', {
  //   templateUrl: 'view/parentQuestions/pinSystem.html',
  //   controller: 'ParentController',
  //   controllerAs: 'pc'
  // }).when('/pinPad', {
  //   templateUrl: 'view/parentQuestions/pinPad.html',
  //   controller: 'ParentController',
  //   controllerAs: 'pc'
  // });
  // // .when('/', {
  // //   templateUrl: '/publicview/partials/home.html',
  // //   controller: 'IndexController'
  // // })

});//end config
