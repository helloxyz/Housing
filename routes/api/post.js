var mongoose = require('mongoose');
var Post = require('../../models/post');

module.exports = function(app) {
  app.get('/api/posts', function(req, res){	
  	Post.findAll(function(err, posts) {
  	  if(err) {
  	  	console.log(err);
  	  }
  	  res.json(posts);
  	});
  });
}