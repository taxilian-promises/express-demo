var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/users', function(req, res) {
  res.sendResponse();
});

module.exports = router;

