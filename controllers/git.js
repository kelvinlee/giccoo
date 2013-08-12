var config = require('../config').config;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var crypto = require('crypto');
var EventProxy = require('eventproxy');

var spawn = require('child_process').spawn;
exports.before = function(req,res,next) {
  console.log("Test here is first!");
}
exports.gitpull = function(req,res, next) {
  // console.log(req.body.payload);
  // test git pull is ok?
  var json = JSON.parse(req.body.payload);
  if (typeof json.head_commit.committer.username !== "undefined") {
  	console.log("Git need pull, from:"+json.head_commit.committer.email); 
  	var free = spawn('git',['pull']);
  	free.stdout.on('data', function(data) {
  	 console.log('Success free: \n'+ data);
      // var restartf = spawn('forever',['restartall']);
      // var restartf = spawn('forever',['stop','/mydata/myweb/giccoo/app.js']);
      // restartf.stdout.on('data',function(d){
      //   console.log('Success stop: \n'+ d);
      //   var rest = spawn('forever',['start','/mydata/myweb/giccoo/app.js']);
      //   rest.stdout.on("data",function(d){ console.log("Try start node."); });
      // });
      // restartf.stderr.on('data', function(data){
      //   console.log('Error stop: \n'+ data);
      //   var rest = spawn('forever',['start','/mydata/myweb/giccoo/app.js']);
      //   rest.stdout.on("data",function(d){ console.log("Try start node."); });
      // });
  	});
  	free.stderr.on('data', function(data) {
  	  console.log('Error free: \n'+ data);
  	}); 
  }
}