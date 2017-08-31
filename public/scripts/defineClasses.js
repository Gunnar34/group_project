class Student {

  constructor(parentID, firstName, lastName, grade, emergencyName, emergencyPhone, emergencyRelation) {
    this.studentID = parentID + '$' + new Date();//change to date now
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = grade;
    this.emergencyName = emergencyName;
    this.emergencyPhone = emergencyPhone;
    this.emergencyRelation = emergencyRelation;
    this.selfCheck = false;
    this.receiveTexts = false;
    this.usePin = false;
    this.pin = null;
    this.checkedIn = 'false';
    this.initialized = false;

  } // end constructor
}
