exports.config = 
	debug: true
	name: 'Giccoo'
	description: 'Giccoo'
	version: '0.1.0'
	upload: '/my/giccoo/public/uploadDir'
	site_headers: [
		'<meta name="author" content="Kelvin" />'
	]
	host: 'www.Giccoo.com'
	# cdn: 'http://www.Giccoo.com'
	cdn: ''
	site_logo: '' # default is `name`
	site_navs: [
		'home'
		'work'
		'services'
		'aboutus'
		'contact'
		'blog'
		'company'
		'social'
	]
	site_static_host: '' # 静态文件存储域名
	site_enable_search_preview: false # 开启google search preview
	site_google_search_domain:  'giccoo.com'  # google search preview中要搜索的域名 

	db: 'mongodb://localhost/giccoo'
	session_secret: 'giccoo_club'
	auth_cookie_name: 'giccoo_club'
	ip: '127.0.0.1' #
	port: 8080
	list_count: 20
	# mail SMTP
	mail_opts: 
		host: 'smtp.126.com'
		port: 25 
		auth:
			user: 'club@126.com'
			pass: 'club'

	weibo_key: 10000000
	plugins: [] 