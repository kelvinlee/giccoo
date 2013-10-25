$(document).ready ->
    $(document).pjax 'a', '#pjax-container'

# $(window).scroll ->
#     $("#header").addClass "growtop scrollheader" if $(this).scrollTop()>395 and $("#header").not ".scrollheader"
#     $("#header").removeClass "growtop scrollheader" if $(this).scrollTop()<395 and $("#header").is ".scrollheader"
#     yes

$(".navbar.scroll-hide").mouseover ->
    $(".navbar.scroll-hide").removeClass "closed"
    setTimeout ->
        $(".navbar.scroll-hide").css 
            overflow: "visible" 
    ,150
# $(".navbar.scroll-hide").mouseleave -> 
    # $('.navbar.scroll-hide').addClass "closed" if $(window).scrollTop() > 50
    

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

