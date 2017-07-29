
app.controller('StudentsController', function ($http, dataService, httpService, $location) {
  console.log('loaded sc');
  const vm = this;
  const ds = dataService;
  const hs = httpService;
  vm.data = '';
  vm.studentsArray = [];
  vm.currentID = localStorage.getItem('classID');
  vm.emergencyInfo = [];
  vm.currentClass;
  vm.currentStudentID;

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
    console.log(id);
    vm.currentStudent = id;
  };//end setID

  vm.editStudent = function(){
    console.log(vm.currentStudent);

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
    hs.deleteItem('/private/students', id).then(function(res){
      console.log('back from deleteItem');
      vm.displayClass();
    });//end deleteItem
  };//end delete students

});//end student controller
