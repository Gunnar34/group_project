/**
 * A service layer that makes all of our User database queries.
 *
 * @module services/user
 *
 * @function findUserById finds a User by their unique Mongo id
 * @function findUserByGoogleId finds a User by their Google id
 * @function create a User that will be authenticated by Google
 */
/*global require*/
/*global module*/
/*eslint no-undef: "error"*/
var User = require('../models/user');

var UserService = {
  findUserById: function (id, callback) {
    User.findById(id, function (err, user) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },

  findUserByGoogleId: function (id, callback) {
    User.findOne({ googleId: id }, function (err, user) {

      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },

  createGoogleUser: function (id, token, name, email, callback) {
    var user = new User();

    user.googleId = id;
    user.googleToken = token;
    user.googleName = name;
    user.googleEmail = email;

    user.save(function (err) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, user);
    });
  },
};

module.exports = UserService;

//
//
// var UserService = {
// 	findUserById: function(id, callback) {
// 		User.findById(id, function(err, user) {
// 			if (err) {
// 				return callback(err, null);
// 			}
//
// 			return callback(null, user);
// 		});
// 	},
//
// 	findUserByGoogleId: function(id, callback) {
// 		User.findOne(
// 			{
// 				googleId: id
// 			},
// 			function(err, user) {
// 				if (err) {
// 					return callback(err, null);
// 				}
//
// 				return callback(null, user);
// 			}
// 		);
// 	},
//
// 	createGoogleUser: function(id, token, name, email, callback) {
// 		var user = {
// 			$set: {
// 				googleId: id,
// 				googleToken: token,
// 				googleName: name
// 			}
// 		};
// 		User.findOneAndUpdate(
// 			{
// 				googleEmail: email
// 			},
// 			user,
// 			function(err, user) {
// 				if (err) {
// 					return callback(err, null);
// 				}
//
// 				return callback(null, user);
// 			}
// 		);
// 	},
//
// 	// findUserByEmail: function(email, callback) {
// 	// 	console.log(email);
// 	// 	User.findOne(
// 	// 		{
// 	// 			googleEmail: email
// 	// 		},
// 	// 		function(err, user) {
// 	// 			if (user === null || err) {
// 	// 				console.log(user, err);
// 	// 				return callback(user, err);
// 	// 			}
// 	// 			console.log('callback', user);
// 	// 			return callback(null, user);
// 	// 		}
// 	// 	);
// 	// },
//
// 	createUser: function(req, callback) {
// 		var user = new User();
//
// 		user.googleEmail = req.email;
// 		user.googleName = req.name;
//
// 		user.save(function(err) {
// 			if (err) {
// 				return callback(err, null);
// 			}
//
// 			return callback(null, user);
// 		});
// 	}
// };
//
// module.exports = UserService;
