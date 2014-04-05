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
exports.works = (req,res,next)->
	page = req.params.page_num

	Work.getWorkPage page,9, (err,list,count)-> 
		# ep.emit "work",list
		# ep.emit "workcount",{count:count,page:page,size:9}
		res.render 'workpage', {worklist:list,workcount:{count:count,page:page,size:9}}

exports.like = (req,res,next)->
	model = req.params.model
	model_id = req.params.model_id
	re = Ut.recode()
	if req.cookies[model+"-"+model_id] is "true"
		re.recode = 201
		re.reason = "already have."
	if model is 'work' && re.recode is 200
		day = 1000 * 60 * 60 * 24 * 7
		res.cookie model+"-"+model_id,"true" ,{expires: new Date Date.now()+60*60*24*7,maxAge: day}
		Work.getWorkById model_id, (err,obj)->
			obj.like_count += 1
			obj.save()

	res.send re



