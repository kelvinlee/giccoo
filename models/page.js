var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PageSchema = new Schema({
  shortname: {type: String , index:true },
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId }, 
  visit_count: { type: Number, default: 0 }, 
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

mongoose.model('Page', PageSchema);