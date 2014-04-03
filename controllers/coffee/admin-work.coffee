# Work list
exports.work = (req,res,next)->
	res.locals.active = ['work','work-list']
	Work.getWorks res.locals.language,(err,list)->
		bk = []
		for u in [0...list.length]
			if list[u].author_id?
				list[u].author_id.avatar = Ut.avatar list[u].author_id.email,24
				bk.push list[u]
			else 
				list[u].remove()
		res.render 'admin/work',{worklist:bk}

# new Work form
exports.workNew = (req,res,next)-> 
	# Work.getWorkByTagId ["5322d1e6676c00880b000001","5322d437f85b3cb00b000001"],(err,list)->
		# console.log err,list
	res.locals.active = ['work','work-new']
	fs.readdir config.upload+'/'+req.session.userid+"/", (err,files)->
		TagWork.getTagWorks (err,list)->
			res.render 'admin/worknew',{taglist:list,avatar:Ut.avatar(req.session.email),files:files}
exports.workEdit = (req,res,next)->
	# Description...
	if req.params.work_id is 'new'
		next()
	else
		res.locals.active = ['work','work-list']
		goto = EventProxy.create 'files','taglist','work', (files,taglist,work)->
			# console.log work.author_id.email
			res.render 'admin/worknew',{taglist:taglist,avatar:Ut.avatar(work.author_id.email),edit:work,files:files}
		fs.readdir config.upload+'/'+req.session.userid+"/", (err,files)->
			goto.emit "files",files
		TagWork.getTagWorks (err,list)->
			goto.emit "taglist",list
		Work.getWorkById req.params.work_id,(err,obj)->
			goto.emit "work",obj
	
exports.workDel = (req,res,next)->
	id = req.params.work_id
	re = Ut.recode()
	# res.send re
	Work.delWork id, (err,list)->
		res.send re
# Edit Work post
exports.workEditPost = (req,res,next)->
	# Description...
	re = Ut.recode()
	# console.log req.body,re
	userid = Ut.xss if req.session.userid? then req.session.userid else 0
	shortname = Ut.xss req.body.shortname
	title = Ut.xss req.body.title
	content = Ut.xss req.body.editor
	tag_id = req.body.tagid
	website = req.body.website
	mobile = req.body.mobile
	phonemodel = req.body.phonemodel
	smallimg = req.body.smallimg
	img = req.body.img
	language = if req.acceptedLanguages.length > 0 then req.acceptedLanguages[0] else 'zh-CN'
	# console.log Ut.empty language
	if Ut.empty shortname
		re.recode = 203
		re.reason = "miss short name"
	if Ut.empty title
		re.recode = 203
		re.reason = "miss title"
	if Ut.empty smallimg
		re.recode = 203
		re.reason = "miss small image" 
	if Ut.empty content
		re.recode = 203
		re.reason = "miss content" 
	if Ut.empty tag_id
		re.recode = 203
		re.reason = "miss tag"
	if not mobile && not img
		re.recode = 203
		re.reason = "You must chace one from mobile or Image."
	if mobile && not website
		re.recode = 203
		re.reason = "Mobile site must have a website url."
	if Ut.empty language
		re.recode = 203
		re.reason = "miss language" 
	if re.recode isnt 200
		console.log "bug?"
		res.send re
		return 
	Work.getWorkByShortName shortname,(err,list)-> 
		if err
			re.recode = 202
			re.reason = err.message
			res.send re
		else 
			if (list is null) || (Ut.str(list._id) is req.params.work_id)
				Work.getWorkById req.params.work_id,(err,obj)->
					# console.log obj
					obj.shortname = shortname
					obj.title = title
					obj.content = content
					obj.tag_id = tag_id
					obj.mobile = mobile
					obj.website = website
					obj.small_img = smallimg
					obj.phone_model = phonemodel
					obj.img = img
					obj.save()
					res.send re
			else
				re.recode = 204
				re.reason = "already have shortname"
				res.send re


# Check new Work post
exports.workNewPost = (req,res,next)->
	re = Ut.recode()
	# 需要做个数据判断.
	userid = Ut.xss if req.session.userid? then req.session.userid else 0
	shortname = Ut.xss req.body.shortname
	title = Ut.xss req.body.title
	content = Ut.xss req.body.editor
	tag_id = req.body.tagid
	website = req.body.website
	mobile = req.body.mobile
	phonemodel = req.body.phonemodel
	smallimg = req.body.smallimg
	img = req.body.img
	language = if req.acceptedLanguages.length > 0 then req.acceptedLanguages[0] else 'zh-CN'
	if Ut.empty shortname
		re.recode = 203
		re.reason = "miss short name"
	if Ut.empty title
		re.recode = 203
		re.reason = "miss title" 
	if Ut.empty smallimg
		re.recode = 203
		re.reason = "miss small image" 
	if Ut.empty content
		re.recode = 203
		re.reason = "miss content" 
	if Ut.empty tag_id
		re.recode = 203
		re.reason = "miss tag" 
	if not mobile && not img
		re.recode = 203
		re.reason = "You must chace one from mobile or Image."
	if mobile && not website
		re.recode = 203
		re.reason = "Mobile site must have a website url."
	if Ut.empty language
		re.recode = 203
		re.reason = "miss language"
	return res.send re if re.recode isnt 200

	Work.getWorkByShortName shortname,(err,list)-> 
		if err
			re.recode = 202
			re.reason = err.message
			res.send re
		else
			if list isnt null
				re.recode = 201
				re.reason = "already have"
				res.send re
			else
				Work.newAndSave shortname,title,content,userid,language,tag_id, mobile, website, img, phonemodel, smallimg, (err)->
					if err
						re.recode = 204
						re.reason = err.message
					res.send re