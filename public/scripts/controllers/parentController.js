app.controller('ParentController', function(){

  const vm = this;

    vm.studentArray = [1,2,4,5,6,7];

    vm.checkStudent = function(index){
      console.log(index);
    }
});//end ParentController
