User = require('../proxy').User
Work = require('../proxy').Work
TagWork = require('../proxy').TagWork

check = require('validator').check
EventProxy = require('eventproxy')
config = require('../config').config
Ut = require '../lib/util'

md = require('showdown')
converter = new md.converter()

exports.before = (req,res,next)->

exports.homepage = (req,res,next)->
	ep = EventProxy.create 'work',"workcount",'taglist',"users", (work,workcount,taglist,users)->
		for i in [0...users.length]
			users[i].avatar = Ut.avatar users[i].email,280
			users[i].description = converter.makeHtml users[i].description
		res.render 'homepage', {worklist:work,workcount:workcount,taglist:taglist,users:users}
	Work.getWorkPage 1,9, (err,list,count)-> 
		ep.emit "work",list
		ep.emit "workcount",{count:count,page:1,size:9}
	TagWork.getTagWorks (err,list)-> 
		ep.emit "taglist",list
	User.getUserAdmins (err,list)->
		ep.emit "users",list
exports.works = (req,res,next)->

exports.work = (req,res,next)->
	# save the new work.
	# console.log req.params.shortname
	
	Work.getWorkByShortName req.params.shortname,(err,work)->
		# console.log err,work
		if work? 
			html = converter.makeHtml work.content
			res.render 'work',{work:work,content:html}
			work.visit_count++
			work.save()
		else
			res.send {error:'404'}
	