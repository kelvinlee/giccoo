exports.notfind = (req,res)->
	# 404
	console.log "404"
	res.render '404'