var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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
	Created: {type: Date, default: Date.now},
	tags: {type: String},
	refArchive: {type: ObjectId, ref:'postArchive'}
});

postDetailSchema.pre('save', function(next, done){ 
  next(); 
});

postDetailSchema.statics.findAll = function(cb) {
	this.find({}, cb);
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
		  mongoose.model('post').update({id:doc.id}, {$set : doc}, {upsert: true}, cb);
		});
	} else {
		this.update({id:doc.id}, {$set : doc}, {upsert: true}, cb);
	}
}

module.exports = mongoose.model('post', postDetailSchema);

//mongoose.model('postArchive', postArchiveSchema);
//mongoose.model('post', postDetailSchema);

//http://www.ccpt.cc/using-summernote-with-nodejs/

    
