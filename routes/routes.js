var index = require('../routes/index');
var login = require('../routes/login');
var register = require('../routes/register');
var post = require('../routes/post');
var api_post = require('../routes/api/post');

module.exports = function(app) {
	login(app);
	index(app);
	register(app);
	post(app);
	api_post(app);
};