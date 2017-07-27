app.controller('ParentController', function(dataService, $location) {

  const vm = this;
  vm.pinEntry = '';
  // dataService.currentStudent = dataService.currentStudent;
  // vm.currentStudent = {};
  // vm.studentObjectToSend = {
  //   // selfCheck: Boolean,
  //   // receiveTexts: Boolean,
  //   // usePin: Boolean,
  //   // pin: 0
  // };


  // functions
  vm.go = function(path) {
    $location.url(path);
  }; // end go

  vm.loadClassInfo = function() {
    // load class info from service -- probably will change this in the future
    vm.studentArray = dataService.studentArray;
    console.log('in loadClassInfo, studentArray is:', dataService.studentArray);
  }; // end loadClassInfo

  vm.checkInStudent = function(index) {
    dataService.currentStudent = dataService.studentArray[index];
    dataService.index = index;
    // eventually, put in a call (to server?) to get currentStudent from class array
    // dataService.currentStudent = dataService.studentArray[index];
    console.log('in checkInStudent', dataService.currentStudent);
    if(dataService.currentStudent.initialized == true) {
      // if the student has been checked in on previous days, skip emergencyContact page
      vm.go('/selfCheckout');
    } else {
      vm.go('/emergencyContact');
    }
  }; // end checkInStudent

  vm.loadEmergencyInfo = function() {
    // load currentStudent data from service into vm to be edited
    vm.currentStudent = dataService.currentStudent;
    console.log('in loadEmergencyInfo', dataService.currentStudent);
  }; // end loadEmergencyInfo

  vm.emergencySubmit = function() {
    // reverse last function, saving data from vm back to service
    dataService.currentStudent = vm.currentStudent;
    console.log('in emergencySubmit', dataService.currentStudent);
    vm.go("/selfCheckout");
  }; // end emergencySubmit

  vm.emergencyAlert = function(boolean) {
    alert('You can edit the info directly on this page.');
  }; // end emergencyAlert

  vm.selfCheckout = function(boolean) {
    dataService.currentStudent.selfCheck = boolean;
    console.log('in selfCheckout', dataService.currentStudent);
    vm.go('/receiveTexts');
  }; // end selfCheckout

  vm.receiveTexts = function(boolean) {
    dataService.currentStudent.receiveTexts = boolean;
    console.log('in receiveTexts', dataService.currentStudent);
    vm.go('/pinSystem');
  }; // end receiveTexts

  vm.loadPinInfo = function() {
    // load currentStudent data from service into vm to go to appropriate PIN page
    vm.currentStudent = dataService.currentStudent;
    console.log('in loadPinInfo', dataService.currentStudent);
  }; // end loadPinInfo

  vm.usePin = function(boolean) {
    dataService.currentStudent.usePin = boolean;
    console.log('in usePin', dataService.currentStudent);
    if (boolean) {
      vm.go('/pinPad');
    } else {
      vm.completeParentReview();
    }
  }; // end usePin

  vm.enterPin = function(thingie, pin) {
    dataService.currentStudent.pin = pin;
    console.log('in enterPin', dataService.currentStudent);
    vm.completeParentReview();
  }; // end enterPin

  vm.completeParentReview = function() {
    dataService.currentStudent.initialized = true;
    dataService.studentArray[dataService.index] = dataService.currentStudent;
    vm.go('/complete');
  }; // end completeParentReview

}); // end ParentController
