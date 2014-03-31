models = require '../models'
Work = models.Work

# exports.test = (id,callback)->
#   Work.findById(id).populate('author_id').exec callback
exports.getWorks = (language, callback)->
  Work.find({}).sort({create_at:'-1'}).populate('author_id').exec callback
  #language:language
exports.getWorkByNames = (names, callback)->
	return callback null,[] if names.length is 0
	Work.find {name: names}, callback
exports.getWorkByShortName = (shortname, callback)->
  return callback false,[] if shortname.length is 0
  Work.findOne {shortname: shortname}, callback
exports.getWorkByTagId = (id, callback)->
  Work.find {tag_id:id}, callback
exports.getWorkById = (id, callback)->
	# Work.findOne {_id:id}, callback 
  Work.findOne({_id:id}).populate('author_id').exec callback
exports.getWorksByQuery = (query, opt, callback)->
	Work.find query, null, opt, callback
exports.delWork = (id,callback)->
  Work.findById id,(err,obj)->
    obj.remove callback
exports.newAndSave = (shortname, title, content, author_id, language, tag_id, callback)->
  work = new Work()
  work.shortname = shortname
  work.title = title
  work.content = content
  work.author_id = author_id
  work.language = language
  work.tag_id = tag_id
  work.save callback