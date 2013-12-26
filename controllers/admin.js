// Generated by CoffeeScript 1.6.3
var EventProxy, User, check, config, sanitize;

User = require('../proxy').User;

check = require('validator').check;

sanitize = require('validator').sanitize;

EventProxy = require('eventproxy');

config = require('../config').config;

exports.before = function(req, res, next) {
  return next();
};

exports.homepage = function(req, res, next) {
  return res.render('admin/homepage');
};

exports.pages = function(req, res, next) {
  return res.render('admin/page');
};

exports.menu = function(req, res, next) {
  return res.render('admin/menu');
};

exports.menuNew = function(req, res, next) {
  return res.render('admin/menu-new');
};