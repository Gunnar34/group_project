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
  };

  vm.login = function(){
    hello('google').login({scope:'email'}).then(function(auth){
      console.log(auth);
      hello(auth.network).api('/me').then(function (res) {
        let email = res.email;
        let firstName = res.first_name;
        let lastName = res.last_name;
        let itemToSend = {
          email: email,
          first: firstName,
          last: lastName
        };
        httpService.postItem(itemToSend).then(function(err, res){
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('email', email);
        });
      });
  });
};

  function getAccess() {
    httpService.getItem('/access').then(function(res){
      hello.init({
        google: res.data
      });
    });
  } //end get of appID


} // end IndexController
