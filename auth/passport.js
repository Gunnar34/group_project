/**
 * We configure our instance of passport in this file.
 * We must specify:
 * (1) How the user will be serialized (i.e., what data will be made
 * available in a session)
 * (2) How the user will be deserialized (i.e., how do we find the user based
 * on the data available in our session)
 *
 * In addition, we define our authentication strategy in this file.
 *
 * @module auth/passport
 */
/** ---------- REQUIRE NODE MODULES ---------- **/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
// var config = require('../config/auth');

// all db queries moved to a service layer, necessary for proper unit testing
var logData = require('../models/log.js');
var UserService = require('../services/user');
/** ---------- PASSPORT SESSION SERIALIZATION ---------- **/

// serialize the user onto the session
passport.serializeUser(function(user, done) {
  console.log('user', user);
  objectToSave = {
    user: user.googleName,
    inOrOut: 'IN',
    date: new Date()
  };
  logData.create(objectToSave, function(err) {
    console.log('err', err);
    if (err) return handleError(err);
    done(null, user.id);
  });
});

// deserialize the user from the session and provide user object
passport.deserializeUser(function(id, done) {
  UserService.findUserById(id, function(err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});
/** ---------- PASSPORT STRATEGY DEFINITION ---------- **/
passport.use('google', new GoogleStrategy({
  // identify ourselves to Google and request Google user data
  clientID: process.env.clientId,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackUrl,
}, function(token, refreshToken, profile, done) {
  // Google has responded
  // does this user exist in our database already?
    UserService.findUserByGoogleId(profile.id, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) { // user does exist!
          return done(null, user);
        }

        // user does not exist in our database, let's create one!
        UserService.createGoogleUser(profile.id, token, profile.displayName,
          profile.emails[0].value, /* we take first email address */
          function (err, user) {
            if (err) {
              return done(err);
            }

            return done(null, user);
          });
      });

  }));

  module.exports = passport;
//   // does this user exist in our database already?
//   UserService.findUserByGoogleId(profile.id, function(err, user) {
//
//     if (err) {
//       return done(err);
//     }
//
//     if (user) { // user does exist!
//       console.log('fubgi',user);
//       return done(null, user);
//
//     }
//
//     // user does not exist in our database, let's create one!
//     // UserService.findUserByEmail(profile.emails[0].value, function(err, user) {
//     //   if (user === null || err) {
//     //     return done(err);
//     //   }
//       UserService.createGoogleUser(profile.id, token, profile.displayName,
//         profile.emails[0].value, /* we take first email address */
//         function(err, user) {
//           if (err) {
//             return done(err);
//           }
//           console.log('cgu', user);
//           return done(null, user);
//         });
//     });
//
//   // });
// }));
//
// module.exports = passport;
