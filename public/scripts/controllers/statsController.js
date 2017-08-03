app.controller('StatsController', function($http, dataService, httpService, $location) {
  console.log('loaded sc');
  localStorage.setItem('notParentView', true);
  const vm = this;
  const ds = dataService;
  const hs = httpService;

  Chart.defaults.global.defaultFontSize = 24;
  vm.classesArray = [];
  var pin = 0;
  var noPin = 0;
  vm.pinDataArr = [];
  vm.pinLabelArr = ['True', 'False'];

  httpService.getItem('auth').then(function(res) {
    if (res.data.name) {
      vm.admin = res.data.name.admin;
      vm.name = res.data.name.googleName;
    } else {
      swal({
        title: 'Oops!',
        text: "Please login to continue",
        imageUrl: 'public/assets/images/abamath.png',
        imageWidth: 150,
        imageHeight: 150,
        animation: false
      });
      $location.path('/');
    }
  });

  vm.populateClasses = function() {
    console.log('in populateClasses');
    httpService.getItem('private/classes/classes').then(function(res) {
      var pin = 0;
      var noPin = 0;
      vm.classesArray = res.data[0];
      console.log(vm.classesArray);
      for (var i = 0; i < vm.classesArray.length; i++) {
        //attend donut
        vm.attendLabelArr.push(vm.classesArray[i].location);
        vm.attendDataArr.push(vm.classesArray[i].students.length);
        console.log('length', vm.classesArray[i].students.length);
      }
      for (var j = 0; j < vm.classesArray.length; j++) {
        for (var k = 0; k < vm.classesArray[j].students.length; k++) {
          if (vm.classesArray[j].students[k].usePin == true) {
            pin++;
            console.log('pin', pin);
						console.log('pin arr', vm.pinDataArr);
          } else {
            noPin++;
            console.log('nopin', noPin);
						console.log('pin arr', vm.pinDataArr);
          }
        }
      }
			vm.pinDataArr = [pin, noPin];
			console.log( vm.pinDataArr);
    });

  }; //end http get popClasses
  //end populateClasses

  vm.populateClasses();

  //for donut graph
  vm.attendDataArr = [];
  vm.attendLabelArr = [];

  //
  // window.dispatchEvent(new Event('resize'));
});
