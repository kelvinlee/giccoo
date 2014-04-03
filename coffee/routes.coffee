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
  app.get '/', work.homepage

  # sign
  app.get '/sign/in', sign.in
  app.get '/sign/out', sign.out
  app.post '/sign/in', sign.post
  # register
  app.get '/register', sign.register
  app.post '/register', sign.reg
  
  # work
  # app.get '/works', work.homepage
  app.get '/work/:shortname', work.work


  # admin
  app.get '/admin/*',admin.before
  app.get '/admin', admin.homepage
  app.get '/admin/page', admin.pages
  app.get '/admin/menu', admin.menu
  app.get '/admin/menu/new', admin.menuNew
  app.post '/admin/menu/new', admin.menuPost
  # work
  app.get '/admin/work', admin.work
  app.get '/admin/work/:work_id', admin.workEdit
  app.get '/admin/work/new', admin.workNew
  app.get '/admin/work/del/:work_id', admin.workDel
  app.post '/admin/work/new', admin.workNewPost
  app.post '/admin/work/:work_id', admin.workEditPost
  # Work Tag
  app.get '/admin/work-tag', admin.workTag
  app.get '/admin/work-tag/:tag_id', admin.workTagEdit
  app.get '/admin/work-tag/new', admin.workNewTag
  app.get '/admin/work-tag/del/:tag_id', admin.workDelTag
  app.post '/admin/work-tag/new', admin.workNewTagPost
  app.post '/admin/work-tag/:tag_id', admin.workEditTagPost
  # User
  app.get '/admin/user',admin.userList
  app.get '/admin/user/:user_id',admin.userEdit
  app.get '/admin/user/del/:user_id',admin.userDel
  app.post '/admin/user/:user_id',admin.userEditPost
  # files
  app.get '/admin/files',admin.files
  app.get '/admin/files-upload',admin.fileUpload
  app.get '/admin/files-remove/:file_name',admin.fileDel
  app.post '/admin/file-upload',admin.fileUploadPost
  # app.post '/admin/work/new', admin.workNewPost
  # app.get '/admin/work/updata/:work_id', admin.workUpdata
  # app.post '/admin/work/updata/:work_id', admin.workUpdataPost
  # app.get '/admin/work/tag', admin.workTag
  # app.get '/admin/work/tag/new', admin.workTagNew
  # app.post '/admin/work/tag/new', admin.workTagNewPost
  # app.get '/admin/work/tag/updata/:tag_id', admin.workTagUpdata
  # app.post '/admin/work/tag/updata/:tag_id', admin.workTagUpdataPost
  
  

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