User = require('../proxy').User
Menu = require('../proxy').Menu
# Art = require('../proxy').Art
# ArtTag = require('../proxy').ArtTag

check = require('validator').check
sanitize = require('validator').sanitize
EventProxy = require('eventproxy')
config = require('../config').config

#var md = require('showdown').Markdown

checkAdmin = (req,res)->
	if req.session.is_admin
		return yes
	else
		res.render '404'
	no

exports.homepage = (req,res,next)->
	if checkAdmin req,res
	#if typeof req.session.user.is_admin != 'undefined' && req.session.user.is_admin
		res.render 'admin/homepage'
	no

exports.pages = (req,res,next)->
	console.log 'pages'
	res.render 'admin/page'
	no 

# Here for menu
exports.menu = (req,res,next)->
	Menu.getMenus (err,list)->
		console.log list
		res.render 'admin/menu',{menulist:list}
	no
	
exports.menuNew = (req,res,next)->
	console.log 'menu New'
	res.render 'admin/menu-new'
	no 
exports.menuPost = (req,res,next)->
	console.log req.body
	name = getBk req.body.menuname
	url = getBk req.body.menuurl
	description = getBk req.body.editor
	console.log name,url,description
	return res.send {"rescode":"201","reason":"error name"} if not name
	return res.send {"rescode":"201","reason":"error url"} if not url
	return res.send {"rescode":"201","reason":"error description"} if not description
	Menu.newAndSave name,url,description,1, (err)->
		return next err if err
		res.send {"rescode":"200","reason":res.locals.l.error.registersuccess}
		yes
	# next()
	#console.log res.locals.l
	#console.log req.locals
	#res.send res.locals.l
	# res.render 'json',
	# 	out:'输入错误'
	no 

getBk = (str)->
	sanitize(str).trim()