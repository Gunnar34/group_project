app.service('httpService', function($http) {
  var sv = this;

  // httpServices
  sv.getItem = function(path) {
    return $http.get(path).then(function(response) {
      console.log('service getItem: ', response);
      return response;
    });
  };
  sv.getWithID = function(path, id) {
    return $http.get(path + '/'+ id).then(function(response) {
      console.log('service getWithId: ', response);
      return response;
    });
  };

  sv.postItem = function(path, its) {
    return $http.post(path, its).then(function(response) {
      console.log('service posted', response);
      return response;
    });
  };
  sv.putItem = function(path, id, its) {
    console.log('its: ', its);
      return $http.put(path + id, its).then(function(response){
        console.log('service updated', response);
        return response;
      });
    };
  sv.deleteItem = function(path, id) {
      return $http.delete(path + '/'+ id).then(function(response){
        console.log('service deleted', response);
        return response;
      });
    };
});
