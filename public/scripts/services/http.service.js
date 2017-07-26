app.service('httpService', function($http) {
  var sv = this;
  sv.classes = [];
  // httpServices
  sv.getItem = function(path) {
    return $http.get(path).then(function(response) {
      // console.log('service getItem: ', response);
      return response;
    });
  }; // end getItem

  sv.getWithID = function(path, id) {
    return $http.get(path + '/' + id).then(function(response) {
      console.log('service getWithId: ', response);
      return response;
    });
  }; // end getWithID

  sv.postItem = function(path, its) {
    return $http.post(path, its).then(function(response) {
      console.log('service posted', response);
      return response;
    });
  }; // end postItem

  sv.putItem = function(path, id, its) {
    console.log('its: ', its);
    return $http.put(path + '/' + id, its).then(function(response) {
      console.log('service updated', response);
      return response;
    });
  }; // end putItem

  sv.deleteItem = function(path, id) {
    return $http.delete(path + '/' + id).then(function(response) {
      console.log('service deleted', response);
      return response;
    });
  }; // end deleteItem

}); // end service
