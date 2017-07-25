app.controller('ClassesController', function (httpService, $location) {
  console.log('loaded CC');
  var vm = this;

  vm.classesArray = [];

  window.onclick = function(event) {
      id = event.target.getAttribute("id");
      if (event.target.getAttribute("class") == 'modal') {
        document.getElementById(id).style.display = 'none';
      }
    };

    vm.addClass = function(){

      let objectToSend ={
        grades: vm.grades,
        location: vm.location,
        subject: vm.subject,
        startDate: vm.startDate,
        endDate: vm.endDate,
        startTime: vm.startTime,
        endTime: vm.endTime,
        instructors: vm.instructors,
        students: []
      }
      console.log(objectToSend);
      httpService.postItem('private/classes/classes', objectToSend)
    };//end addClass

    vm.populateClasses = function(){
      console.log('in populateClasses');
      httpService.getItem('private/classes/popClasses').then(function(res){
        console.log(res, res.data);
        vm.classesArray = res.data[0];
      });//end http get popClasses
    };//end populateClasses

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

    vm.addUser = function(){
      console.log(vm.email);
      let itemToSend = {
        email: vm.email
      };
      httpService.postItem('private/instructor', itemToSend).then(function(res){
        vm.email = undefined;
      });
    };

});
