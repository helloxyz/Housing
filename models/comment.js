var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
	post_id: {type: ObjectId, ref:'post'},
	post_slug: {type: String},
	author: {type: ObjectId, ref:'user'},
	content: {type: String},
	created: {type: Date, default: Date.now}
});

commentSchema.pre('save', function(next, done){ 
  next(); 
});

mongoose.model('comment', commentSchema);