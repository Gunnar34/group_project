googleAuthApp.controller('FunController', function (AuthFactory, $window, $http) {
  var _this = this;

  _this.data = '';
  _this.show = false;
  $http.get('/private/fun')
    .then(function (response) {
      if (response.data.err) {
        _this.data = 'Sorry, you are not logged in!';
      } else {
        _this.show = true;
        _this.data = response.data.message;

      }
    });
});
