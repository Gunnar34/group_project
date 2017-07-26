app.service('dataService', function(){
  console.log('in the dataService, used to be ParentService');
  const sv = this;

  sv.currentClass;

  sv.index = '';

  sv.dummyKid = {
    studentid: 30,
    firstName: 'Peeta',
    lastName: 'Mellark',
    grade: '4th',
    emergencyName: 'Katniss Everdeen',
    emergencyPhone: '763-555-1234',
    emergencyRelation: "It's complicated"
  };//this can be deleted just dummy data

  sv.dummyKid2 = {
    studentid: 30,
    firstName: 'Snorgarml',
    lastName: 'Blarginton',
    grade: '3rd',
    emergencyName: 'Binshwagn Blickinonigan',
    emergencyPhone: '612-555-7878',
    emergencyRelation: "Father-Figure"
  }; //this can be deleted just dummy data

  sv.studentArray = [];
  sv.studentArray.push(sv.dummyKid); //this can be deleted just dummy data
  sv.studentArray.push(sv.dummyKid2); //this can be deleted just dummy data
});//end dataService
