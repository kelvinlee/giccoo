# main.coffee
$(document).ready -> 
	# $(window,"body","html").scrollTop 0
$(window).scroll ->
	$("#header").addClass "growtop scrollheader" if $(this).scrollTop()>395 and $("#header").not ".scrollheader"
	$("#header").removeClass "growtop scrollheader" if $(this).scrollTop()<395 and $("#header").is ".scrollheader"
	yes


