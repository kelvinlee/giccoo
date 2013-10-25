art = require './controllers/art'
user = require './controllers/user'
git = require './controllers/git'
admin = require './controllers/admin'

module.exports = (app)->
  # git never changed.
  # home page
  app.get '/', art.homepage
  app.get '/admin', admin.homepage
  app.get '/admin/page', admin.pages
  app.get '/admin/menu', admin.menu
  app.get '/admin/menu/new', admin.menuNew
  
  # art 
  # app.get('/arts/:page_id', art.list);
  # app.get('/art/:art_id', art.show);
  # app.get('/newart', art.create);
   
  # # user
  # app.get('/reg', user.reg);
  # app.get('/logout', user.logout);
  
  # # user post
  # app.post('/user', user.create);
  # app.post('/login', user.login);

  #art post
  # app.post('/art/:art_id',art.createblog);

console.log "routes loaded."