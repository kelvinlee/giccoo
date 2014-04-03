var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var FileSchema = new Schema({
  title: { type: String },
  url: { type: String },
  description: { type: String },
  author_id: { type: ObjectId, rel:"User" },
  type: { type:String },
  upload_at: { type: Date, default: Date.now }
});

mongoose.model('File', FileSchema);