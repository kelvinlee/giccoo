User = require('../proxy').User
Menu = require('../proxy').Menu
Work = require('../proxy').Work
TagWork = require('../proxy').TagWork
# Art = require('../proxy').Art
# ArtTag = require('../proxy').ArtTag
fs = require 'fs'
Ut = require '../lib/util'
check = require('validator').check 
EventProxy = require('eventproxy')
config = require('../config').config

#var md = require('showdown').Markdown

# 查看是否登录
checkAdmin = (req,res,next)->
	if req.session.is_admin && req.cookies.user
		next()
		return yes
	else if req.cookies.user
		bk = Ut.decrypt req.cookies.user,'giccoo'
		Uinfo = bk.split '\t'
		User.getUserById Uinfo[0], (err,user)->
			if user.is_admin
				req.session.is_admin = true
				req.session.userid = Uinfo[0]
				req.session.email = Uinfo[2]
				next()
			else
				res.redirect '/sign/in'
	else 
		res.redirect '/sign/in'
	no
exports.before = (req,res,next)->
	# Description...
	res.locals.active = ["dashboard"]
	checkAdmin req,res,next

# Dashboard
exports.homepage = (req,res,next)->
	checkAdmin req,res, ->
		res.render 'admin/homepage'



# @codekit-append "admin-work.coffee";
# @codekit-append "admin-worktag.coffee";
# @codekit-append "admin-pages.coffee";
# @codekit-append "admin-menu.coffee";
# @codekit-append "admin-user.coffee";
# @codekit-append "admin-files.coffee";