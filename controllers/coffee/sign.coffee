User = require('../proxy').User

check = require('validator').check
EventProxy = require('eventproxy')
config = require('../config').config
Ut = require('../lib/util')

#var md = require('showdown').Markdown

checkAdmin = (req,res)->
	if req.session.is_admin
		return yes
	else
		res.render '404'
	no
exports.in = (req,res)->
	# 登录界面
	res.render 'admin/signin'
	no
exports.out = (req,res)->
	# 登录提交
	no
exports.register = (req,res)->
	# 注册页面
	res.render 'admin/register'
	no
exports.post = (req,res)->
	# console.log req.body
	name = Ut.strim req.body.username
	passwd = Ut.strim req.body.password
	re = Ut.recode() 
	if Ut.empty passwd
		re.reason = 'empty password'
		re.recode = 201
	if Ut.empty name
		re.reason = 'empty username'
		re.recode = 201
	if re.recode is 200
		User.getUserLogin name,passwd, (err,list)->
			if err
				console.log err
				re.reason = 'empty username'
				re.recode = 201
			else
				if list.length>0
					# req.session.is_admin = list[0].is_admin
					# req.session.userid = list[0]._id
					user = Ut.encrypt list[0]._id+'\t'+list[0].name+'\t'+list[0].email,'giccoo'
					day = 1000 * 60 * 60 * 24 * 7
					res.cookie 'user',user ,{expires: new Date Date.now()+60*60*24*7,maxAge: day}
					# console.log req.session
				else
					re.reason = 'none'
					re.recode = 201
			res.send re
		return no
	else
		res.send re
	no
exports.reg = (req,res) ->
	# 注册提交
	console.log Ut.strim " sdf "
	name = Ut.strim req.body.username
	passwd = Ut.strim req.body.password
	email = Ut.strim req.body.email
	re = Ut.recode()
	console.log re
	if Ut.empty passwd
		re.reason = 'empty password'
		re.recode = 201
	if Ut.empty name
		re.reason = 'empty username'
		re.recode = 201
	if Ut.empty email
		re.reason = 'empty email'
		re.recode = 201
	if re.recode is 200
		User.newAndSave name, passwd, email, '', true, 1, '', (err,list)->
			if err
				console.log err
				re.reason = 'empty username'
				re.recode = 201
			else
				if list

				else
					re.reason = list
					re.recode = 201
			res.send re
			return no
	res.send re
	no