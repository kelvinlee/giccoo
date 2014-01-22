$(document).ready ->
	$("#dataMenuTable").dataTable
		"sPaginationType":"full_numbers"
		aoColumnDefs: [
			 {
			 	bSortable: false
			 	aTargets: [0, -1]
			 }
		]
		oLanguage: {
			"sZeroRecords": "Nothing found - sorry"
		} 
	$(document).pjax 'a', '#pjax-container'
	$(".navbar.scroll-hide").mouseover ->
		$(".navbar.scroll-hide").removeClass "closed"
		setTimeout ->
			$(".navbar.scroll-hide").css 
				overflow: "visible" 
		,150 

$ -> 
    lastScrollTop = 0
    delta = 50
    $(window).scroll (event)-> 
        st = $(this).scrollTop() 
        return '' if Math.abs(lastScrollTop - st) <= delta
        if st > lastScrollTop
            $('.navbar.scroll-hide').addClass "closed"
        else 
            $('.navbar.scroll-hide').removeClass "closed"
        lastScrollTop = st 




editor = {}
fCreateEditor = ->
    editor = CodeMirror.fromTextArea document.getElementById("editor"), 
        mode: 'markdown'
        lineNumbers: false
        theme: "default" 
        extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}

    converter = new Showdown.converter()
    editor.on "change", (e)->
        e.save()
        document.getElementById("preview").innerHTML = converter.makeHtml document.getElementById("editor").value

    $('.CodeMirror-scroll').on 'scroll', (e)-> 
        $codeViewport = $(e.target)
        $previewViewport = $('.entry-preview-content')
        $codeContent = $('.CodeMirror-sizer')
        $previewContent = $('#preview')

        # calc position
        codeHeight = $codeContent.height() - $codeViewport.height()
        previewHeight = $previewContent.height() - $previewViewport.height()
        ratio = previewHeight / codeHeight
        previewPostition = $codeViewport.scrollTop() * ratio
        # console.log previewPostition
        # apply new scroll
        $(".entry-preview-content").scrollTop previewPostition

fGetScrollTop = (e)->
    if not ('pageYOffset' in window) then e.scrollTop else e.pageYOffset

