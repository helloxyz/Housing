var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../models/user');         //JFT

var postArchiveSchema = new Schema({
	archiveName: {type: String},
	describe: {type: String},
	thumbnail: {type: String}
});

var postDetailSchema = new Schema({
	id: {type: String},
	title: {type: String},
	slug: {type: String},
	content: {type: String},
	content_html: {type: String},
	created_at: {type: Date},
	updated_at: {type: Date},
	tags: {type: String},
	refArchive: {type: ObjectId, ref:'postArchive'},
	postedBy: {type: ObjectId, ref:'user'}
});

postDetailSchema.pre('save', function(next, done){ 
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

postDetailSchema.statics.findAll = function(cb) {
	this.find({}, cb)
	    .populate('postedBy');
}

postDetailSchema.statics.findOneByID = function(id, cb) {
    this.findOne({id:id}, cb);
}
 
postDetailSchema.statics.updatePost = function(doc, cb) {
	if (doc.id == undefined) {
		this.count({}, function(err, count) {
		  var now = new Date();
		  var date = dateFormat(now, "yyyymmddhhMMss");
	      doc.id = date + count;
	      doc.tag = '1111111';
	      User.findByUserName('123', function(err, user) {
	      	doc.postedBy = user._id;
	      });
	      var aa = new postDetailSchema(doc);
	      aa.save(cb);
	      /*mongoose.model('post').save(function (err, doc, numberAffected) {
	      	if(err) {
	      		console.log(err);
	      	}
	      });*/
		  //this.update({id:doc.id}, {$set : doc}, {upsert: true}, cb);
		});
	} else {
		this.update({id:doc.id}, {$set : doc}, {upsert: true}, cb);
	}
}

module.exports = mongoose.model('post', postDetailSchema);

//mongoose.model('postArchive', postArchiveSchema);
//mongoose.model('post', postDetailSchema);

//http://www.ccpt.cc/using-summernote-with-nodejs/

    
