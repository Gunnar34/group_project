var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require('./routes/index');
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var database = require('./utils/database');
var port = process.env.PORT || 3000;
var http = require("http");
// ping abacall
setInterval(function() {
    http.get("http://hostabacall.herokuapp.com");
    console.log('ping');
}, 120000); // every 2 minutes (120000)
//uses
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
database();
app.use(
	session({
		secret: configs.sessionVars.secret,
		key: 'user',
		resave: 'true',
		saveUninitialized: false,
		cookie: { maxage: 60000, secure: false }
	})
);
app.use(passport.initialize());
app.use(passport.session());
//use routes
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);

app.listen(port, function() {
	console.log('server 3000');
});
