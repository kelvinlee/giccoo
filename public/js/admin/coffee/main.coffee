if _menu
	for a in _menu 
		$ '.menu-'+a
		.addClass 'active'
		$('.menu-'+a+' .sub-menu').addClass 'open'
editor = {}
$(document).ready ->
	# check menu open
	# select
	$('.multiselect').multiselect {maxHeight:200,buttonClass:"btn btn-primary"} if $('.multiselect').length>0 
	# del btn
	if $(".del-this").length > 0
		$(".del-this").click ->
			if confirm "Are you sure you want to delet this?"
				$.ajax
					type:"get"
					dataType:"json"
					url:$(this).attr 'href'
					success: (msg)->
						message 'Congratulation',msg.reason,'', ->
						window.location.reload()
			return false

	if $(".dropzone").length > 0
		Dropzone.autoDiscover = false
		$(".dropzone").dropzone
			url:"/admin/file-upload",
			addRemoveLinks:true,
			maxFilesize:1.5,
			maxFiles:20,
			acceptedFiles:"image/*, application/pdf, .txt",
			dictResponseError:"File Upload Error." 

message = (title,msg,img,callback)->
	$.extend $.gritter.options,
		position: 'bottom-right'
	$.gritter.add 
		title:title
		text:msg
		img:img
		after_open:callback
	# class_name:"gritter-light"
fBindForm = ->
	$("[type=submit]").click ->
		form = $("form").parsley "validate"
		if form
			$.ajax
				type:$("form").attr 'method'
				dataType:"json"
				url:$("form").attr 'action'
				data:$("form").serializeArray()
				success: (msg)-> 
					if msg.recode isnt 200
						message 'Some info is wrong',msg.reason
					else
						message 'Congratulation',msg.reason
		return false
    
fBindSwitch = ->
	$(".switch-demo, .switch-radio-demo").bootstrapSwitch()
fBindTitleEditor = ->
	$('[name=title]').on "change", (e)->
		$("#title").text $(e.target).val()
	$('[name=title]').change()
fCreateEditor = ->
	editor = CodeMirror.fromTextArea document.getElementById("editor"), 
		mode: 'markdown'
		lineNumbers: false
		theme: "default" 
		extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
	# console.log editor
	# console.log editor.getValue()
	converter = new Showdown.converter()
	editor.on "change", (e)->
		e.save()
		document.getElementById("preview").innerHTML = converter.makeHtml document.getElementById("editor").value
	previewPostition = 0
	$('.CodeMirror-scroll').on 'scroll', (e)-> 
		$codeViewport = $(e.target)
		$previewViewport = $('.entry-preview-content')
		$codeContent = $('.CodeMirror-sizer')
		$previewContent = $('#preview')
		# calc position
		# console.log $('#preview')
		codeHeight = $codeContent.height() - $codeViewport.height()
		previewHeight = $previewContent.height() - $previewViewport.height()
		ratio = previewHeight / codeHeight
		previewPostition = $codeViewport.scrollTop() * ratio
		console.log previewPostition
		# $previewContent.scrollTop previewPostition
		# apply new scroll
		$(".entry-preview-content").scrollTop previewPostition
	document.getElementById("preview").innerHTML = converter.makeHtml document.getElementById("editor").value
	fBindEidtorBtn()
fGetScrollTop = (e)->
	if not ('pageYOffset' in window) then e.scrollTop else e.pageYOffset

fBindEidtorBtn = ->
	$(".editor-bold").click ->
		# console.log editor.getSelection()
		editor.replaceSelection("**"+editor.getSelection()+"**")
		pos = editor.getCursor()
		pos.ch -= 2
		editor.setCursor pos
		editor.focus()
	$(".editor-italic").click ->
		editor.replaceSelection("*"+editor.getSelection()+"*")
		pos = editor.getCursor()
		pos.ch -= 1
		editor.setCursor pos
		editor.focus()
	$(".editor-code").click ->
		editor.replaceSelection("`"+editor.getSelection()+"`")
		pos = editor.getCursor()
		pos.ch -= 1
		editor.setCursor pos
		editor.focus()
	$(".editor-link").click ->
		editor.replaceSelection("["+editor.getSelection()+"](http://)")
		pos = editor.getCursor()
		pos.ch -= 1
		editor.setCursor pos
		editor.focus()
	$(".editor-list-ul").click ->
		editor.replaceSelection("\n* \n* \n* ")
		pos = editor.getCursor()
		pos.line -= 2
		pos.ch = 2
		editor.setCursor pos
		editor.focus()
	$(".editor-list-ol").click ->
		editor.replaceSelection("1. \n2. \n3. \n")
		pos = editor.getCursor()
		pos.line -= 2
		pos.ch = 2
		editor.setCursor pos
		editor.focus()
	$(".editor-files").click ->
		if $(".entry-preview-content").is ".file"
			$(".entry-preview-content").removeClass "file"
		else
			$(".entry-preview-content").addClass "file"
		getFilesList()
	$(".editor-images").click ->
		# ![](http://www.baidu.com)
		editor.replaceSelection("\n!["+$(this).data("name")+"]("+$(this).data("src")+")")
		pos = editor.getCursor()
		editor.setCursor pos
		editor.focus()
getFilesList = ->


fBindShortName = ->
	$('input[name=shortname]').keyup ->
		val = $(this).val().replace /\s+/g,'-'
		$(this).val val
