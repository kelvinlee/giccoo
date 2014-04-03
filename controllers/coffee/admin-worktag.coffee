# Work tag list
exports.workTag = (req,res,next)->
	res.locals.active = ['work','work-tag-list']
	TagWork.getTagWorks (err,list)->
		res.render 'admin/worktag',{worktaglist:list}
# new Work tag form
exports.workNewTag = (req,res,next)->
	res.locals.active = ['work','work-tag-new']
	fs.readdir res.locals.config.upload+'/'+req.session.userid+"/", (err,files)->
		res.render 'admin/worknewtag',{files:files}
# del work tag form
exports.workDelTag = (req,res,next)->
	re = Ut.recode()
	id = req.params.tag_id
	TagWork.delTagWork id,(err,list)->
		console.log err,list
		res.send re
# Check new Work tag post
exports.workNewTagPost = (req,res,next)->
	re = Ut.recode()
	name = req.body.name
	type = req.body.type
	description = req.body.editor
	create_by = if req.session.userid? then req.session.userid else 0

	TagWork.getTagWorkByName name,(err,list)->
		console.log err,list
		if err
			re.recode = 202
			re.reason = err.message
			res.send re
		else
			if not Ut.empty list
				re.recode = 201
				re.reason = "already have"
				res.send re
			else
				TagWork.newAndSave name,1,description,create_by, (err)->
					if err
						re.recode = 203
						re.reason = err.message
					else
						re.recode = 200
						re.reason = res.locals.l.error.registersuccess
					console.log re
					res.send re
		res.send re
	# res.render 'admin/worknewtag'
exports.workTagEdit = (req,res,next)->
	console.log 'tag edit',req.params.tag_id
	if req.params.tag_id is 'new'
		next()
	else
		res.locals.active = ['work','work-tag-list']
		fs.readdir res.locals.config.upload+'/'+req.session.userid+"/", (err,files)->
			TagWork.getTagWork req.params.tag_id,(err,list)->
				console.log list
				res.render 'admin/worknewtag',{edit:list,files:files}
			
exports.workEditTagPost = (req,res,next)->
	# Description...
	console.log 'tag edit post',req.params.tag_id
	if req.params.tag_id is 'new'
		next()
	else
		re = Ut.recode()
		name = req.body.name
		description = req.body.editor
		TagWork.updateTagWork req.params.tag_id,(err,obj)->
			if err
				re.recode = 203
				re.reason = err.message
			obj.name = name
			obj.description = description
			obj.save()
			res.send re