exports.userList = (req,res,next)->
	# Description...
	res.locals.active = ['user','user-list']
	User.getUsers (err,list)->
		return console.log err if err
		res.render 'admin/user',{userlist:list}
exports.userEdit = (req,res,next)->
	# Description...
	res.locals.active = ['user','user-list']
	fs.readdir config.upload, (err,files)->
		User.getUserById req.params.user_id, (err,obj)->
			obj.avatar = Ut.avatar obj.email
			res.render 'admin/usernew',{edit:obj,files:files}
	
exports.userEditPost = (req,res,next)->
	# Description...
	re = Ut.recode()

	name = Ut.xss req.body.name
	email = Ut.xss req.body.email
	motto = Ut.xss req.body.motto
	active = if req.body.active? then true else false
	is_admin = if req.body.is_admin? then true else false
	description = Ut.xss req.body.editor

	if Ut.empty name
		re.recode = 203
		re.reason = "miss name"
	if Ut.empty email
		re.recode = 203
		re.reason = "miss Email"

	User.getUserById req.params.user_id, (err,obj)->
		obj.name = name
		obj.email = email
		obj.motto = motto
		obj.active = active
		obj.is_admin = is_admin
		obj.description = description
		obj.save()
		res.send re
