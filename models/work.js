var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var WorkSchema = new Schema({
  shortname: {type: String , index:true },
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  tag_id: { type: ObjectId },
  language: { type: String },
  top: { type: Boolean, default: false },
  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now } 
});

mongoose.model('Work', WorkSchema);