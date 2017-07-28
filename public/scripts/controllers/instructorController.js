app.controller('InstructorController', InstuctorController);

function InstuctorController(httpService, AuthFactory, $window, $location) {
  console.log('in InstuctorController');
  const vm = this;
  vm.edit = false;
  vm.notEdit = true;

  vm.editB = function(){
    vm.edit = !vm.edit;
    vm.notEdit = !vm.notEdit;
  };

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
    if (vm.email) {
      let itemToSend = {
        email: vm.email
      };
      httpService.postItem('private/instructor', itemToSend).then(function(res){
        vm.email = undefined;
        vm.getInstructors();
      });
    } //end if
    else {
      alert('please enter an email before submitting')
    }
  };

  vm.getInstructors = function(){
    httpService.getItem('private/instructor').then(function(res){
      vm.users = res.data;
    });
  };

}//end InstuctorController
