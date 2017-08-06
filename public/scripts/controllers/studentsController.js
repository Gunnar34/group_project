app.controller('StudentsController', function($http, dataService, httpService, $location) {
	//conts
	const vm = this;
	const ds = dataService;
	const hs = httpService;
	//vm's
	vm.data = '';
	vm.studentsArray = [];
	vm.currentID = localStorage.getItem('classID');
	localStorage.setItem('notParentView', true);
	vm.emergencyInfo = [];
	vm.currentClass;
	vm.currentStudentID;
	vm.gradesRange = []
	vm.goToParent = function() {
		$location.path('/parent');
	};

	var showToast = function(message, duration) {
		Materialize.toast(message, duration);
	}; //end showtoast function

	window.onclick = function(event) {
		id = event.target.getAttribute("id");
		if (event.target.getAttribute("class") == 'modal') {
			document.getElementById(id).style.display = 'none';
		} //end if
	}; //end window onclick

	hs.getItem('auth').then(function(res) {
		if (res.data.name) {
			vm.admin = res.data.name.admin;
			vm.name = res.data.name.googleName;
		} else {
			swal({
        title: 'Oops!',
        text: "Please login to continue",
        imageUrl: 'public/assets/images/abamath.png',
        imageWidth: 150,
        imageHeight: 150,
        animation: false
      });
      $location.path('/');
    }
	}); //end httpService get item

	vm.displayClass = function() {
		hs.getWithID('/private/students', vm.currentID).then(function(res) {
			vm.studentsArray = res.data.students;
			vm.currentClass = res.data;
			vm.gradesRange = vm.currentClass.grades.split(',')
		}); //end get withId
	}; //end displayClass

	//ng-init display call
	vm.displayClass();

	// adds student to class array in db
	vm.addStudent = function() {
		//creates item to send
		var itemToSend = new Student(vm.currentID, vm.firstName, vm.lastName, vm.grade, vm.emergencyName, vm.emergencyPhone, vm.emergencyRelation);
		hs.putItem('/private/students', vm.currentID, itemToSend).then(function(res) {
			//call to update
			vm.displayClass();
			document.getElementById('addStudentForm').reset();
			document.getElementById('addStudent').style.display = 'none';
		});
	}; //end add student


	vm.setId = function(id) {
		vm.currentStudent = id;
		vm.id = vm.currentStudent.studentID;
		vm.firstNameUp = vm.currentStudent.firstName;
		vm.lastNameUp = vm.currentStudent.lastName;
		vm.gradeUp = vm.currentStudent.grade;
		vm.emergencyNameUp = vm.currentStudent.emergencyName;
		vm.emergencyPhoneUp = vm.currentStudent.emergencyPhone;
		vm.emergencyRelationUp = vm.currentStudent.emergencyRelation;
	}; //end setID

	vm.editStudent = function() {
		let objectToSend = {
			id: vm.id,
			firstName: vm.firstNameUp,
			lastName: vm.lastNameUp,
			grade: vm.gradeUp,
			emergencyName: vm.emergencyNameUp,
			emergencyPhone: vm.emergencyPhoneUp,
			emergencyRelation: vm.emergencyRelationUp,
			checkedIn: vm.currentStudent.checkedIn,
			selfCheck: vm.currentStudent.selfCheck,
			usePin: vm.currentStudent.usePin,
			pin: vm.currentStudent.pin,
			receiveTexts: vm.currentStudent.receiveTexts,
			initialized: vm.currentStudent.initialized
		};
		hs.putItem('/private/students/edit', objectToSend.id, objectToSend);
		document.getElementById('editStudent').style.display = 'none';
		vm.displayClass();
	}; //end edit students

	vm.viewEmergency = function(id) {
		httpService.getWithID('/private/students/emergencyInfo', id).then(function(res) {
			vm.studentName1 = res.data.firstName + ' ' + res.data.lastName;
			vm.emergencyName1 = res.data.emergencyName;
			vm.emergencyRelation1 = res.data.emergencyRelation;
			vm.emergencyPhone1 = res.data.emergencyPhone;
		}); //end .then

	}; //end viewEmrgency

	hs.getItem('/private/students').then(function(response) {
		if (response.data.err) {
			vm.data = 'Sorry, you are not logged in!';
		} else {
			vm.data = response.data.message;
		} //end else
	}); //end displayClass


	vm.deletStudents = function(id) {
		swal({
			title: 'Are you sure you want to delete this student?',
			text: "You won't be able to undo this!",
			imageUrl: 'public/assets/images/abamath.png',
			imageWidth: 150,
			imageHeight: 150,
			animation: true,
			showCancelButton: true,
			confirmButtonColor: '#2196f3',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			allowOutsideClick: true
		}).then(function() {
			hs.deleteItem('/private/students', id).then(function(res) {
				vm.displayClass();
				// swal({
				// 	title: 'Deleted!',
				// 	text: "The student was deleted",
				// 	imageUrl: 'public/assets/images/abamath.png',
				//   animation: true,
				// 	imageWidth: 150,
				// 	imageHeight: 150,
				// });
				showToast('Student Deleted', 2000)
			}); //end deleteItem
		});
	}; //end delete students

	vm.toggleCheckIn = function(studentArrayToCheckIn, str) {
		its = {
			command: str
		};
		id = studentArrayToCheckIn[0].studentID;
		parentID = id.split('$', 1);
		hs.putItem('private/students/togglecheckout', parentID[0], its).then(function(res) {
			vm.displayClass();
		});
	}; //end checkinall


}); //end student controller









//spacer
