# files
exports.files = (req,res,next)->
	res.locals.active = ["files","files-list"]
	# console.log res.locals.config.upload+'/'+req.session.userid+"/"
	fs.readdir res.locals.config.upload+'/'+req.session.userid+"/", (err,files)->
		if err?
			fs.mkdir res.locals.config.upload+'/'+req.session.userid+"/",777, (isok)->
				# console.log isok
			res.render 'admin/files',{files:[]}
		else
			res.render 'admin/files',{files:files}
exports.fileDel = (req,res,next)->
	re = Ut.recode()
	fs.unlink res.locals.config.upload+'/'+req.session.userid+"/"+req.params.file_name, (err)->
		if err
			re.recode = 209
			re.reason = err
			console.log err
		else
			res.send re

exports.fileUpload = (req,res,next)->
	res.locals.active = ["files","files-upload"]
	res.render 'admin/files-upload'
exports.fileUploadPost = (req,res,next)->
	# Description...
	re = Ut.recode()
	# console.log req.files
	url = req.files.file.path
	name = req.files.file.name
	fs.exists res.locals.config.upload+'/'+req.session.userid+'/', (exists)->
		if not exists
			fs.mkdir res.locals.config.upload+'/'+req.session.userid+"/",777, (isok)->
				fs.rename url,res.locals.config.upload+'/'+req.session.userid+'/'+name, ->
					res.send re
		else
			fs.rename url,res.locals.config.upload+'/'+req.session.userid+'/'+name, ->
				res.send re