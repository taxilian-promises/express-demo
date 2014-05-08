var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailValidate = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

var userSchema = new Schema({
    email: {type: String, required: false, index: true, lowercase: true, match: emailValidate},
    password: {type: String, required: false},
    first: {type: String, required: true},
    last: {type: String, required: true}
});

mongoose.model('User', userSchema);
