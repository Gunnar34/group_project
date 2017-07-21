// console.log( 'indexController.js loaded' );

// declare controller
app.controller('IndexController', IndexController);

function IndexController(httpService) {
  const vm = this;

  vm.addInstructor = function() {
    console.log('in vm.addInstructor');
  };  // end addInstructor

  vm.login = function() {
    console.log('in vm.login');
  };  // end login


} // end IndexController
