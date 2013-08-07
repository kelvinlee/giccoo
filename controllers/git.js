var config = require('../config').config;
var EventProxy = require('eventproxy');

exports.before = function(req,res, next) { 
  // var user = db.users[req.params.user_id];
  // if (!user) { return next(); }
  // console.log(req.body);
  next();
};
exports.pull = function(req,res, next) {
  // console.log(req.body);
  console.log("content");
  // next();
}