// console.log( 'indexController.js loaded' );

// declare controller
app.controller('IndexController', IndexController);

function IndexController(httpService) {
  const vm = this;

  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  $('.button-collapse').sideNav({
        // menuWidth: 300, // Default is 300
        // edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        // onOpen: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is opened
        // onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
      }
    );

  vm.addInstructor = function() {
    console.log('in vm.addInstructor');
  };  // end addInstructor

  vm.login = function() {
    console.log('in vm.login');
  };  // end login


} // end IndexController
