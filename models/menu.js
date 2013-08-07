var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MenuSchema = new Schema({
  name: { type: String }, 
  description: { type:String },
  url: { type:String },
  order: { type:Number , default: 1 },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('Menu', MenuSchema);