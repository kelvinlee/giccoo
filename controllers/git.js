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
	});
	free.stderr.on('data', function(data) {
	  console.log('Error: \n'+ data);
	});
	var restart = spawn('forever',["restartall"]);
	restart.stdout.on("data",function(data){
		console.log("App restart.");
	});
  }
}