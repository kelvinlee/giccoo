// loading img
var imglist = [
	{url:"static/img/bg1.png"},
	{url:"static/img/bg2.png"},
	{url:"static/img/bg3.png"}
]
// anmiate for all model

var sp1 = 2000; //speed 1
var sp2 = 1300; //speed 2
var sp3 = 1100; //speed 3
var speed = 1900;
var _w = 0;
var nowModel = 1;	// 当前显示的.
var nowModelN = 1;	// 目标.
var nowModelM = 1;	// 运动时间系数.
var Psecond = false;
var Pthird = false;
var canmove = true;
var Mdelay = 0;
var $ep;		//pop弹出对象.


// Main
$(function(){ 
    //计算位移
    rewidthandbg(); 
    $("a").click(function(){
        if ($(this).is(".noclick")) { return false; }
    })
    $("[data-faqs]").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	initoncall(6,false,function(){
    		$("#faqslist").addClass("faqslist_show");
    	});
    	return false;
    });
    $("[data-demos]").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	initoncall(5,true);
    	return false;
    });
    $("[data-close]").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	initoncall(6);
    	return false;
    });
    $("[data-aboutmw]").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	initoncall(6,true);
    	return false;
    });
    $("[data-privacy]").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	initoncall(2,true);
    	return false;
    });
    //todo:应该给各个页面都加一个按钮事件.
    bindoverlay();
    bindpop();
    $(".faqpop").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	initoncall(6,false,function(){
    		if ($("#faqslist").is(".faqslist_show")) {
    			$("#faqscontent").addClass("faqslist_shows");
    		}else{
    			$("#faqslist").addClass("faqslist_show");
    			setTimeout(function(){
    				$("#faqscontent").addClass("faqslist_shows");	
    			});
    		}
    	});
    	return false;
    });
    $("#navbar a").click(function(){
    	if ($(this).is(".noclick")) { return false; }
        var $i = $(this).parents("div:first").index();
        initoncall($i+1); 
        return false;
    });
    //同比高度
    var maxH = 0,maxHH=0;
    $(".cmodel").each(function(){
        if ($(this).height()>maxH) {maxH = $(this).height(); }
    })
    $(".content_c").each(function(){
    	if ($(this).height()>maxHH) {maxHH = $(this).height(); };	
    })
    $(".cmodel").height(maxH);
    $(".content_c").height(maxHH);
    //plugins
    $("#piclist").Jpages({Btn:"<span></span>",firstBtn:"",lastBtn:"",selectC:"on"});
    //倒影,可能需要判断IE8以下不运行此段.
    if ($.support.leadingWhitespace) {
	    $("#navbar a").each(function(i){
	        var div = $("<div>").addClass("reflect b"+(i+1)+" skew"+(i+1)).html($(this).html());
	        $(this).append(div);
	    }); 
    }
    $("#modellist .more,#modellist .oncallbtn").click(function(){
    	if ($(this).is(".noclick")) { return false; }
        $i = $(this).parents(".modelcontent").index();
        initoncall($i+1,true);
        return false;
    });
    $("#modelsecondlist .back").click(function(){
        $i = $(this).parents(".model").index();
        initoncall($i+1);
        return false;
    });
    $(".num2_b1").each(function(){
        $(this).css({"top":(125-$(this).height()/2)+"px"});
    }); 
    $(".submit").click(function(){
    	successform();
    	return false;
    });
    $(".backform").click(function(){
    	backform();
    	return false;
    });
    checkprevnext();
    $(".prev").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	var $ep = $("#navbar .active").parent();
    	$ep.prev().find("a:first").click();
    });
    $(".next").click(function(){
    	if ($(this).is(".noclick")) { return false; }
    	var $ep = $("#navbar .active").parent();
    	$ep.next().find("a:first").click();
    });
    // todo: need loading here. and need reload every model . [计算model的位置,根据页面.]

}); 
$(window).resize(function() {
    rewidthandbg();
});
// todo:给每个页初始进来的时候设置默认移动.
function defaultpage(page,second,third) {
	var temp = speed;
	speed = 100;
	initoncall(page,second,third);
	speed = temp;
}
// menunav
function checkprevnext() {
	if (nowModelN == 1) {
		$(".prev").hide();
		$(".next").show();
	}else if (nowModelN == 6) {
		$(".prev").show();
		$(".next").hide();
	}else{
		$(".prev").show();
		$(".next").show();
	}
}
// form
function successform() {
	$("#mode6_content").addClass("animatehide");
	setTimeout(function(){
		$("#contentusform form").addClass("hide");
		$("#contentusform .thanks").removeClass("hide"); 
		$("#mode6_content").removeClass("animatehide");
	},1000);
}
function backform() {
	$("#mode6_content").addClass("animatehide");
	setTimeout(function(){
		$("#contentusform form").removeClass("hide");
		$("#contentusform .thanks").addClass("hide"); 
		$("#mode6_content").removeClass("animatehide");
	},1000);

}
// overlay
function bindoverlay() {
	var $e = $("[data-team]"); 
	$e.click(function(){
		$(".divscrolls").remove();
		$("#overlaymark").fadeIn();
    	$("#overlay").fadeIn();
    	jsScroll(document.getElementById('overlay_content'),10);
    	return false;
	});
	$("#overlaymark,.closeoverlay").click(function(){
    	$("#overlaymark").fadeOut();
    	$("#overlay").fadeOut();
    	return false;
    });
}
// pop
function bindpop() {
	var $e = $("[data-demo]");
    $e.click(function(){
    	$ep = $(this);
        initoncall(5,true,showpop);
        return false;
    });
    $("#popmark").click(function(){
    	$(this).fadeOut();
    	$("#popshow").fadeOut();
    });
}
// 显示弹出层.
function showpop() { 
	// $("#popshow").css({top:"-1000%",left:"0%"}).show();  
	// $("#popshow").css({"margin-left":"-"+(968/2)+"px"});
	// var temp = (700 - 716)/2;
	// $("#popshow").css({top:(temp>0?temp:0)+"px",left:"50%"}).hide();

	$("#popmark").fadeIn();
	$("#popshow").fadeIn(); 
}

function rewidthandbg() {
    var w = 1280-$("#main").width();
    _w = w/2;
    $('#modellist').css({"margin-left":"-"+(_w)+"px"}); 
}

// every model has different top and left. they need two coordinates
var _now = 0;
function intixy() {

}
//主要事件,移动窗口.
function initoncall(page,second,third) {
	$("a").addClass("noclick");
	var $e = $("#navbar a").eq(page-1);
	console.log(parseInt($("#modelsecondlist").css("top")));
    if (parseInt($("#modelsecondlist").css("top")) > 0 && page != nowModel) { 
    	if ((nowModel-page)>0) { 
    		$("#navbar a.active .bgmove").css({width:"95px",left:"0%"}).animate({width:"0px"},speed);
    		$("#navbar a").removeClass("active"); 
        	$e.addClass("active");
        	$e.find(".bgmove").css({width:"0px",left:"100%"}).stop().animate({width:"95px",left:"0%"},speed);
    	}else{  
    		$("#navbar a.active .bgmove").css({left:"0%",width:"95px"}).animate({width:"0px",left:"100%"},speed);
    		$("#navbar a").removeClass("active");
        	$e.addClass("active");
        	$e.find(".bgmove").css({width:"0px",left:"0%"}).stop().animate({width:"95px"},speed); 
    	} 
    }else{
        setTimeout(function(){
            $("#navbar a").removeClass("active");
            $e.addClass("active");  
        },speed/2);
    }
	checksrcoll(page,second,third);
}
function checkmovestep(page,second,third) { 
	$("#menunav").removeClass("c1 c2 c3 c4 c5 c6").addClass("c"+page);
	nowModelN = page; //将目标传进来
	var i = nowModelN - nowModel; //计算运动轨迹  
	nowModelM = Math.abs(i);   
	if (i>0) {
		checkmove(0,second,third);
	}else if (i<0){
		checkmove(1,second,third);
	}else{
		checksecondpage(second,third); 
	}
	
}
function checkthirdopen(page,second,third) {
	$("#faqscontent").removeClass("faqslist_shows");
	if (page==6) {
		if (typeof third != "function") {
			$("#faqslist").removeClass("faqslist_show");
		}
		setTimeout(function(){
			$("#faqs").removeClass("hide"); 
		},1000); 
	}else{
		if ($("#faqslist").is(".faqslist_show")) {
			$("#faqslist").removeClass("faqslist_show");
			setTimeout(function(){
				$("#faqs").addClass("hide");
				checksecondopen(page,second,third);
			},1000); 
			return false;
		}else{
			$("#faqs").addClass("hide");
		}
	}
	checksecondopen(page,second,third);
}
function checksecondopen(page,second,third) {
	if (nowModelN == page) {
		if (parseInt($("#modelsecondlist").css("top")) > "0") {
			checksecondpage(second,third); 
		}else{
			if (second) {
				checksecondpage(second,third);
			}else{
				$("#modelsecondlist").stop().css({top:'0%'}).animate({top:"100%"},{duration: speed/2, easing: "easeInQuad", complete:function(){ 
					checkmovestep(page,second,third);
				}});
			}
		}
		return false;
	}

	if (parseInt($("#modelsecondlist").css("top")) > "0") {
		checkmovestep(page,second,third); 
	}else{
		$("#modelsecondlist").stop().css({top:'0%'}).animate({top:"100%"},{duration: speed/2, easing: "easeInQuad", complete:function(){ 
			checkmovestep(page,second,third);
		}});
	}
}
function checkcolormodel() {
	var ml = (nowModelN-1)*170; 
	if (nowModelN==nowModel) {return false;}
	if ((nowModel - nowModelN) >0) {
		$("#logobg-model .b"+(nowModel)).animate({left:"-100%"},speed);
		$("#logobg-model .b"+(nowModelN)).css({left:"100%"});
	}else{
		$("#logobg-model .b"+(nowModel)).animate({left:"100%"},speed);
		$("#logobg-model .b"+(nowModelN)).css({left:"-100%"});
	}
	$("#logobg-model .b"+(nowModelN)).stop().animate({"left":"0%"},speed+(Mdelay*nowModelM));
}
function finishedmove() {
	canmove = true;
	$("a").removeClass("noclick");
	checkprevnext();
}
function checksrcoll(page,second,third) {
	var $T = $(window).scrollTop(); 
	if ($T>0) {
		// 此处可能有bug body的滚动条是否在其他游览器中也好用.
		$("body,html").animate({scrollTop:"0"},400,function(){
			checkthirdopen(page,second,third);
		});
	}else{
		checkthirdopen(page,second,third);
	}
	
}
function checksecondpage(second,third) { 
	if (second) {
		$("#modelsecondlist .model").addClass("hide");
		$("#mode"+nowModelN+"_second").removeClass("hide");
		$("#modelsecondlist").stop().animate({top:"0%"},{duration: speed/2, easing: "easeOutQuad", complete:function(){
			if (typeof third != "undefined" && third) {
				third.call();
			}
		}});
		finishedmove();
	}else{ 
		if (typeof third != "undefined" && third) {
			third.call();
		}
		finishedmove(); 
	}
}
function checkmove(lr,second,third) {  
	//console.log(nowModel + " / "+ nowModelN);
	//console.log("hidemove"+(lr?"right":"left")+nowModel+"()");
	//console.log("showmove"+(lr?"right":"left")+nowModelN+"()");
	$(".model_p").removeClass("intop").removeClass("ontop");
	if (!lr) {
		$("#mode"+nowModelN).addClass("intop");
		$("#mode"+nowModel).addClass("ontop");
	}else{
		$("#mode"+nowModelN).addClass("ontop");
		$("#mode"+nowModel).addClass("intop");
	}


	eval("hidemove"+(lr?"right":"left")+nowModel+"()");
	eval("showmove"+(lr?"right":"left")+nowModelN+"(function(){ checksecondpage("+(second?true:false)+","+(third?third:false)+") })");
	checkcolormodel();
	nowModel = nowModelN;
}
//  hide
function hidemoveleft1() {
	$('#mode1').css({left:"0%"}).animate({left:"-=10%"},speed);
	$('#mode1 .modelbg1').css({left:"0%"}).animate({left:"-=40px"},speed);
	$('#mode1 .modelbg2').css({left:"0%"}).animate({left:"-=400px"},speed);
	$("#mode1_content").addClass("zi49").animate({left:"-=10%"},speed,function(){
		$(this).addClass("hide");
	});
}
function hidemoveright1() {
	// none
}
function hidemoveleft2() {
	$('#mode2').css({"left":"0%"}).animate({left:"-100%"},speed); 
	$("#mode2_content").css({left:"50%"}).animate({left:"-100%"},speed,function(){
		$(this).addClass("zi49 hide");
	});
	$('#mode2 .modelbg2').css({left:"460px"}).animate({left:"0px"},(speed)*4/5); 
	$('#modellist .stuff5').css({left:"426px"}).animate({'left':"-1280px"},speed+1000);
}
function hidemoveright2() {
	$('#mode2').css({"left":"0%"}).animate({left:"100%"},speed); 
	$("#mode2_content").css({left:"50%"}).animate({left:"100%"},speed-500,function(){
		$(this).addClass("zi49 hide");
	});
	$('#modellist .stuff1').css({left:"-546px"}).animate({'left':"1280px"},speed);
	$('#modellist .stuff5').css({left:"426px"}).animate({'left':"1280px"},speed);
}
function hidemoveleft3() {
	$('#mode3').css({"left":"0%"}).animate({left:"-10%"},speed);
	$("#mode3_content").addClass("zi49").css({left:"50%"}).animate({left:"-=10%"},speed,function(){
		$(this).addClass("hide");
	});
	$('#mode3 .modelbg1').css({left:"0px"}).animate({left:"-200px"},speed);
	$('#modellist .stuff2').css({'right':"-381px"}).animate({right:'1280px'},speed/2);
}
function hidemoveright3() {
	$('#mode3').css({"left":"0%"}).animate({left:"100%"},speed);
	$("#mode3_content").css({left:"50%"}).animate({left:"140%"},speed,function(){
		$(this).addClass("zi49 hide");
	});
	$('#mode3 .modelbg1').css({left:"0px"}).animate({left:"-200px"},speed);
	$('#modellist .stuff2').css({'right':"-381px"}).animate({'right':"-762px"},speed/4);
}
function hidemoveleft4() {
	$('#mode4').css({"left":"0%"}).animate({left:"-10%"},speed);
	$("#mode4_content").addClass("zi49").css({left:"50%"}).animate({left:"40%"},speed,function(){
		$(this).addClass("hide");
	});
	$('#mode4 .modelbg1').css({left:"0px"}).animate({left:"100px"},speed);
	$('#modellist .stuff2').css({'right':"899px"}).animate({right:'1280px'},speed/2);
}
function hidemoveright4() {
	$('#mode4').css({"left":"0%"}).animate({left:"100%"},speed);
	$("#mode4_content").css({left:"50%"}).animate({left:"120%"},speed,function(){
		$(this).addClass("zi49 hide");
	});
	$('#mode4 .modelbg1').css({left:"0px"}).animate({left:"100px"},speed);
	$('#modellist .stuff2').css({right:"899px"}).animate({right:'-762px'},(speed));
}
function hidemoveleft5 () {
	$('#mode5').css({"left":"0%"}).animate({left:"-10%"},speed); 
	$("#mode5_content").addClass("zi49").css({left:"50%"}).stop().animate({left:"20%"},speed,function(){
		$(this).addClass("hide");
	});
	$('#mode5 .modelbg1').css({left:"0px"}).animate({left:"-200px"},speed);
	$('#mode5 .stuff3').css({'left':"-155px"}).animate({'left':"-610px"},speed);
}
function hidemoveright5() {
	$('#mode5').css({"left":"0%"}).animate({left:"100%"},speed);
	$("#mode5_content").css({left:"50%"}).stop().animate({left:"140%"},speed,function(){
		$(this).addClass("zi49 hide");
	});
	$('#mode5 .modelbg1').css({left:"0px"}).animate({left:"200px"},speed);
	$('#mode5 .stuff3').css({'left':"-155px"}).animate({'left':"-305px"},speed,function(){
		$(this).animate({left:"0px"},800);
	});
} 
function hidemoveleft6() {

}
function hidemoveright6() {
	$('#mode6').css({"left":"0%"}).animate({left:"100%"},speed);
	$("#mode6_content").css({left:"50%","margin-left":"-200px"}).animate({left:"110%","margin-left":"0px"},speed,function(){
		$(this).addClass("zi49 hide");
	});  
	$('#modellist .stuff4').css({left:"-760px"}).animate({left:"1280px"},speed);
	$('#mode6 .modelbg2').css({left:"0px"}).animate({left:"300px"},speed);
}
// show
function showmoveright1(callback) {
	$('#mode1').css({"left":"-10%"}).animate({left:"0%"},speed);
	$("#mode1_content").removeClass("hide").animate({left:"+=10%"},speed,function(){
		$(this).removeClass("zi49");
	});
	$('#mode1 .modelbg1').css({left:"-40px"}).animate({left:"+=40px"},speed);
	$('#mode1 .modelbg2').css({left:"-400px"}).animate({left:"+=400px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveleft2(callback) {
	$('#mode2').css({"left":"100%"}).animate({left:"0%"},speed);
	$("#mode2_content").removeClass("zi49").removeClass("hide").css({left:"100%","margin-left":"0px"}).animate({left:"50%","margin-left":"-200px"},speed);
	$('#modellist .stuff5').css({left:"1280px"}).animate({'left':"426px"},speed);
	$('#modellist .stuff1').css({left:"1280px"}).animate({'left':"-687px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveright2(callback) {
	$('#mode2').css({"left":"-100%"}).animate({left:"0%"},speed); 
	$("#mode2_content").removeClass("zi49").removeClass("hide").css({left:"-100%","margin-left":"0px"}).animate({left:"50%","margin-left":"-200px"},speed);
	$('#modellist .stuff5').css({left:"-1280px"}).animate({'left':"426px"},speed);
	$('#mode2 .modelbg1').css({left:"200px"}).animate({left:"0px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveleft3(callback) {
	$('#mode3').css({"left":"100%"}).animate({left:"0%"},speed);
	$("#mode3_content").removeClass("zi49").removeClass("hide").css({left:"120%","margin-left":"0px"}).animate({left:"50%","margin-left":"-200px"},speed);
	$('#mode3 .modelbg1').css({left:"-200px"}).animate({left:"0px"},speed);
	$('#modellist .stuff2 img').fadeIn(speed);
	$('#modellist .stuff2').css({'right':"-762px"}).animate({'right':"-381px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveright3(callback) {
	$('#mode3').css({"left":"-10%"}).animate({left:"0%"},speed);
	$("#mode3_content").addClass("zi49").removeClass("hide").stop().css({left:"40%","margin-left":"-200px"}).animate({left:"50%"},speed,function(){
		$(this).removeClass("zi49");
	});
	$('#mode3 .modelbg1').css({left:"-200px"}).animate({left:"0px"},speed);
	$('#modellist .stuff2 img').fadeIn(speed);
	$('#modellist .stuff2').stop().animate({'right':"-381px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveleft4(callback) {
	$('#mode4').css({"left":"100%"}).animate({left:"0%"},speed); 
	$('#mode4 .modelbg1').css({left:"100px"}).animate({left:"0px"},speed,function(){
		if (callback) { callback(); }
	});
	$("#mode4_content").removeClass("zi49").removeClass("hide").stop().css({left:"150%"}).animate({left:"50%"},speed);
	$('#modellist .stuff2 img').fadeOut(speed);
	$('#modellist .stuff2').stop().animate({right:'899px'},speed);
}
function showmoveright4(callback) {
	$('#mode4').css({"left":"-10%"}).animate({left:"0%"},speed);
	$("#mode4_content").addClass("zi49").removeClass("hide").css({left:"20%"}).animate({left:"50%"},speed,function(){
		$(this).removeClass("zi49");
	});
	$('#modellist .stuff2 img').fadeOut(speed);
	$('#modellist .stuff2').css({'right':"1280px"}).animate({right:'950px'},speed);  //compter
	$('#mode4 .modelbg1').css({left:"100px"}).animate({left:"0px"},speed,function(){
		if (callback) { callback(); }
	});
}
function showmoveleft5(callback) {
	$('#mode5').css({"left":"100%"}).animate({left:"0%"},speed);
	$("#mode5_content").removeClass("zi49").removeClass("hide").css({left:"140%"}).animate({left:"50%"},speed);
	$('#mode5 .modelbg1').css({left:"200px"}).animate({left:"0px"},speed+500);
	$('#mode5 .stuff3').css({'left':"0px"}).animate({'left':"-155px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveright5(callback) {
	$('#mode5').css({"left":"-10%"}).animate({left:"0%"},speed);
	$("#mode5_content").addClass("zi49").removeClass("hide").css({left:"40%"}).animate({left:"50%"},speed,function(){
		$(this).removeClass("zi49");
	});
	$('#mode5 .modelbg1').css({left:"-200px"}).animate({left:"0px"},speed+500);
	$('#mode5 .stuff3').css({'left':"-610px"}).animate({'left':"-155px"},speed,function(){
		if (callback) { callback(); }
	}); 
}
function showmoveleft6(callback) {
	$('#mode6').css({"left":"100%"}).animate({left:"0%"},speed);  
	$("#mode6_content").removeClass("zi49").removeClass("hide").css({left:"140%","margin-left":"0px"}).animate({left:"50%","margin-left":"-200px"},speed);
	$('#modellist .stuff4').css({left:"1280px"}).animate({left:"-760px"},speed,function(){
		if (callback) { callback(); }
	});
	$('#mode6 .modelbg2').css({left:"300px"}).animate({left:"0px"},speed+1000);
}

/*
 *
 * 滚动条
 *
 *
 */
var scrollMoveObj = null, scrollPageY = 0, scrollY = 0;
var scrollDivList = new Array();
// obj需要添加滚动条的对象 w滚动条宽度 className滚动条样式名称
// obj元素 必须指定高度，并设置overflow:hidden;
// 如要兼容IE6 必须给obj元素 指定 overflow:hidden; 
function jsScroll(obj, w, className)
{
	if(typeof(obj) == 'string')	{
		obj = document.getElementById(obj);
	}
	//当内容未超出现在高度时，不添加滚动条	
	if(!obj || obj.scrollHeight <= obj.clientHeight || obj.clientHeight == 0) {
		return;
	}
	obj.scrollBarWidth = w||6;
	obj.style.overflow = 'hidden';
	obj.scrollBar = document.createElement('div');
	obj.scrollBar.className = "divscrolls";
	obj.appendChild(obj.scrollBar);
	obj.scrollBarIndex = document.createElement('div');
	obj.scrollBar.appendChild(obj.scrollBarIndex);
	obj.scrollBar.style.position = 'absolute';
	obj.scrollBarIndex.style.position = 'absolute';
	obj.scrollBar.className = className || '';
	if(!className) {
		obj.scrollBar.style.backgroundColor = '#ddd';
		obj.scrollBarIndex.style.backgroundColor = '#aaa';
	}
	
	scrollDivList.push(obj);
	scrollResetSize(obj);
	
	//使用鼠标滚轮滚动
	obj.scrollBar.scrollDiv = obj;
	obj.scrollBarIndex.scrollDiv = obj;
	obj.onmousewheel = scrollMove;
	obj.scrollBar.onmousewheel = scrollMove;
	obj.scrollBarIndex.onmousewheel = scrollMove;
	
	//拖动滚动条滚动
	obj.scrollBarIndex.onmousedown = function(evt){
		evt = evt || event;
		scrollPageY = evt.clientY;
		scrollY = this.scrollDiv.scrollTop;
		isScrollMove = true;
		document.body.onselectstart = function(){return false};
		scrollMoveObj = this.scrollDiv;
		if(this.scrollDiv.scrollBar.className == '') {
			this.scrollDiv.scrollBarIndex.style.backgroundColor = '#888';
		}
		return false;
	}
}

//当页面大小发生变化时，重新计算滚动条位置
window.onresize = function(){
	for(var i=0; i<scrollDivList.length; i++) {
		scrollResetSize(scrollDivList[i]);
	}
}

//计算滚动条位置
function scrollResetSize(o) {
	if(o.scrollHeight <= o.clientHeight) {
		o.scrollTop = 0;
		o.scrollBar.style.display = 'none';
	} else {
		o.scrollBar.style.display = 'block';
	}
	var x=0, y=0;
	var p = o;
	while(p) {
		x += p.offsetLeft;
		y += p.offsetTop;
		p = p.offsetParent;
	}
	var borderTop = parseInt(o.style.borderTopWidth||0);
	var borderBottom = parseInt(o.style.borderBottomWidth||0);
	o.scrollBar.style.width = o.scrollBarWidth + 'px';
	o.scrollBar.style.height = o.clientHeight + 'px';
	// o.scrollBar.style.top = y + borderTop + 'px';
	// o.scrollBar.style.left = x + o.offsetWidth - o.scrollBarWidth + 'px';
	o.scrollBar.style.top = '30px';
	o.scrollBar.style.right = '0px';
	o.scrollBarIndex.style.width = o.scrollBarWidth + 'px';
	var h = o.clientHeight - (o.scrollHeight - o.clientHeight);
	//当滚动条滑块最小20个像素
	if(h < 20) {
		h = 20;
	}
	o.scrollBarHeight = h;
	o.scrollBarIndex.style.height = h + 'px';
	o.scrollBarIndex.style.left = '0px';
	setScrollPosition(o);
}

function setScrollPosition(o) {
	o.scrollBarIndex.style.top = (o.clientHeight - o.scrollBarHeight) * o.scrollTop / (o.scrollHeight - o.clientHeight) + 'px';
}

document.documentElement.onmousemove = function(evt){
	if(!scrollMoveObj)return;
	evt = evt || event;
	var per = (scrollMoveObj.scrollHeight - scrollMoveObj.clientHeight) / (scrollMoveObj.clientHeight - scrollMoveObj.scrollBarHeight)
	scrollMoveObj.scrollTop = scrollY - (scrollPageY - evt.clientY) * per;
	setScrollPosition(scrollMoveObj);
}
document.documentElement.onmouseup = function(evt){
	if(!scrollMoveObj)return;
	if(scrollMoveObj.scrollBar.className == '') {
		scrollMoveObj.scrollBarIndex.style.backgroundColor = '#aaa';
	}
	scrollMoveObj = null;
	document.body.onselectstart = function(){return true};
}

// 鼠标滚轮滚动
function scrollMove(evt){
	var div = this.scrollDiv || this;
	if(div.scrollHeight <= div.clientHeight) return true;
	evt = evt || event;
	var step = 20;
	if(evt.wheelDelta < 0) {
		if(div.scrollTop >= (div.scrollHeight - div.clientHeight)) return true;
		div.scrollTop += step;
	} else {
		if(div.scrollTop == 0) return true;
		div.scrollTop -= step;
	}
	setScrollPosition(div);
	
	return false;
}