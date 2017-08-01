var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../../services/user');
var User = require('../../models/user');

router.use(bodyParser.json());
router.use(
	bodyParser.urlencoded({
		extended: false
	})
);

router.get('/', function(req, res) {
	User.find(function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	});
});

router.post('/', function(req, res) {
	user.createUser(req.body.email, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	}); //end creat user
}); //end post

router.put('/:id', function(req, res) {
	console.log(req.params.id);
	console.log(req.body);
	var newValue = {
		phone: req.body.phone
	};
	User.findOneAndUpdate({
		_id: req.params.id
	}, newValue, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	});
});

router.delete('/:id', function(req, res) {
	User.findOneAndRemove({
		_id: req.params.id
	}, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.send(user);
	})
})

module.exports = router;
