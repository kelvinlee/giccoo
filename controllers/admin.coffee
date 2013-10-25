User = require('../proxy').User
# Art = require('../proxy').Art
# ArtTag = require('../proxy').ArtTag

check = require('validator').check
sanitize = require('validator').sanitize
EventProxy = require('eventproxy')
config = require('../config').config

#var md = require('showdown').Markdown

exports.before = (req,res, next)->
	# var user = db.users[req.params.user_id];
	# if (!user) { return next(); }
	next()

exports.homepage = (req,res, next)->

	res.render 'admin/homepage'

exports.pages = (req,res, next)->
	res.render 'admin/page'

# Here for menu
exports.menu = (req,res, next)->
	res.render 'admin/menu'
exports.menuNew = (req,res, next)->
	res.render 'admin/menu-new'