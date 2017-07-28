app.controller('InstructorController', InstuctorController);

function InstuctorController(httpService, AuthFactory, $window, $location) {
  console.log('in InstuctorController');
  const vm = this;
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

  vm.getInstructors = function(){
    // httpService.getItem()
  };

}//end InstuctorController
