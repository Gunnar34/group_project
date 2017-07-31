app.controller('InstructorController', InstuctorController);

function InstuctorController(httpService, AuthFactory, $window, $location) {
	const vm = this;

	vm.editB = function(i) {
		vm.users[i].edit = !vm.users[i].edit;
		vm.users[i].notEdit = !vm.users[i].notEdit;
	};

	vm.save = function(index) {
		vm.editB(index);
		let user = vm.users[index];
		httpService.putItem('private/instructor', user._id, {
			phone: user.phone
		}).then(function(res) {
			console.log(res);
		});
	};

	vm.deleteInsctructor = function(index) {
		console.log(vm.users[index]);
		httpService.deleteItem('private/instructor', vm.users[index]._id).then(function() {
			vm.getInstructors();
		})
	}

	httpService.getItem('auth').then(function(res) {
		if (res.data.name) {
			vm.admin = res.data.name.admin;
			vm.name = res.data.name.googleName;
		} else {
			alert('Please Login before viewing this page');
			$location.path('/');
		}
	});

	vm.addUser = function() {
		if (vm.email) {
			let itemToSend = {
				email: vm.email
			};
			httpService.postItem('private/instructor', itemToSend).then(function() {
				vm.email = undefined;
				vm.getInstructors();
			});
		} else {
			//end if
			alert('please enter an email before submitting');
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
