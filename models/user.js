var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

var UserSchema = new Schema({
  shortname: {type: String, index:true },
  name: { type: String, index: true },
  pass: { type: String },
  email: { type: String, unique: true },
  weibo: { type: String },
  avatar: { type: String },
  sex: {type:Number , default: 1},
  title: {type:String} ,

  art_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  project_count: {type:Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },

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