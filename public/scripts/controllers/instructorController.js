app.controller('InstructorController', InstuctorController);

function InstuctorController(httpService, AuthFactory, $window, $location) {
	const vm = this;
	localStorage.setItem('notParentView', true);
	localStorage.setItem('classView', false);

	var showToast = function(message, duration) {
		Materialize.toast(message, duration);
	}; //end showtoast function

	vm.editB = function(i) {
		vm.users[i].edit = !vm.users[i].edit;
		vm.users[i].notEdit = !vm.users[i].notEdit;
	};

	vm.save = function(index) {
		vm.editB(index);
		let user = vm.users[index];
		httpService.putItem('private/instructor', user._id, {
			phone: user.phone,
			googleName: user.googleName
		}).then(function(res) {
			showToast('Edits saved!', 1500)
		});
	};

	vm.deleteInsctructor = function(index) {
		swal({
			title: 'Are you sure you want to delete this instructor?',
			text: "You won't be able to undo this!",
			imageUrl: 'public/assets/images/abamath.png',
			imageWidth: 150,
			imageHeight: 150,
			animation: false,
			showCancelButton: true,
			confirmButtonColor: '#2196f3',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(function() {
			httpService.deleteItem('private/instructor', vm.users[index]._id).then(function() {
				vm.getInstructors();
				showToast('Instuctor Deleted', 2000);
			});
		})
	};

	httpService.getItem('auth').then(function(res) {
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
	});

	vm.closeModal = function(){
		vm.instEmail = '';
		vm.instName = undefined;
		console.log(vm.instEmail, vm.instName);
		document.getElementById('addInstructor').style.display = 'none'
	}

	vm.addUser = function() {
		if (vm.instEmail != undefined && vm.instName != undefined) {
			let itemToSend = {
				email: vm.instEmail,
				name: vm.instName
			};
			httpService.postItem('private/instructor', itemToSend).then(function() {
				vm.closeModal();
				vm.getInstructors();
				showToast('Instuctor Added', 1500);
			});
		} else {
			//end if
			showToast('Please fill out fields before submitting', 1500);
		}
	};

	vm.getInstructors = function() {
		httpService.getItem('private/instructor').then(function(res) {
			vm.users = res.data;
			for (var i = 0; i < vm.users.length; i++) {
				vm.users[i].edit = false;
				vm.users[i].notEdit = true;
			}
		});
	};
} //end InstuctorController
