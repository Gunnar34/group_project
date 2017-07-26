app.controller('ClassesController', function (httpService, $location, dataService) {
  console.log('loaded CC');
  var vm = this;
  vm.inputNumber = [0];
  var number = 1;

  vm.addInput = function(){
    vm.inputNumber.push(number);
    number ++;
  };

  window.onclick = function(event) {
      id = event.target.getAttribute("id");
      if (event.target.getAttribute("class") == 'modal') {
        document.getElementById(id).style.display = 'none';
      }
    };

    vm.addClass = function(){

      let objectToSend = {
        grades: vm.grades,
        location: vm.location,
        subject: vm.subject,
        startDate: vm.startDate,
        endDate: vm.endDate,
        startTime: vm.startTime,
        endTime: vm.endTime,
        instructors: vm.instructors,
        students: []
      };
      console.log(objectToSend);
      httpService.postItem('private/classes/classes', objectToSend).then(function(res){
        console.log(res);
      });//end then function
        vm.populateClasses(); //repopulate classes in table
        document.getElementById('addClass').style.display = 'none'; //close modal
    };//end addClass

    vm.populateClasses = function(){
      console.log('in populateClasses');
      httpService.getItem('private/classes/classes').then(function(res){
        vm.classesArray = res.data[0];
      });//end http get popClasses
    };//end populateClasses

    vm.removeClass = function(id){
      httpService.deleteItem('/private/classes', id).then(function(res){
        console.log('deleted', res);
        vm.populateClasses();
      });//end deleteItem
    };//end remove class

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

    vm.classView = function(x){
      console.log(x); //takes the class Id that was clicked and stores it in the service

      localStorage.setItem('classID', x);
      $location.path('/students')
    };

});
