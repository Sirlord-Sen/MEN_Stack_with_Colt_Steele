var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// plugin for passport-local-mongoose
// This takes the passport local mongoose and gives it a bunch of methods
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);