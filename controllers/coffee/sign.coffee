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
	res.render 'signin'
	no
exports.out = (req,res)->
	# 登录提交
	no
exports.register = (req,res)->
	# 注册页面
	res.render 'register'
	no
exports.post = (req,res)->
	console.log req.body
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
					
				else
					re.reason = 'none'
					re.recode = 201
			res.send re
		return no
	res.send re
	no
exports.reg = (req,res) ->
	# 注册提交
	console.log req.body
	name = Ut.strim req.body.username
	passwd = Ut.strim req.body.password
	email = Ut.strim req.body.email
	re = Ut.recode() 
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