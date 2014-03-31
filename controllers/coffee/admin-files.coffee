# files
exports.files = (req,res,next)->
	console.log 'files'
	res.locals.active = ["files","files-list"]
	fs.readdir config.upload, (err,files)->
		console.log files
		res.render 'admin/files',{files:files}
exports.fileUpload = (req,res,next)->
	res.locals.active = ["files","files-upload"]
	res.render 'admin/files-upload'
exports.fileUploadPost = (req,res,next)->
	# Description...
	re = Ut.recode()
	console.log req.files
	url = req.files.file.path
	fs.rename url,config.upload+'/'+req.files.file.name, ->
		res.send re