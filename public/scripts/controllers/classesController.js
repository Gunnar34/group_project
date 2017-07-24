app.controller('ClassesController', function ($http) {
  console.log('loaded CC');
  var vm = this;
  vm.data = '';

  $http.get('/private/classes')
    .then(function (response) {
      if (response.data.err) {
        vm.data = 'Sorry, you are not logged in!';
      } else {
        vm.data = response.data.message;
      }
      console.log(vm.data);
    });

    vm.populateClass = function(){
      console.log('in populateClasses');
    };//end populateClasss


});
