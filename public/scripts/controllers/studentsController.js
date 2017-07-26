
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
      }
    };

  vm.displayClass = function(){
    console.log('before', ds.currentClass);
    hs.getWithID('/private/students', ds.currentClass).then(function(res){
      vm.studentsArray = res.data.students;
      console.log(vm.studentsArray);
      console.log('call made');
      console.log('response: ',res);
    });
  };

vm.displayClass();
  hs.getItem('/private/students').then(function (response) {
      if (response.data.err) {
        vm.data = 'Sorry, you are not logged in!';
      } else {
        vm.data = response.data.message;
      }
      console.log(vm.data);
    });

    vm.populateStudents = function(){
      console.log('in populateStudents');
      objectToSend = new Student(vm.parentID, vm.firstName, vm.lastName, vm.grade);
      console.log(objectToSend);
    };//end populateStudents


});
