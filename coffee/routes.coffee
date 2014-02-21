art = require './controllers/art'
work = require './controllers/work'
user = require './controllers/user'
git = require './controllers/git'
admin = require './controllers/admin'
sign = require './controllers/sign'
note = require './controllers/note'

module.exports = (app)->
  # git never changed.
  # home page
  app.get '/', art.homepage
  # admin
  app.get '/admin', admin.homepage
  app.get '/admin/page', admin.pages
  app.get '/admin/menu', admin.menu
  app.get '/admin/menu/new', admin.menuNew
  app.post '/admin/menu/new', admin.menuPost
  # work
  app.get '/admin/work', admin.work
  app.get '/admin/work/new', admin.workNew
  # app.post '/admin/work/new', admin.workNewPost
  # app.get '/admin/work/updata/:work_id', admin.workUpdata
  # app.post '/admin/work/updata/:work_id', admin.workUpdataPost
  # app.get '/admin/work/tag', admin.workTag
  # app.get '/admin/work/tag/new', admin.workTagNew
  # app.post '/admin/work/tag/new', admin.workTagNewPost
  # app.get '/admin/work/tag/updata/:tag_id', admin.workTagUpdata
  # app.post '/admin/work/tag/updata/:tag_id', admin.workTagUpdataPost
  # sign
  app.get '/sign/in', sign.in
  app.get '/sign/out', sign.out
  app.post '/sign/in', sign.post
  # register
  app.get '/register', sign.register
  app.post '/register', sign.reg
  
  # work
  app.get '/work', work.homepage
  app.get '/work/:shortname', work.art
  

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
  app.get '*', note.notfind

console.log "routes loaded."