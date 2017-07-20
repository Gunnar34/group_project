var mongoose = require( 'mongoose' );

mongoose.connect('localhost:/27017/abaclasses');

var classSchema = new mongoose.Schema({
    grades: String,
    location: String,
    subject: String,
    startDate: Date,
    endDate: Date,
    startTime: String,
    endTime: String,
    instructors: Array,
    students: Array
});

var classes = mongoose.model('abaclasses', classSchema);
module.exports = classes;
