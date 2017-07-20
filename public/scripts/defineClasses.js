class Student {

  constructor(classID, grade) {
    this.grade = grade;
    this.studentId = classID + '$' + new Date();
    this.emergencyInfo = [];
  } // end constructor
}
function eContact(name, phone) {
  return {
  name,
  phone
  };
}
