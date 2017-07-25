class Student {

  constructor(parentID, firstName, lastName, grade) {
    this.studentId = parentID + '$' + new Date();//change to dat now
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = grade;
    this.emergencyInfo = [];
  } // end constructor
}

function eContact(name, phone, relation ) {
  return {
  name,
  phone,
  relation
  };
}
