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
os = require 'os'
# md = require('showdown')
# converter = new md.converter()

# 查看是否登录
checkAdmin = (req,res,next)->
	res.locals.company = 
		freemem:os.freemem()
		totalmem:os.totalmem()
		arch:os.arch()
		type:os.type()
		endianness:os.endianness()
		cpus:os.cpus() 
	if req.session.is_admin && req.cookies.user
		res.locals.avatar = Ut.avatar req.session.email,26
		res.locals.username = req.session.username
		res.locals.userid = req.session.userid
		next()
		return yes
	else if req.cookies.user
		bk = Ut.decrypt req.cookies.user,'giccoo'
		Uinfo = bk.split '\t'
		User.getUserById Uinfo[0], (err,user)->
			# console.log "here?",user
			if user? && user.is_admin? && user.is_admin
				req.session.is_admin = true
				req.session.userid = user._id
				req.session.username = user.name 
				req.session.email = user.email

				res.locals.avatar = Ut.avatar user.email,26
				res.locals.username = user.name
				res.locals.userid = user._id 
				next()
				# res.redirect '/sign/in'
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