var User = require('../proxy').User;
var config = require('../config').config;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var crypto = require('crypto');


exports.show = function(req,res, next) {
  //console.log(models.Todo);
  Todo.find(function( err, todos, count ){
  	//res.render('show',{list:req.pet});
  	res.render('show',{list:todos, count:count});
  });
};
exports.reg = function(req,res, next) { 
    res.render('user-reg',{thistitle:'Register'}); 
}
exports.edit = function(req,res, next) {
  console.log(req.params.user_id); 
  User.findById(req.params.user_id,function( err, User){
	  	console.log(err);
	  	res.render('user-reg',{user:User});
	}); 
};
exports.logout = function (req,res, next) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.render('user-reg', {error: 'logout'});
}
// dont jump here. 
var notJump = [
  '/active_account', //active page
  '/reset_pass',     //reset password page, avoid to reset twice
  '/signup',         //regist page
  '/search_pass'    //serch pass page
];
exports.login = function(req,res, next) {
  var loginname = sanitize(req.body.name).trim().toLowerCase();
  var pass = sanitize(req.body.pass).trim();
  console.log(req.body);
  if (!loginname || !pass) {
    return res.render('user-reg', {error: '信息不完整。'});
  }
  User.getUserByLoginName(loginname,function(err,user){
    if (err) {
      return next(err);
    }
    console.log(user);
    if (!user) {
      return res.render('user-reg',{error:'用户不存在。'});
    }
    pass=md5(pass);
    if (pass !== user.pass) {
      return res.render('user-reg',{error:'密码错误。'});
    }
    if (!user.active) {
      //有待商议.
    }
    gen_session(user, res);
    // 暂时无需跳转做ajax
    // var refer = req.session._loginReferer || 'home';
    // for (var i = 0, len = notJump.length; i !== len; ++i) {
    //   if (refer.indexOf(notJump[i]) >= 0) {
    //     refer = 'home';
    //     break;
    //   }
    // }
    // res.redirect(refer);
    res.render('user-reg',{error:'success',id:user._id});
  })

}
exports.create = function(req,res, next) { 
    var name = sanitize(req.body.name).trim();
    name = sanitize(name).xss();
    var loginname = name.toLowerCase();
    var pass = sanitize(req.body.pass).trim();
    pass = sanitize(pass).xss();
    var email = sanitize(req.body.email).trim();
    email = email.toLowerCase();
    email = sanitize(email).xss();
    var re_pass = sanitize(req.body.re_pass).trim();
    re_pass = sanitize(re_pass).xss();
    
    if (name === '' || pass === '' || re_pass === '' || email === '') {
      res.render('user-reg', {error: '信息不完整。', name: name, email: email});
      return;
    }
    if (name.length < 5) {
      res.render('user-reg', {error: '用户名至少需要5个字符。', name: name, email: email});
      return;
    }
    try {
      check(name,'用户名只能使用0-9，a-z，A-Z。').isAlphanumeric()
    }catch(e) {
      res.render('user-reg', {error: e.message, name: name, email: email});
    }
    if (pass !== re_pass) {
      res.render('user-reg', {error: '两次密码输入不一致。', name: name, email: email});
      return;
    }

    try {
      check(email, '不正确的电子邮箱。').isEmail();
    } catch (e) {
      res.render('user-reg', {error: e.message, name: name, email: email});
      return;
    } 
    //return ;
    User.getUsersByQuery({'$or': [{'name': loginname}, {'email': email}]}, {}, function (err, users) {
      if (err) {
        return next(err);
      }
      if (users.length > 0) {
        res.render('user-reg', {error: '用户名或邮箱已被使用。', name: name, email: email});
        return;
      }
      // md5 the pass
      pass = md5(pass);
      // create gavatar
      var avatar_url = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase()) + '?size=100';

      User.newAndSave(name, pass, email, avatar_url, false, function (err) {
        if (err) {
          return next(err);
        }
        // 发送激活邮件 

        console.log(name + " Register.");
        res.render('user-reg', {
          error: 'success'
        });
      });
    });
}

//middleware 
//check user logined!
exports.auth_user = function (req, res, next) {
  res.locals.current_user = '';
  if (req.session.user) {
    if (config.admins[req.session.user.name]) {
      req.session.user.is_admin = true;
    } 
    if (!req.session.user.avatar_url) {
      req.session.user.avatar_url = getAvatarURL(req.session.user);
    }
    res.locals.current_user = req.session.user;
    return next(); 
  } else {
    var cookie = req.cookies[config.auth_cookie_name];
    if (!cookie) {
      return next();
    }
    var auth_token = decrypt(cookie, config.session_secret);
    var auth = auth_token.split('\t');
    var user_id = auth[0];
    User.getUserById(user_id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        if (config.admins[user.name]) {
          user.is_admin = true;
        } 
        req.session.user = user;
        req.session.user.avatar_url = user.avatar_url;
        res.locals.current_user = req.session.user;
        return next(); 
      } else {
        return next();
      }
    });
  }
};
function getAvatarURL(user) {
  if (user.avatar_url) {
    return user.avatar_url;
  }
  var avatar_url = user.profile_image_url || user.avatar;
  if (!avatar_url) {
    avatar_url = config.site_static_host + '/images/user_icon&48.png';
  }
  return avatar_url;
}

function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}
function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}
function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}