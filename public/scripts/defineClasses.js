class Student {

  constructor(parentID, firstName, lastName, grade, emergencyInfo) {
    this.studentId = parentID + '$' + new Date();//change to dat now
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = grade;
    this.selfCheck = false;
    this.receiveTexts = false;
    this.usePin = false;
    this.pin = null;
    this.checkedIn = false;
    this.emergencyInfo = emergencyInfo;
  } // end constructor
}

function eContact(name, phone, relation ) {
  return {
  name,
  phone,
  relation
  };
}
