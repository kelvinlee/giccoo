// Generated by CoffeeScript 1.6.3
var EventProxy, User, Ut, Work, check, checkAdmin, config;

User = require('../proxy').User;

Work = require('../proxy').Work;

check = require('validator').check;

EventProxy = require('eventproxy');

config = require('../config').config;

Ut = require('../lib/util');

checkAdmin = function(req, res) {
  if (req.session.is_admin) {
    return true;
  } else {
    res.render('404');
  }
  return false;
};

exports.homepage = function(req, res) {
  console.log("work");
  res.render('work');
  return false;
};
