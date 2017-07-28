app.controller('StatsController', function ($http, dataService, httpService, $location) {
  console.log('loaded sc');
  const vm = this;
  const ds = dataService;
  const hs = httpService;

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
});
