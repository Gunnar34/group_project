var mongoose = require( 'mongoose' );


var logDataSchema = new mongoose.Schema({
     user: String,
     inOrOut: String,
     date: Date

 });

 var logData = mongoose.model('logData', logDataSchema);
 module.exports = logData;
