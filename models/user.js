var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

var UserSchema = new Schema({
  name: { type: String, index: true },
  pass: { type: String },
  email: { type: String, unique: true },
  weibo: { type: String },
  avatar: { type: String },
  sex: {type:Number , default: 1},
  motto: {type:String, default:""} ,
  description: {type:String, default:""} ,

  is_admin: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  art_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  work_count: {type:Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  receive_reply_mail: {type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },

  retrieve_time : {type: Number, default: 0},
  retrieve_key : {type: String, default: 0}
});

//接口
UserSchema.virtual('avatar_url').get(function () {
  var avatar_url = this.profile_image_url || this.avatar;
  if (!avatar_url) {
    avatar_url = config.site_static_host + '/images/user_icon&48.png';
  }
  return avatar_url;
});

mongoose.model('User', UserSchema);