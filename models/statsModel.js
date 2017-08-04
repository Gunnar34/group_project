var mongoose = require( 'mongoose' );


var classStatSchema = new mongoose.Schema({
     location: String,
     classID: String,
     subject: String,
     startDate: Date,
     endDate: Date,
     events: Array
 });

 var classStat = mongoose.model('statclasses', classStatSchema);
 module.exports = classStat;
