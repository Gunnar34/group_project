app.controller('InstructorController', InstuctorController);

function InstuctorController(httpService, AuthFactory, $window, $location) {
	const vm = this;
	vm.edit = false;
	vm.notEdit = true;

	vm.editB = function() {
		vm.edit = !vm.edit;
		vm.notEdit = !vm.notEdit;
	};

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
		});
	};
} //end InstuctorController
