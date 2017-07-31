//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute', 'bc.AngularKeypad', 'xeditable']);

app.run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

//routes
app.config(function($routeProvider) {
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
  }).when('/instructor', {
    templateUrl: 'public/view/partials/instructor.html',
    controller: 'InstructorController',
    controllerAs: 'inc'
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
  }).when('/checkoutError', {
    templateUrl: 'public/view/parentQuestions/checkoutError.html',
    controller: 'ParentController',
    controllerAs: 'pc'
  }).when('/stats', {
    templateUrl: 'public/view/partials/stats.html',
    controller: 'StatsController',
    controllerAs: 'sc'
  });

}); //end config
