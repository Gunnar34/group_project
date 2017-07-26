
app.controller('StudentsController', function ($http) {
  console.log('loaded sc');
  var vm = this;
  vm.data = '';

  window.onclick = function(event) {
      id = event.target.getAttribute("id");
      if (event.target.getAttribute("class") == 'modal') {
        document.getElementById(id).style.display = 'none';
      }
    };
    
  $http.get('/private/students')
    .then(function (response) {
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
