art = require './controllers/art'
user = require './controllers/user'
git = require './controllers/git'
admin = require './controllers/admin'
sign = require './controllers/sign'

module.exports = (app)->
  # git never changed.
  # home page
  app.get '/', art.homepage
  app.get '/admin', admin.homepage
  app.get '/admin/page', admin.pages
  app.get '/admin/menu', admin.menu
  app.get '/admin/menu/new', admin.menuNew
  app.post '/admin/menu/new', admin.menuPost
  
  # sign
  app.get '/sign/in', sign.in
  app.get '/sign/out', sign.out
  app.post '/sign/in', sign.post
  # register
  app.get '/register', sign.register
  app.post '/register', sign.reg


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