// console.log( 'indexController.js loaded' );

// declare controller
app.controller('IndexController', IndexController);

function IndexController(httpService) {
  const vm = this;

  vm.addInstructor = function() {
    console.log('in vm.addInstructor');
  };  // end addInstructor

  vm.init = function(){
    getAccess();
  }

  vm.login = function(){
    hello('google').login({scope:'email'}).then(function(auth){
      console.log(auth);
      hello(auth.network).api('/me').then(function (res) {
        console.log(res);
      });
  });
};

  function getAccess() {
    httpService.getItem('/access').then(function(res){
      hello.init({
        google: res.data
      });
    });
  }; //end get of appID


} // end IndexController
