# Pages
exports.pages = (req,res,next)->
	console.log 'pages'
	res.render 'admin/page' 