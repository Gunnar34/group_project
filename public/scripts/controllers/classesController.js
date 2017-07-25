app.controller('ClassesController', function (httpService, $location) {
  console.log('loaded CC');
  var vm = this;

    vm.populateClass = function(){
      console.log('in populateClasses');
    };//end populateClasss

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
      httpService.postItem('private/classes', itemToSend).then(function(res){
        vm.email = undefined;
      });
    };

});
