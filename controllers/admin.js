var EventProxy,Menu,TagWork,User,Ut,Work,check,checkAdmin,config,fs;User=require("../proxy").User,Menu=require("../proxy").Menu,Work=require("../proxy").Work,TagWork=require("../proxy").TagWork,fs=require("fs"),Ut=require("../lib/util"),check=require("validator").check,EventProxy=require("eventproxy"),config=require("../config").config,checkAdmin=function(e,r,o){var n,t;return e.session.is_admin&&e.cookies.user?(o(),!0):(e.cookies.user?(t=Ut.decrypt(e.cookies.user,"giccoo"),n=t.split("	"),User.getUserById(n[0],function(t,s){return s.is_admin?(e.session.is_admin=!0,e.session.userid=n[0],e.session.email=n[2],o()):r.redirect("/sign/in")})):r.redirect("/sign/in"),!1)},exports.before=function(e,r,o){return r.locals.active=["dashboard"],checkAdmin(e,r,o)},exports.homepage=function(e,r,o){return checkAdmin(e,r,function(){return r.render("admin/homepage")})},exports.work=function(e,r,o){return r.locals.active=["work","work-list"],Work.getWorks(r.locals.language,function(e,o){var n,t,s;for(n=t=0,s=o.length;s>=0?s>t:t>s;n=s>=0?++t:--t)o[n].author_id.avatar=Ut.avatar(o[n].author_id.email,24);return r.render("admin/work",{worklist:o})})},exports.workNew=function(e,r,o){return r.locals.active=["work","work-new"],fs.readdir(config.upload,function(o,n){return TagWork.getTagWorks(function(o,t){return r.render("admin/worknew",{taglist:t,avatar:Ut.avatar(e.session.email),files:n})})})},exports.workEdit=function(e,r,o){var n;return console.log("here"),"new"===e.params.work_id?o():(r.locals.active=["work","work-list"],n=EventProxy.create("files","taglist","work",function(e,o,n){return r.render("admin/worknew",{taglist:o,avatar:Ut.avatar(n.author_id.email),edit:n,files:e})}),fs.readdir(config.upload,function(e,r){return n.emit("files",r)}),TagWork.getTagWorks(function(e,r){return n.emit("taglist",r)}),Work.getWorkById(e.params.work_id,function(e,r){return n.emit("work",r)}))},exports.workDel=function(e,r,o){var n,t;return n=e.params.work_id,t=Ut.recode(),Work.delWork(n,function(e,o){return console.log(e,o),r.send(t)})},exports.workEditPost=function(e,r,o){var n,t,s,a,i,d,c;return s=Ut.recode(),console.log(e.body,s),c=Ut.xss(null!=e.session.userid?e.session.userid:0),a=Ut.xss(e.body.shortname),d=Ut.xss(e.body.title),n=Ut.xss(e.body.editor),i=e.body.tagid,t=e.acceptedLanguages.length>0?e.acceptedLanguages[0]:"zh-CN",console.log(Ut.empty(t)),Ut.empty(a)&&(s.recode=203,s.reason="miss short name"),Ut.empty(d)&&(s.recode=203,s.reason="miss title"),Ut.empty(n)&&(s.recode=203,s.reason="miss content"),Ut.empty(i)&&(s.recode=203,s.reason="miss tag"),Ut.empty(t)&&(s.recode=203,s.reason="miss language"),200!==s.recode?(console.log("bug?"),void r.send(s)):Work.getWorkByShortName(a,function(o,t){return o?(s.recode=202,s.reason=o.message,r.send(s)):null===t||Ut.str(t._id)===e.params.work_id?Work.getWorkById(e.params.work_id,function(e,o){return console.log(o),o.shortname=a,o.title=d,o.content=n,o.tag_id=i,o.save(),r.send(s)}):(s.recode=204,s.reason="already have shortname",r.send(s))})},exports.workNewPost=function(e,r,o){var n,t,s,a,i,d,c;return s=Ut.recode(),c=Ut.xss(null!=e.session.userid?e.session.userid:0),a=Ut.xss(e.body.shortname),d=Ut.xss(e.body.title),n=Ut.xss(e.body.editor),i=e.body.tagid,t=e.acceptedLanguages.length>0?e.acceptedLanguages[0]:"zh-CN",Ut.empty(a)&&(s.recode=203,s.reason="miss short name"),Ut.empty(d)&&(s.recode=203,s.reason="miss title"),Ut.empty(n)&&(s.recode=203,s.reason="miss content"),Ut.empty(i)&&(s.recode=203,s.reason="miss tag"),Ut.empty(t)&&(s.recode=203,s.reason="miss language"),200!==s.recode?r.send(s):Work.getWorkByShortName(a,function(e,o){return e?(s.recode=202,s.reason=e.message,r.send(s)):null!==o?(s.recode=201,s.reason="already have",r.send(s)):Work.newAndSave(a,d,n,c,t,i,function(e){return e&&(s.recode=204,s.reason=e.message),r.send(s)})})},exports.workTag=function(e,r,o){return r.locals.active=["work","work-tag-list"],TagWork.getTagWorks(function(e,o){return r.render("admin/worktag",{worktaglist:o})})},exports.workNewTag=function(e,r,o){return r.locals.active=["work","work-tag-new"],fs.readdir(config.upload,function(e,o){return r.render("admin/worknewtag",{files:o})})},exports.workDelTag=function(e,r,o){var n,t;return t=Ut.recode(),n=e.params.tag_id,TagWork.delTagWork(n,function(e,o){return console.log(e,o),r.send(t)})},exports.workNewTagPost=function(e,r,o){var n,t,s,a,i;return a=Ut.recode(),s=e.body.name,i=e.body.type,t=e.body.editor,n=null!=e.session.userid?e.session.userid:0,TagWork.getTagWorkByName(s,function(e,o){return console.log(e,o),e?(a.recode=202,a.reason=e.message,r.send(a)):Ut.empty(o)?TagWork.newAndSave(s,1,t,n,function(e){return e?(a.recode=203,a.reason=e.message):(a.recode=200,a.reason=r.locals.l.error.registersuccess),console.log(a),r.send(a)}):(a.recode=201,a.reason="already have",r.send(a)),r.send(a)})},exports.workTagEdit=function(e,r,o){return console.log("tag edit",e.params.tag_id),"new"===e.params.tag_id?o():(r.locals.active=["work","work-tag-list"],fs.readdir(config.upload,function(o,n){return TagWork.getTagWork(e.params.tag_id,function(e,o){return console.log(o),r.render("admin/worknewtag",{edit:o,files:n})})}))},exports.workEditTagPost=function(e,r,o){var n,t,s;return console.log("tag edit post",e.params.tag_id),"new"===e.params.tag_id?o():(s=Ut.recode(),t=e.body.name,n=e.body.editor,TagWork.updateTagWork(e.params.tag_id,function(e,o){return e&&(s.recode=203,s.reason=e.message),o.name=t,o.description=n,o.save(),r.send(s)}))},exports.pages=function(e,r,o){return console.log("pages"),r.render("admin/page")},exports.menu=function(e,r,o){return Menu.getMenus(function(e,o){return console.log(o),r.render("admin/menu",{menulist:o})})},exports.menuNew=function(e,r,o){return console.log("menu New"),r.render("admin/menu-new")},exports.menuPost=function(e,r,o){var n,t,s;return console.log(e.body),t=Ut.strim(e.body.menuname),s=Ut.strim(e.body.menuurl),n=Ut.strim(e.body.editor),console.log(t,s,n),t?s?n?(Menu.newAndSave(t,s,n,1,function(e){return e?o(e):(r.send({rescode:"200",reason:r.locals.l.error.registersuccess}),!0)}),!1):r.send({rescode:"201",reason:"error description"}):r.send({rescode:"201",reason:"error url"}):r.send({rescode:"201",reason:"error name"})},exports.userList=function(e,r,o){return r.locals.active=["user","user-list"],User.getUsers(function(e,o){return e?console.log(e):r.render("admin/user",{userlist:o})})},exports.userEdit=function(e,r,o){return r.locals.active=["user","user-list"],fs.readdir(config.upload,function(o,n){return User.getUserById(e.params.user_id,function(e,o){return o.avatar=Ut.avatar(o.email),r.render("admin/usernew",{edit:o,files:n})})})},exports.userEditPost=function(e,r,o){var n,t,s,a,i,d,c;return c=Ut.recode(),d=Ut.xss(e.body.name),s=Ut.xss(e.body.email),i=Ut.xss(e.body.motto),n=null!=e.body.active?!0:!1,a=null!=e.body.is_admin?!0:!1,t=Ut.xss(e.body.editor),Ut.empty(d)&&(c.recode=203,c.reason="miss name"),Ut.empty(s)&&(c.recode=203,c.reason="miss Email"),User.getUserById(e.params.user_id,function(e,o){return o.name=d,o.email=s,o.motto=i,o.active=n,o.is_admin=a,o.description=t,o.save(),r.send(c)})},exports.files=function(e,r,o){return console.log("files"),r.locals.active=["files","files-list"],fs.readdir(config.upload,function(e,o){return console.log(o),r.render("admin/files",{files:o})})},exports.fileUpload=function(e,r,o){return r.locals.active=["files","files-upload"],r.render("admin/files-upload")},exports.fileUploadPost=function(e,r,o){var n,t;return n=Ut.recode(),console.log(e.files),t=e.files.file.path,fs.rename(t,config.upload+"/"+e.files.file.name,function(){return r.send(n)})};