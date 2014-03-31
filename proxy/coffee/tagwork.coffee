models = require '../models'
TagWork = models.TagWork

exports.getTagWorkByName = (names,callback)->
	# Description...
	TagWork.find {name: names}, callback
exports.getTagWork = (id, callback)->
	TagWork.findById id, callback
exports.getTagWorks = (callback)-> 
	TagWork.find {},null,{sort:{create_at:1}},callback
	# query.exec callback
exports.get = (names, callback)->
	return callback null,[] if names.length is 0
	TagWork.find {name: names}, callback
exports.updateTagWork = (id, callback)->
	TagWork.findById id, callback
exports.delTagWork = (id,callback)->
	TagWork.findById id, (err,obj)->
		obj.remove callback
exports.newAndSave = (name, type, description, create_by, callback)->
	console.log name,type,description,create_by
	Tag_Work = new TagWork()
	Tag_Work.name = name
	Tag_Work.type = type
	Tag_Work.description = description 
	Tag_Work.create_by = create_by 
	Tag_Work.save callback