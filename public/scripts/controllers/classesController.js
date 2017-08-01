app.controller('ClassesController', function(httpService, $location) {
	console.log('loaded CC');

	//make sure its an authorized user
	httpService.getItem('auth').then(function(res) {
		if (res.data.name) {
			console.log(res.data.name);
			vm.admin = res.data.name.admin;
			vm.name = res.data.name.googleName;
			vm.userId = res.data.name._id;
			if (!res.data.name.phone) {
				setTimeout(function() {
					document.getElementById('addPhoneNumber').style.display = 'block';
				}, 600);
			}
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
	});

	//vars
	var vm = this;
	vm.inputNumber = [0];
	var number = 1;
	vm.instructorsUP;
	localStorage.setItem('classView', false);
	localStorage.setItem('notParentView', true);
	vm.gradesRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	var showToast = function(message, duration){
		Materialize.toast(message, duration);
	};//end showToast

	vm.addInput = function() {
		vm.inputNumber.push(number);
		number++;
	}; //end addInput //allows adding instructor inputs

	vm.subInput = function() {
		if (vm.inputNumber.length > 1) {
			vm.inputNumber.pop();
		}
	}; //end subInput //allows removing an instructor input

	window.onclick = function(event) {
		let id = event.target.getAttribute('id');
		if (event.target.getAttribute('class') == 'modal') {
			document.getElementById(id).style.display = 'none';
		}
	}; //end window.onclick //allows clicking outside the modal to close

	vm.savePhone = function() {
		let its = {
			phone: vm.phone
		}
		httpService.putItem('/private/instructor', vm.userId, its).then(function(res) {
			console.log(res);
			document.getElementById('addPhoneNumber').style.display = 'none';
			showToast('Saved', 1500);
		});
	};

	vm.editClass = function(index) {
		vm.id = vm.classesArray[index]._id;
		vm.gradesUP = vm.classesArray[index].grades;
		vm.subjectUP = vm.classesArray[index].subject;
		vm.startDateUP = vm.classesArray[index].startDate;
		vm.endDateUP = vm.classesArray[index].endDate;
		vm.startTimeUP = vm.classesArray[index].startTime;
		vm.endTimeUP = vm.classesArray[index].startTime;
		vm.locationUP = vm.classesArray[index].location;
		vm.instructorsUP = vm.classesArray[index].instructors;
		document.getElementById('editClass').style.display = 'block';
	};

	vm.addEditInput = function() {
		vm.instructorsUP.push({
			instructor: ''
		});
	}; //end addEditInput

	vm.subEditInput = function() {
		if (vm.instructorsUP.length > 1) {
			vm.instructorsUP.pop();
		}
	}; //end subEditInput

	vm.saveEdit = function() {
		let itemToSend = {
			grades: vm.gradesUP,
			subject: vm.subjectUP,
			startDate: vm.startDateUP,
			endDate: vm.endDateUP,
			startTime: vm.startTimeUP,
			endTime: vm.endTimeUP,
			location: vm.locationUP,
			instructors: vm.instructorsUP
		};
		httpService.putItem('/private/classes/classes', vm.id, itemToSend).then(function() {
			vm.populateClasses();
			document.getElementById('editClass').style.display = 'none';
			showToast('Edit Saved', 1500);
		});
	}; //end saveEdit

	vm.addClass = function() {

		let instructorsArray = [];
		for (var i = 0; i < vm.inputNumber.length; i++) {
			let instructorName = vm.instructor[i];
			instructorsArray.push({
				instructor: instructorName
			});
		}
		let objectToSend = {
			grades: vm.gradesArray,
			location: vm.location,
			subject: vm.subject,
			startDate: vm.startDate,
			endDate: vm.endDate,
			startTime: vm.startTime,
			endTime: vm.endTime,
			instructors: instructorsArray,
			students: []
		};
		console.log(objectToSend);
		httpService.postItem('private/classes/classes', objectToSend).then(function(res) {
			console.log(res);
			vm.populateClasses(); //repopulate classes in table
		}); //end then function
		document.getElementById('addClass').style.display = 'none'; //close modal
		document.getElementById('addClassForm').reset();
		vm.inputNumber = [0];
	}; //end addClass

	vm.populateClasses = function() {
		console.log('in populateClasses');
		httpService.getItem('private/classes/classes').then(function(res) {
			vm.classesArray = res.data[0];
		}); //end http get popClasses
	}; //end populateClasses

	vm.removeClass = function(id) {
		swal({
			title: 'Are you sure you want to delete this class?',
			text: "You won't be able to undo this!",
			imageUrl: 'public/assets/images/abamath.png',
			imageWidth: 150,
			imageHeight: 150,
			animation: true,
			showCancelButton: true,
			confirmButtonColor: '#2196f3',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(function() {
			httpService.deleteItem('/private/classes', id).then(function(res) {
				console.log('deleted', res);
				vm.populateClasses();
			}); //end deleteItem
			// swal({
			// 	title: 'Deleted!',
			// 	text: "The class was deleted",
			// 	imageUrl: 'public/assets/images/abamath.png',
			// 	imageWidth: 150,
			// 	imageHeight: 150,
			// 	animation: false
			// });
			showToast('Class Deleted', 2000);
		});
	}; //end remove class

	vm.classView = function(x) {
		console.log(x); //takes the class Id that was clicked and stores it
		localStorage.setItem('classID', x);
		$location.path('/students');
		localStorage.setItem('classView', true);
	}; //end classView

});
