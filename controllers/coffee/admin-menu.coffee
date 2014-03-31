# Here for menu
exports.menu = (req,res,next)->
	Menu.getMenus (err,list)->
		console.log list
		res.render 'admin/menu',{menulist:list}
# Create new menu form
exports.menuNew = (req,res,next)->
	console.log 'menu New'
	res.render 'admin/menu-new'
# Check create new menu post
exports.menuPost = (req,res,next)->
	console.log req.body
	name = Ut.strim req.body.menuname
	url = Ut.strim req.body.menuurl
	description = Ut.strim req.body.editor
	console.log name,url,description
	return res.send {"rescode":"201","reason":"error name"} if not name
	return res.send {"rescode":"201","reason":"error url"} if not url
	return res.send {"rescode":"201","reason":"error description"} if not description
	Menu.newAndSave name,url,description,1, (err)->
		return next err if err
		res.send {"rescode":"200","reason":res.locals.l.error.registersuccess}
		yes
	no 
