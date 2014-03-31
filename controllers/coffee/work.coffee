User = require('../proxy').User
Work = require('../proxy').Work

check = require('validator').check
EventProxy = require('eventproxy')
config = require('../config').config
Ut = require '../lib/util'

#var md = require('showdown').Markdown
exports.callback = (req,res,next)->
	console.log 'asdf',req.session.is_admin
	next()
checkAdmin = (req,res)->
	if req.session.is_admin
		return yes
	else
		res.render '404'
exports.homepage = (req,res)->
	# work list
	console.log "work"
	res.render 'work'
exports.art = (req,res,next)->
	# work content
	# console.log "work",req.params.shortname
	res.render 'work'
	# next()

exports.workPost = (req,res,next)->
	# save the new work.
	
	