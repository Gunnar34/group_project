app.controller('StatsController', function($http, dataService, httpService, $location) {
  console.log('loaded sc');
  localStorage.setItem('notParentView', false);
  const vm = this;
  const ds = dataService;
  const hs = httpService;
	var attend = document.getElementById("attend");
  var attendctx = attend.getContext('2d');
  Chart.defaults.global.defaultFontSize = 72;
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
				attendLabelArr.push(vm.classesArray[i].location);
				console.log(vm.classesArray[i].students.length);
				attendDataArr.push(vm.classesArray[i].students.length);
			}
    }); //end http get popClasses
  }; //end populateClasses

  vm.populateClasses();






	  //for donut graph
	  var attendDataArr = [];
	  var attendLabelArr = [];
	  var attendData = {
	    labels: attendLabelArr,
	    pointLabelFontSize: 100,
	    scaleFontSize: 100,
	    datasets: [{
	      data: attendDataArr,
	      backgroundColor: colorArray,
	      borderColor: colorArray,
	      hoverBorderColor: colorArray
	    }],
	  };
	  var options = {};
	  //end donut graph

  var myDoughnutChart = new Chart(attendctx, {
    type: 'doughnut',
    data: attendData,
    options: options
  });

window.dispatchEvent(new Event('resize'));
});
