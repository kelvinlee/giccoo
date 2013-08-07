var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var FileTagSchema = new Schema({
  file_id: { type: ObjectId },
  tag_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('FileTag', FileTagSchema);