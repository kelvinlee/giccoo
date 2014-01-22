models = require '../models'
Work = models.Work


exports.getWorks = (language, callback)->
	Work.find {}, callback
  #language:language
exports.getWorkByNames = (names, callback)->
	return callback null,[] if names.length is 0
	Work.find {name:{$in: names}}, callback
exports.getWorkById = (id, callback)->
	Work.find {_id:id}, callback 
exports.getWorksByQuery = (query, opt, callback)->
	Work.find query, null, opt, callback

exports.newAndSave = (shortname, title, cotnent, author_id, language, tag_id, callback)->
  work = new Work()
  work.shortname = shortname
  work.title = title
  work.cotnent = cotnent
  work.author_id = author_id
  work.language = language
  work.tag_id = tag_id
  work.save callback