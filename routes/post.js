var mongoose = require('mongoose');
var Post = require('../models/post');

module.exports = function(app) {
	app.get('/post/new', function(req, res) {
	  console.log('[post new get]');
	  res.render('post/new', {title: '发帖'});
  });

  app.post('/post/new', function(req, res) {
	  var doc = req.body;
    console.log(doc);
    Post.updatePost(doc, function(err, n, r) {
      if (err) {
        res.json({'text':'update failed','code':false});
      } else {
        res.json({'text':'update successfully','code':true});
      }  
    });
  });

  app.get('/post/:id', function(req, res) {
    console.log('[/post/:id]');
    Post.findOneByID(req.params.id, function(err, post) {
      if(err) {
        res.send(err);
      } else {
        res.render('post/view', {doc: post});
      }      
    });
  });
 }