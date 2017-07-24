app.controller('ParentController', function(ParentService, $location) {

  const vm = this;
  // vm.currentStudent = ParentService.currentStudent;

  vm.dummyKid = {
    studentid: 30,
    firstName: 'Peta',
    lastName: 'Malark',
    grade: '4th'
  }; //this can be deleted just dummy data

  vm.dummyKid2 = {
    studentid: 30,
    firstName: 'Snorgarml',
    lastName: 'Blarginton',
    grade: '3rd'
  }; //this can be deleted just dummy data

  vm.studentArray = [];
  vm.studentArray.push(vm.dummyKid); //this can be deleted just dummy data
  vm.studentArray.push(vm.dummyKid2); //this can be deleted just dummy data

  // functions
  vm.go = function(path) {
    $location.url(path);
  }; //end go function

  vm.checkInStudent = function(index) {
    vm.currentStudent = vm.studentArray[index];
    // eventually, put in a call (to server?) to get currentStudent from class array
    // ParentService.currentStudent = vm.studentArray[index];
    console.log(vm.currentStudent);
    vm.go('/emergencyContact');
  }; //end checkInStudent

  vm.emergencyAlert = function(boolean) {
    alert('You can edit the info directly on this page.');
  }; //end emergencyAlert

  vm.selfCheckout = function(boolean) {
    vm.currentStudent.selfCheck = boolean;
    console.log(vm.currentStudent);
    vm.go('/receiveTexts');
  }; //end selfCheckout

  vm.receiveText = function(boolean) {
    vm.currentStudent.receiveText = boolean;
    console.log(vm.currentStudent);
    vm.go('/pinSystem');
  }; //end receiveText

  vm.usePin = function(boolean) {
    vm.currentStudent.usePin = boolean;
    if (boolean) {
      vm.go('/pinPad');
    } else {
      console.log('banished to the shadow realm');
      vm.go('/complete');
    }
  }; //end usePin

}); //end ParentController
