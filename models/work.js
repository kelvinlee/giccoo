var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var WorkSchema = new Schema({
  shortname: {type: String , index:true },
  title: { type: String },
  content: { type: String },
  mobile: {type: Boolean, default: false},
  phone_model: {type: String},
  website: {type: String},
  small_img: {type: String},
  img: {type: String},
  author_id: { type: ObjectId, ref:'User' },
  tag_id: [{ type: ObjectId, ref:"TagWork" }],
  language: { type: String },
  top: { type: Boolean, default: false },
  like_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now } 
});

mongoose.model('Work', WorkSchema);