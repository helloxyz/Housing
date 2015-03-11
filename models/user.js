var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	username: {type: String, index: {unique: true}},
	password: {type: String, required: true},
	email: {type: String, lowercase: true, required: false, unique: false},
	date: {type: Date, default: Date.now}
});

userSchema.plugin(passportLocalMongoose);

/*userSchema.pre('save', function(next, done){ 
  console.log('pre save user');
  next(); 
});*/


userSchema.statics.findByUserName = function(name, callback) {
	this.findOne({username: name}, callback);
};

module.exports = mongoose.model('user', userSchema);