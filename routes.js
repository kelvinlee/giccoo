var art = require('./controllers/art'); 
var user = require('./controllers/user'); 
var git = require('./controllers/git'); 

module.exports = function (app) {
  // git never changed.
  app.post('/git-pull', git.gitpull);
  // home page
  app.get('/', art.homepage);
  app.get('/test', art.homepage);
  app.get('/test2', art.homepage);
  
  // art
  // app.get('/arts/:page_id', art.list);
  // app.get('/art/:art_id', art.show);
  // app.get('/newart', art.create);
   
  // // user
  // app.get('/reg', user.reg);
  // app.get('/logout', user.logout);
  
  // // user post
  // app.post('/user', user.create);
  // app.post('/login', user.login);


  //art post
  // app.post('/art/:art_id',art.createblog);
};
console.log("routes loaded.");