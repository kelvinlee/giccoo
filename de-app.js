// Generated by CoffeeScript 1.6.3
var app, config, express, fs, maxAge, path, routes, staticDir;

path = require('path');

express = require('express');

config = require('./de-config').config;

routes = require('./routes');

fs = require('fs');

app = express();

routes(app);

app.configure(function() {
  var viewsRoot;
  viewsRoot = path.join(__dirname, 'views');
  app.set('view engine', 'jade');
  app.set('views', viewsRoot);
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.session_secret
  }));
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(require('./controllers/user').auth_user);
  app.use(function(req, res, next) {
    if (req.body && req.body.git === 'pull') {
      return next();
    }
    app.use(express.csrf());
    return next();
  });
  return app.use(function(req, res, next) {
    var language;
    console.log(req.headers);
    language = 'en-US';
    if (req.headers["accept-language"]) {
      language = req.headers["accept-language"].split(",");
    }
    res.locals.l = require("./language/en-US.js");
    res.locals.language = "en-US";
    fs.exists("./language/" + language[0] + ".js", function(exists) {
      if (exists) {
        res.locals.l = require("./language/" + language[0]);
        return res.locals.language = language[0];
      }
    });
    console.log(res.locals.language);
    console.log(res.locals.l);
    res.locals.token = req.session._csrf;
    res.locals.config = config;
    return next();
  });
});

app.use(function(req, res, next) {
  var msgs;
  msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  res.locals({
    messages: msgs,
    hasMessages: !!msgs.length
  });
  req.session.messages = [];
  return next();
});

maxAge = 3600000 * 24 * 30;

staticDir = path.join(__dirname, 'public');

app.configure('development', function() {
  app.use(express["static"](staticDir));
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express["static"](staticDir, {
    maxAge: maxAge
  }));
  return app.set('view cache', true);
});

app.listen(config.port, config.ip);

console.log("Giccoo start.");
