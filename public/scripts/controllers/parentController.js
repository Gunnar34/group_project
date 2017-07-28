app.controller('ParentController', function(dataService, httpService, $location) {

  const vm = this;
  const hs = httpService;
  vm.pinEntry = '';
  vm.currentID = localStorage.getItem('classID');
  vm.studentsArray = [];

  // functions
  vm.go = function(path) {
    $location.url(path);
  }; // end go

  vm.loadClassInfo = function() {
    // load class info from service -- probably will change this in the future
    // vm.studentArray = dataService.studentArray;
    // console.log('in loadClassInfo, studentArray is:', dataService.studentArray);
    hs.getWithID('/private/students', vm.currentID).then(function(res){
      vm.studentArray = res.data.students;
      dataService.studentArray = vm.studentArray;
    });//end get withId
  }; // end loadClassInfo

  vm.checkInStudent = function(user) {

    idx = dataService.studentArray.indexOf(user);
    dataService.currentStudent = dataService.studentArray[idx];
    dataService.index = idx;
    if(dataService.currentStudent.initialized == true) {
      // if the student has been checked in on previous days, skip emergencyContact page
      vm.go('/selfCheckout');
    } else {
      vm.go('/emergencyContact');
    }
  }; // end checkInStudent

  vm.checkOutStudent = function(user) {
    idx = dataService.studentArray.indexOf(user);
    dataService.currentStudent = dataService.studentArray[idx];
    dataService.index = idx;
    // vm.go('/checkOut');
    dataService.currentStudent.checkedIn = false;

    id = dataService.currentStudent.studentID;
    parentID = id.split('$', 1);
    hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res){
      console.log('in completeParentReview, res is:', res);
    });
  }; // end checkOutStudent

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
      vm.go('/complete');
    }
  }; // end usePin

  vm.enterPin = function(thingie, pin) {
    dataService.currentStudent.pin = pin;
    console.log('in enterPin', dataService.currentStudent);
    vm.go('/complete');
  }; // end enterPin

  vm.completeParentReview = function() {
    dataService.currentStudent.initialized = true;
    dataService.currentStudent.checkedIn = true;
    vm.currentStudent = dataService.currentStudent;

    id = dataService.currentStudent.studentID;
    parentID = id.split('$', 1);
    hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res){
      console.log('in completeParentReview, res is:', res);
    });
  }; // end completeParentReview


}); // end ParentController
