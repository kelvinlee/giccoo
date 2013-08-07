var config = require('../config').config;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var crypto = require('crypto');
var EventProxy = require('eventproxy');


exports.gitpull = function(req,res, next) {
  // console.log(req.body.payload);
  var json = JSON.parse(req.body.payload);
  console.log(json.head_commit);
  // next();
}