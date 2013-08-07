/* app.js test for 2 */ 
var path = require('path');
var express = require('express');
//var io = require('socket.io').listen(server); 
var config = require('./config').config;
var routes = require('./routes');
var fs = require('fs');


var app = express();
// configuration in all env
app.configure(function () {
  var viewsRoot = path.join(__dirname, 'views');
  app.set('view engine', 'jade');
  app.set('views', viewsRoot); 
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.session_secret
  })); 
  // body 
  app.use(express.bodyParser());

  app.use(require('./controllers/user').auth_user);

  app.use(express.csrf());
  app.use(function(req, res, next){ 
    //check language
    var language = req.headers["accept-language"].split(","); 
    fs.exists("/mydata/myweb/giccoo/language/"+language[0]+".js",function(exists){
      if (exists) {
        res.locals.l = require("./language/"+language[0]+".js");
      }else{
        res.locals.l = require("./language/en-US.js");
      } 
    }); 
    // en-US,en;q=0.8
    res.locals.token = req.session._csrf;
    res.locals.config = config;
    res.locals.title = config.name; 
    next();
  });
});

// expose the "messages" local variable when views are rendered
// add local
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = []; 
  next();
});

// 缓存过期时间
var maxAge = 3600000 * 24 * 30;
var staticDir = path.join(__dirname, 'public');
app.configure('development', function () {
  app.use(express.static(staticDir));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.static(staticDir, { maxAge: maxAge }));
  app.use(express.errorHandler());
  app.set('view cache', true);
});

// default url.

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
// app.use(function(err, req, res, next){
//   // treat as 404 
//   if (~err.message.indexOf('not found')) return next();

//   // log it
//   console.error(err.stack);

//   // error page
//   res.status(500).render('5xx');
// });

// // assume 404 since no middleware responded
// app.use(function(req, res, next){
//   res.status(404).render('404', { url: req.originalUrl });
// }); 
// app.get('/node', function (req, res) {
//   res.sendfile(__dirname + '/node.html');
// });

// routes
routes(app);


app.listen(8080,"198.100.114.49");

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

console.log("Giccoo start.");