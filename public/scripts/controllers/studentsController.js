
app.controller('StudentsController', function ($http, dataService, httpService) {
  console.log('loaded sc');
  const vm = this;
  const ds = dataService;
  const hs = httpService;
  vm.data = '';
vm.studentsArray = [];

  window.onclick = function(event) {
      id = event.target.getAttribute("id");
      if (event.target.getAttribute("class") == 'modal') {
        document.getElementById(id).style.display = 'none';
      }//end if
    };//end window onclick

  vm.displayClass = function(){
    console.log('before', ds.currentClass);
    hs.getWithID('/private/students', ds.currentClass).then(function(res){
      vm.studentsArray = res.data.students;
      console.log(vm.studentsArray);
      console.log('call made');
      console.log('response: ',res);
    });//end get withId
  };//end displayClass

//ng-init display call
vm.displayClass();

// adds student to class array in db
vm.addStudent = function(){
//creates item to send
  var itemToSend = {
    studentID: ds.currentClass + '$' + new Date(),
    firstName: vm.firstName,
    lastName: vm.lastName,
    grade: vm.grade,
    selfCheck: false,
    receiveTexts: false,
    usePin: false,
    pin: null,
    checkedIn: false
    // emergencyInfo: vm.emergencyInfo
  };
  console.log(itemToSend);
  hs.putItem('/private/students', ds.currentClass, itemToSend).then(function(){
    //call to update
    vm.displayClass();
  });
};
  hs.getItem('/private/students').then(function (response) {
      if (response.data.err) {
        vm.data = 'Sorry, you are not logged in!';
      } else {
        vm.data = response.data.message;
      }//end else
      console.log(vm.data);
    });//end displayClass

    vm.populateStudents = function(){
      console.log('in populateStudents');
      objectToSend = new Student(vm.parentID, vm.firstName, vm.lastName, vm.grade);
      console.log(objectToSend);
    };//end populateStudents


});//end student controller
