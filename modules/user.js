var mongoose = require( 'mongoose' );

mongoose.connect( 'localhost:/27017/abaclasses' );
var userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String
});

var userModel = mongoose.model( 'userModel', userSchema );

module.exports = userModel;
