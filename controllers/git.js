var config = require('../config').config;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var crypto = require('crypto');
var EventProxy = require('eventproxy');

var spawn =require('child_process').spawn;

exports.gitpull = function(req,res, next) {
  // console.log(req.body.payload);
  // test git pull is ok?
  var json = JSON.parse(req.body.payload);
  if (typeof json.head_commit.committer.username !== "undefined") {
  	console.log("Git need pull, from:"+json.head_commit.committer.email);
  	var free = spawn('git',['pull']);
	free.stdout.on('data', function(data) {
	  console.log('Success: \n'+ data);
    var restartf = spawn('forever',['restartall']);
    restartf.stderr.on('data',function(d){
      console.log('Success: \n'+ d);
    });
	});
	free.stderr.on('data', function(data) {
	  console.log('Error: \n'+ data);
	}); 
  }
}