app.controller('ParentController', function(dataService, httpService, $location) {

  const vm = this;
  const hs = httpService;
  vm.pinEntry = '';
  vm.currentID = localStorage.getItem('classID');
  vm.studentsArray = [];
  vm.currentStudent = dataService.currentStudent;

  httpService.getItem('auth').then(function(res) {
    if (res.data.name) {
      vm.admin = res.data.name.admin;
      vm.name = res.data.name.googleName;
    } else {
      alert('Please Login before viewing this page');
      $location.path('/');
    }
  });

  // functions
  vm.go = function(path) {
    $location.url(path);
  }; // end go

  var attempts = (function() {
    var counter = 0;
    return function() {
      return counter += 1;
    };
  })();

  vm.loadClassInfo = function() {
    hs.getWithID('/private/students', vm.currentID).then(function(res) {
      vm.studentArray = res.data.students;
      dataService.studentArray = vm.studentArray;

    });//end getWithId
};

  vm.checkInStudent = function(user) {
    idx = dataService.studentArray.indexOf(user);
    dataService.currentStudent = dataService.studentArray[idx];
    dataService.index = idx;
    if (dataService.currentStudent.initialized == true) {
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
    // load modal to enter PIN for checkout
    document.getElementById('keypad').style.display = 'block';
  }; // end checkOutStudent

  vm.enterCheckoutPin = function(thingie, pin) {
    if (pin == dataService.currentStudent.pin) {
      console.log('PIN matches!');
      document.getElementById('keypad').style.display = 'none';
      dataService.currentStudent.checkedIn = false;
      id = dataService.currentStudent.studentID;
      parentID = id.split('$', 1);
      hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res) {
        console.log('in completeParentReview, res is:', res);
      });
    } else {
      console.log("PIN didn't match!  PIN:", pin, "Student PIN:", dataService.currentStudent.pin);
      let numAttempts = attempts();
      swal({
        title: 'That PIN was incorrect!',
        text: "Please enter the correct PIN",
        imageUrl: 'public/assets/images/abamath.png',
        imageWidth: 150,
        imageHeight: 150,
        animation: false
      });
      console.log(numAttempts);
      vm.pinEntry = '';
      if (numAttempts >= 3) {
        objectToSend = {
          phone: "+16124301051"
        };
        vm.pinEntry = '';
        // hs.postItem('/private/comm/call', objectToSend).then(function(res) {
        //
        // });
        $location.path('/checkoutError');
      }
    }
  }; // end enterCheckoutPin

  vm.checkoutAllStudents = function(studentArrayToCheckout) {
    console.log('in checkoutAllStudents, ds.array:', dataService.studentArray,
      'and arg.array:', studentArrayToCheckout);
    id = studentArrayToCheckout[0].studentID;
    parentID = id.split('$', 1);
    hs.putItem('private/students/checkoutAllStudents', parentID[0], dataService.studentArray).then(function(res){
      console.log('in checkoutAllStudents, res is:', res);
      vm.loadClassInfo();
    });
  }; // end checkoutAllStudents

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
      // vm.go('/pinPad');  // old design, now using modal
      document.getElementById('keypad').style.display = 'block';
    } else {
      vm.go('/complete');
    }
  }; // end usePin

  vm.enterPin = function(thingie, pin) {
    dataService.currentStudent.pin = pin;
    console.log('in enterPin', dataService.currentStudent);
    document.getElementById('keypad').style.display = 'none';
    vm.go('/complete');
  }; // end enterPin

  vm.keypadClose = function() {
    document.getElementById('keypad').style.display = 'none';
    vm.pinEntry = '';
  }; // end keypadClose

  vm.completeParentReview = function() {
    dataService.currentStudent.initialized = true;
    dataService.currentStudent.checkedIn = true;
    vm.currentStudent = dataService.currentStudent;

    id = dataService.currentStudent.studentID;
    parentID = id.split('$', 1);
    hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res) {
      console.log('in completeParentReview, res is:', res);
    });
  }; // end completeParentReview


}); // end ParentController
