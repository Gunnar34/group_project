app.controller('StatsController', function($http, dataService, httpService, $location) {
  localStorage.setItem('notParentView', true);
  const vm = this;
  const ds = dataService;
  const hs = httpService;

  Chart.defaults.global.defaultFontSize = 24;
  vm.classesArray = [];
  var pin = 0;
  var noPin = 0;
  var check = new Date();
  var inNow = 0;
  var outNow = 0;

  vm.pinDataArr = [];
  vm.pinLabelArr = ['Yes', 'No'];
  vm.inNowDataArr = [];
  vm.inNowLabelArr = ['In', 'Out'];
  vm.logData = [];

    vm.attendOptions = {
      scales: {
        xAxes: [{ticks: {autoSkip: false,}}],
        yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max:20}}]
      }
    };

  hs.getItem('auth').then(function(res) {
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

  hs.getItem('private/classes/logs').then(function(res) {
  vm.logData = res.data;
  });

  vm.populateClasses = function() {
    httpService.getItem('private/classes/classes').then(function(res) {
      var pin = 0;
      var noPin = 0;
      vm.classesArray = res.data[0];
      for (let i = 0; i < vm.classesArray.length; i++) {
        //attend donut
        vm.attendLabelArr.push(vm.classesArray[i].location);
        vm.attendDataArr.push(vm.classesArray[i].students.length);
        let start = Date.parse(vm.classesArray[i].startDate);
        let end = Date.parse(vm.classesArray[i].endDate);
        //today's attendance
        if((check.getTime() <= end && check.getTime() >= start)){
          for (let j = 0; j < vm.classesArray[i].students.length; j++) {
            if (vm.classesArray[i].students[j].checkedIn == 'true') {
              inNow++;
            } else {
              outNow++;
            }
          }
        }
      }
      // pin use
      for (let j = 0; j < vm.classesArray.length; j++) {
        for (let k = 0; k < vm.classesArray[j].students.length; k++) {
          if (vm.classesArray[j].students[k].usePin == true) {
            pin++;
          } else {
            noPin++;
          }
        }
      }
      vm.inNowDataArr = [inNow, outNow];
			vm.pinDataArr = [pin, noPin];
    }); //end http get popClasses
  };//end populateClasses


  vm.populateClasses();

  //for donut graph
  vm.attendDataArr = [];
  vm.attendLabelArr = [];


});
