var index = require('../routes/index');
var login = require('../routes/login');
var register = require('../routes/register');
var post = require('../routes/post');

module.exports = function(app) {
	login(app);
	index(app);
	register(app);
	post(app);
};