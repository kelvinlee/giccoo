var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('Connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models 
require('./user'); 
require('./art'); 
require('./tag'); 
require('./reply'); 
require('./file'); 
require('./page'); 
require('./file_tag'); 
require('./art_tag'); 

exports.User = mongoose.model('User');
exports.Art = mongoose.model('Art');
exports.Tag = mongoose.model('Tag');
exports.Reply = mongoose.model('Reply');
exports.File = mongoose.model('File');
exports.Page = mongoose.model('Page');
exports.ArtTag = mongoose.model('ArtTag');
exports.FileTag = mongoose.model('FileTag');