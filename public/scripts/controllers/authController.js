app.controller('AuthController', function (AuthFactory) {
  var vm = this;
  var authFactory = AuthFactory;
  vm.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load

  vm.error = function(){
    swal({
    	title: 'You are not authorized!',
    	text: "Please try a different email or speak with an admin",
    	imageUrl: 'public/assets/images/abamath.png',
    	imageWidth: 150,
    	imageHeight: 150,
    	animation: false
    });
  };
});
