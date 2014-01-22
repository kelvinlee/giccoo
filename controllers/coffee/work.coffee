User = require('../proxy').User
Work = require('../proxy').Work

check = require('validator').check
EventProxy = require('eventproxy')
config = require('../config').config
Ut = require '../lib/util'

#var md = require('showdown').Markdown

checkAdmin = (req,res)->
	if req.session.is_admin
		return yes
	else
		res.render '404'
	no
exports.homepage = (req,res)->
	# work list
	console.log "work"
	res.render 'work'
	no 