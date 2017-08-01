
app.controller('StudentsController', function ($http, dataService, httpService, $location) {
  console.log('loaded sc');
  //conts
  const vm = this;
  const ds = dataService;
  const hs = httpService;
  //vm's
  vm.data = '';
  vm.studentsArray = [];
  vm.currentID = localStorage.getItem('classID');
  vm.emergencyInfo = [];
  vm.currentClass;
  vm.currentStudentID;
  vm.gradesRange = []
vm.goToParent = function(){
  console.log('click');
  $location.path('/parent');
};


  window.onclick = function(event) {
    id = event.target.getAttribute("id");
    if (event.target.getAttribute("class") == 'modal') {
      document.getElementById(id).style.display = 'none';
    }//end if
  };//end window onclick

  hs.getItem('auth').then(function(res){
    if (res.data.name) {
      vm.admin = res.data.name.admin;
      vm.name = res.data.name.googleName;
    }
    else {
      alert('Please Login before viewing this page');
      $location.path('/');
    }
  });//end httpService get item

  vm.displayClass = function(){
    console.log('before', vm.currentID);
    hs.getWithID('/private/students', vm.currentID).then(function(res){
      vm.studentsArray = res.data.students;
      console.log(vm.studentsArray);
      vm.currentClass = res.data;
      console.log(vm.currentClass);
      vm.gradesRange = vm.currentClass.grades.split(',')
    });//end get withId
  };//end displayClass

  //ng-init display call
  vm.displayClass();

  // adds student to class array in db
  vm.addStudent = function(){
    //creates item to send
    var itemToSend = new Student(vm.currentID, vm.firstName,  vm.lastName,  vm.grade,  vm.emergencyName,  vm.emergencyPhone,  vm.emergencyRelation);
    console.log(itemToSend);
    hs.putItem('/private/students', vm.currentID, itemToSend).then(function(res){
      //call to update
      vm.displayClass();
      document.getElementById('addStudentForm').reset();
      document.getElementById('addStudent').style.display = 'none';
    });
  };//end add student


  vm.setId = function(id){
    vm.currentStudent = id;
    console.log(id);
    vm.id = vm.currentStudent.studentID;
    vm.firstNameUp = vm.currentStudent.firstName;
    vm.lastNameUp = vm.currentStudent.lastName;
    vm.gradeUp = vm.currentStudent.grade;
    vm.emergencyNameUp = vm.currentStudent.emergencyName;
    vm.emergencyPhoneUp = vm.currentStudent.emergencyPhone;
    vm.emergencyRelationUp = vm.currentStudent.emergencyRelation;
  };//end setID

  vm.editStudent = function(){
    let objectToSend = {
      id: vm.id,
      firstName: vm.firstNameUp,
      lastName: vm.lastNameUp,
      grade: vm.gradeUp,
      emergencyName: vm.emergencyNameUp,
      emergencyPhone: vm.emergencyPhoneUp,
      emergencyRelation: vm.emergencyRelationUp,
      checkedIn: vm.currentStudent.checkedIn,
      selfCheck: vm.currentStudent.selfCheck,
      usePin: vm.currentStudent.usePin,
      pin: vm.currentStudent.pin,
      receiveTexts: vm.currentStudent.receiveTexts,
      initialized: vm.currentStudent.initialized
    };
    console.log(objectToSend);
    hs.putItem('/private/students/edit', objectToSend.id, objectToSend);
    document.getElementById('editStudent').style.display = 'none';
    vm.displayClass();
  };//end edit students

  vm.viewEmergency = function(id){
    console.log(id);
    httpService.getWithID('/private/students/emergencyInfo', id).then(function(res){
      console.log(res.data);
      vm.studentName = res.data.firstName;
      vm.emergencyName = res.data.emergencyName;
      vm.emergencyRelation = res.data.emergencyRelation;
      vm.emergencyPhone = res.data.emergencyPhone;
    });//end .then

  };//end viewEmrgency

  hs.getItem('/private/students').then(function (response) {
    if (response.data.err) {
      vm.data = 'Sorry, you are not logged in!';
    } else {
      vm.data = response.data.message;
    }//end else
    console.log(vm.data);
  });//end displayClass


  vm.deletStudents = function(id){
    swal({
      title: 'Are you sure you want to delete this student?',
      text: "You won't be able to undo this!",
      imageUrl: 'public/assets/images/abamath.png',
      imageWidth: 150,
      imageHeight: 150,
      animation: true,
      showCancelButton: true,
      confirmButtonColor: '#2196f3',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: true
    }).then(function(){
      hs.deleteItem('/private/students', id).then(function(res){
        console.log('back from deleteItem');
        vm.displayClass();
      });//end deleteItem
    });
  };//end delete students


});//end student controller


















//spacer
