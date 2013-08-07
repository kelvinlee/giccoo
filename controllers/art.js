var User = require('../proxy').User;
var Art = require('../proxy').Art;
var ArtTag = require('../proxy').ArtTag;

var check = require('validator').check;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');
var config = require('../config').config;

//var md = require('showdown').Markdown;

exports.before = function(req,res, next) { 
  // var user = db.users[req.params.user_id];
  // if (!user) { return next(); }
  next();
};
exports.homepage = function(req,res, next) {
  res.render('homepage');
}