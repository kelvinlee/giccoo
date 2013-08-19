exports.config = {
  debug: true,
  name: 'Giccoo',
  description: 'Giccoo',
  version: '0.1.0',

  // site settings
  site_headers: [
    '<meta name="author" content="Kelvin" />', 
  ],
  host: 'www.Giccoo.com',
  cdn: 'http://www.Giccoo.com',
  site_logo: '', // default is `name`
  site_navs: [ 
    [ '/about', '关于' ],
  ],
  site_static_host: '', // 静态文件存储域名
  site_enable_search_preview: false, // 开启google search preview
  site_google_search_domain:  'giccoo.com',  // google search preview中要搜索的域名 

  db: 'mongodb://localhost/giccoo',
  session_secret: 'giccoo_club',
  auth_cookie_name: 'giccoo_club',
  port: 8002, 
  list_count: 20,
  // mail SMTP
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'club@126.com',
      pass: 'club'
    }
  }, 
  //weibo app key
  weibo_key: 10000000,     
  plugins: [ 
  ]
};