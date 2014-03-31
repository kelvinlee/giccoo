var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagWorkSchema = new Schema({
  name: { type: String }, 
  type: { type: Number },
  create_by: { type: ObjectId, ref:'User' },
  description: { type:String },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('TagWork', TagWorkSchema);