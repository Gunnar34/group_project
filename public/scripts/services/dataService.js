app.service('dataService', function(){
  console.log('in the ParentService');
  const sv = this;
// the class._id from db so we can keep track of where we are
  sv.currentClass;
});//end parent service
