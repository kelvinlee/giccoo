exports.userList = (req,res,next)->
	# Description...
	res.locals.active = ['user','user-list']
	User.getUsers (err,list)->
		return console.log err if err
		for i in [0...list.length]
			list[i].avatar = Ut.avatar list[i].email,24
		res.render 'admin/user',{userlist:list}
exports.userEdit = (req,res,next)->
	# Description...
	res.locals.active = ['user','user-list']
	fs.readdir config.upload+'/'+req.session.userid+"/", (err,files)->
		User.getUserById req.params.user_id, (err,obj)->
			obj.avatar = Ut.avatar obj.email
			res.render 'admin/usernew',{edit:obj,files:files}

exports.userDel = (req,res,next)->
	re = Ut.recode()
	User.getUserById req.params.user_id, (err,obj)->
		obj.remove ->
			res.send re

exports.userEditPost = (req,res,next)->
	# Description...
	re = Ut.recode()

	name = Ut.xss req.body.name
	email = Ut.xss req.body.email
	motto = Ut.xss req.body.motto
	weibo = Ut.xss req.body.weibo
	facebook = Ut.xss req.body.facebook
	twitter = Ut.xss req.body.twitter
	dribbble = Ut.xss req.body.dribbble
	instagram = Ut.xss req.body.instagram
	github = Ut.xss req.body.github

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
		if obj.is_admin && (req.params.user_id+"") isnt (req.session.userid+"")
			re.recode = 222
			re.reason = "You have no right to modify other users"
			res.send re
		else
			obj.name = name
			obj.email = email
			obj.motto = motto
			obj.active = active
			obj.is_admin = is_admin
			obj.description = description 
			obj.social.weibo = weibo 
			obj.social.facebook = facebook 
			obj.social.twitter = twitter 
			obj.social.dribbble = dribbble 
			obj.social.instagram = instagram 
			obj.social.github = github
			obj.save()
			res.send re
			if obj.active || obj._isadmin
				fs.mkdir config.upload+'/'+obj._id+"/",777, (isok)->
					console.log isok
