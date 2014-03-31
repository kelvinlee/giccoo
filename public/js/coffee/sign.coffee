
$(document).ready ->
	fBindLogin()

fBindLogin = ->
	$(".btn-login,.btn-regiter").click ->
		$.ajax
			type:"post"
			dataType:"json"
			url:$(this).parents('form').attr 'action'
			data:$('form').serializeArray()
			success: (msg)->
				if msg.recode is 200
					window.location.href = "/admin"
				else
					alert msg.reason
		return false