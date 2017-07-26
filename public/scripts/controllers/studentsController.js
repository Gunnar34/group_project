
app.controller('StudentsController', function ($http, dataService, httpService, $location) {
  console.log('loaded sc');
  const vm = this;
  const ds = dataService;
  const hs = httpService;
  vm.data = '';
  vm.studentsArray = [];
  vm.currentID = localStorage.getItem('classID');

  window.onclick = function(event) {
    id = event.target.getAttribute("id");
    if (event.target.getAttribute("class") == 'modal') {
      document.getElementById(id).style.display = 'none';
    }//end if
  };//end window onclick

  httpService.getItem('auth').then(function(res){
    if (res.data.name) {
      vm.admin = res.data.name.admin;
      vm.name = res.data.name.googleName;
    }
    else {
      alert('Please Login before viewing this page');
      $location.path('/');
    }
  });

  vm.displayClass = function(){
    console.log('before', vm.currentID);
    hs.getWithID('/private/students', vm.currentID).then(function(res){
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
    var itemToSend = new Student(parentID, firstName, lastName, grade, emergencyInfo);
    // var itemToSend = {
    //   studentID: vm.currentID + '$' + new Date(),
    //   firstName: vm.firstName,
    //   lastName: vm.lastName,
    //   grade: vm.grade,
    //   selfCheck: false,
    //   receiveTexts: false,
    //   usePin: false,
    //   pin: null,
    //   checkedIn: false
    //   // emergencyInfo: vm.emergencyInfo
    // };
    console.log(itemToSend);
    hs.putItem('/private/students', vm.currentID, itemToSend).then(function(res){
      //call to update
      vm.displayClass();
      document.getElementById('addStudent').style.display = 'none';

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

  vm.deletStudents = function(id){
    console.log(id);
    hs.deleteItem('/private/students', id).then(function(res){
      console.log('back from deleteItem');
    });
  }

});//end student controller























//spacer
