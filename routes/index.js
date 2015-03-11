var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(app) {
	/* Get Home Page. */
	/*app.get('/', function(req, res){  
  		User.find({}, function (err,users) {  
  			res.render('index', { title: 'Housing Web Index Page',users:users });  
  		});
  	});*/
  app.get('/', function(req, res) {
    res.render('index', {});
  });

  app.get('/:username', function (req, res) {
  	User.findByUserName(req.params.username, function(err, user) {
  	  if(err) {
  		console.log(err);
  	  }
      if(user) {
  		res.render('index', { user : user });
  	  }
  	  else {
  	  	res.render('index', {});
  	  }			
  	});      
  });
};
