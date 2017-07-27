app.controller('ClassesController', function (httpService, $location, dataService) {
  console.log('loaded CC');
  var vm = this;
  vm.inputNumber = [0];
  var number = 1;
  localStorage.setItem('classView', false);

  vm.addInput = function(){
    vm.inputNumber.push(number);
    number ++;
  };//end addInput //allows adding instructor inputs

  vm.subInput = function(){
    if (vm.inputNumber.length > 1) {
      vm.inputNumber.pop();
    }
  };//end subInput //allows removing an instructor input

  window.onclick = function(event) {
      id = event.target.getAttribute("id");
      if (event.target.getAttribute("class") == 'modal') {
        document.getElementById(id).style.display = 'none';
      }
    };//end window.onclick //allows clicking outside the modal to close

    vm.editClass = function(index){
      vm.gradesUP = vm.classesArray[index].grades;
      vm.subjectUP = vm.classesArray[index].subject;
      vm.startDateUP = vm.classesArray[index].startDate;
      vm.endDateUP = vm.classesArray[index].endDate;
      vm.startTimeUP = vm.classesArray[index].startTime;
      vm.endTimeUP = vm.classesArray[index].startTime;
      vm.locationUP = vm.classesArray[index].location;
      vm.instructorsUP = vm.classesArray[index].instructors;
      document.getElementById('editClass').style.display = 'block';
    };

    vm.addClass = function(){
      let instructorsArray = [];
      for (var i = 0; i < vm.inputNumber.length; i++) {
        let instructor = vm.instructor[i];
        instructorsArray.push(instructor);
      }
      let objectToSend = {
        grades: vm.grades,
        location: vm.location,
        subject: vm.subject,
        startDate: vm.startDate,
        endDate: vm.endDate,
        startTime: vm.startTime,
        endTime: vm.endTime,
        instructors: instructorsArray,
        students: []
      };
      console.log(objectToSend);
      httpService.postItem('private/classes/classes', objectToSend).then(function(res){
        console.log(res);
          vm.populateClasses(); //repopulate classes in table
      });//end then function
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
    });//end http.get item

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
      console.log(x); //takes the class Id that was clicked and stores it
      localStorage.setItem('classID', x);
      $location.path('/students');
      localStorage.setItem('classView', true);
    };//end classView

});
