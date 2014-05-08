var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var emailValidate = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

var commentSchema = new Schema({
    user: {type: ObjectId, ref: "User", required: true, index: true},
    text: {type: String},
    created: {type: Date, "default": Date.now, index: true},
    modified: {type: Date, "default": Date.now}
});

commentSchema.pre("save", function(next, done) {
    this.modified = new Date();
    next();
});

mongoose.model('Comment', commentSchema);
