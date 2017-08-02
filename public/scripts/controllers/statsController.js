app.controller('StatsController', function($http, dataService, httpService, $location) {
  console.log('loaded sc');
  localStorage.setItem('notParentView', false);
  const vm = this;
  const ds = dataService;
  const hs = httpService;
	var attend = document.getElementById("attend");
  var attendctx = attend.getContext('2d');
  Chart.defaults.global.defaultFontSize = 36;
  vm.classesArray = [];

  httpService.getItem('auth').then(function(res) {
    if (res.data.name) {
      vm.admin = res.data.name.admin;
      vm.name = res.data.name.googleName;
    } else {
      alert('Please Login before viewing this page');
      $location.path('/');
    }
  });

  vm.populateClasses = function() {
    console.log('in populateClasses');
    httpService.getItem('private/classes/classes').then(function(res) {
      vm.classesArray = res.data[0];
			console.log(vm.classesArray);
			for (var i = 0; i < vm.classesArray.length; i++) {
				console.log(vm.classesArray[i].location);
				vm.attendLabelArr.push(vm.classesArray[i].location);
				console.log(vm.classesArray[i].students.length);
				vm.attendDataArr.push(vm.classesArray[i].students.length);
			}
    }); //end http get popClasses
  }; //end populateClasses

  vm.populateClasses();

	  //for donut graph
	  vm.attendDataArr = [];
	  vm.attendLabelArr = [];

//
// window.dispatchEvent(new Event('resize'));
});
