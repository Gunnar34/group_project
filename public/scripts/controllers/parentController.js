app.controller('ParentController', function($location){

  const vm = this;

  vm.go = function(path){
    $location.url(path);
  };//end go function

  vm.dummyKid = {
    studentid: 30,
    firstName: 'Peta',
    lastName: 'Malark',
    grade: '4th'
  }//this can be deleted just dummy data

    vm.studentArray = [];
    vm.studentArray.push(vm.dummyKid);//this can be deleted just dummy data

    vm.checkStudent = function(index){
      console.log(index);
      vm.go('/emergencyContact');
    };//end checkStudent

    vm.emergencyReview = function(){
      console.log('review click');
    };//end emergencyReview

    vm.goNext = function(path){
      vm.go(path);
    };//end go next
});//end ParentController
