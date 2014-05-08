var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Q = require('q'),
    Comment = mongoose.model('Comment');


function getUserByEmail(email) {
    return User.findOne({email: email.toLowerCase()}).exec();
}
function getCommentsForUser(user) {
    return Q.when(user).then(function(user) {
        if (!user) { return null; }
        return Comment.find({user: user}).exec();
    });
}

/* GET home page. */
router.get('/users', function(req, res) {
    var userList = User.find().exec();
    res.sendResponse(userList);
});

router.get('/users/:email', function(req, res) {
    var user = getUserByEmail(req.params.email);
    res.sendResponse(user);
});

router.get('/users/:email/comments', function(req, res) {
    var userDfd = getUserByEmail(req.params.email);
    var comments = getCommentsForUser(userDfd);

    res.sendResponse(comments);
});

module.exports = router;

