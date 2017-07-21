app.controller('ParentController', function(ParentService, $location){

  const vm = this;
  vm.display;
  vm.display = ParentService.currentStudent;

  vm.go = function(path){
    $location.url(path);
  };//end go function

  vm.goNext = function(path){
    vm.go(path);
  };//end go next

  vm.dummyKid = {
    studentid: 30,
    firstName: 'Peta',
    lastName: 'Malark',
    grade: '4th'
  };//this can be deleted just dummy data

    vm.studentArray = [];
    vm.studentArray.push(vm.dummyKid);//this can be deleted just dummy data

    vm.checkStudent = function(index){
      vm.go('/emergencyContact');
      vm.display = vm.studentArray[index];
      ParentService.currentStudent = vm.studentArray[index];
       console.log(vm.display);
    };//end checkStudent

    vm.checkingOut = function(boolean){
      vm.display.selfCheck = boolean;
      vm.go('/reciveText');
      console.log(vm.display);
    };//end checkingOut

    vm.reciveText = function(boolean){
      vm.display.reciveText = boolean;
      vm.go('/pinSystem');
      console.log(vm.display);
    };//end reciveText

    vm.useSystem = function(boolean){
      vm.display.usePin = boolean;
      if (boolean) {
        vm.go('/pinPad');
      }else {
        console.log('banished to the shadow realm');
      }

    };//end useSystem

});//end ParentController

































//spacer
