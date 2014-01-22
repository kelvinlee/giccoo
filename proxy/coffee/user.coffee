models = require '../models'
User = models.User


exports.getUserLogin = (name, pass, callback)->
	User.find {name: name, pass: pass}, callback
exports.getUserByNames = (names, callback)->
	return callback null,[] if names.length is 0
	User.find {name:{$in: names}}, callback
exports.getUserById = (id, callback)->
	User.find {_id:id}, callback 
exports.getUsersByQuery = (query, opt, callback)->
	User.find query, null, opt, callback

exports.newAndSave = (name, pass, email, avatar_url, active, sex, title, callback)->
  user = new User()
  user.name = name 
  user.pass = pass
  user.email = email
  user.avatar = avatar_url
  user.sex = sex
  user.title = title
  user.active = false
  user.save callback