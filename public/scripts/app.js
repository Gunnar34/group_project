//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute', 'bc.AngularKeypad', 'xeditable']);

app.run(function(editableOptions) {
	editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

//routes
app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'public/view/partials/login.html',
		controller: 'AuthController',
		controllerAs: 'auth',
	}).when('/failure', {
		templateUrl: 'public/view/partials/failure.html',
		controller: 'AuthController',
		controllerAs: 'auth',
	}).when('/classes', {
		templateUrl: 'public/view/partials/classesDashboard.html',
		controller: 'ClassesController',
		controllerAs: 'cc'
	}).when('/students', {
		templateUrl: 'public/view/partials/studentDashboard.html',
		controller: 'StudentsController',
		controllerAs: 'sc'
	}).when('/instructor', {
		templateUrl: 'public/view/partials/instructor.html',
		controller: 'InstructorController',
		controllerAs: 'inc'
	}).when('/parent', {
		templateUrl: 'public/view/parent.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/emergencyContact', {
		templateUrl: 'public/view/parentQuestions/1-emergencyContact.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/selfCheckout', {
		templateUrl: 'public/view/parentQuestions/2-selfCheckOut.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/receiveTexts', {
		templateUrl: 'public/view/parentQuestions/3-receiveTexts.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/pinSystem', {
		templateUrl: 'public/view/parentQuestions/4-pinSystem.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/complete', {
		templateUrl: 'public/view/parentQuestions/5-complete.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/checkoutError', {
		templateUrl: 'public/view/parentQuestions/checkoutError.html',
		controller: 'ParentController',
		controllerAs: 'pc'
	}).when('/stats', {
		templateUrl: 'public/view/partials/stats.html',
		controller: 'StatsController',
		controllerAs: 'sc'
	});

}); //end config

app.filter('tel', function() {
	return function(tel) {
		if (!tel) {
			return '';
		}

		var value = tel.toString().trim().replace(/^\+/, '');

		if (value.match(/[^0-9]/)) {
			return tel;
		}

		var country, city, number;

		switch (value.length) {
			case 1:
			case 2:
			case 3:
				city = value;
				break;

			default:
				city = value.slice(0, 3);
				number = value.slice(3);
		}

		if (number) {
			if (number.length > 3) {
				number = number.slice(0, 3) + '-' + number.slice(3, 7);
			} else {
				number = number;
			}

			return ("(" + city + ") " + number).trim();
		} else {
			return "(" + city;
		}

	};
});

app.directive('phoneInput', function($filter, $browser) {
	return {
		require: 'ngModel',
		link: function($scope, $element, $attrs, ngModelCtrl) {
			var listener = function() {
				var value = $element.val().replace(/[^0-9]/g, '');
				$element.val($filter('tel')(value, false));
			};

			// This runs when we update the text field
			ngModelCtrl.$parsers.push(function(viewValue) {
				return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
			});

			// This runs when the model gets updated on the scope directly and keeps our view in sync
			ngModelCtrl.$render = function() {
				$element.val($filter('tel')(ngModelCtrl.$viewValue, false));
			};

			$element.bind('change', listener);
			$element.bind('keydown', function(event) {
				var key = event.keyCode;
				// If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
				// This lets us support copy and paste too
				if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
					return;
				}
				$browser.defer(listener); // Have to do this or changes don't get picked up properly
			});

			$element.bind('paste cut', function() {
				$browser.defer(listener);
			});
		}

	};
});
