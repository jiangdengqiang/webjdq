;(function($){
$.fn.extend({
	/*无缝轮播插件*/
	"jdqSlider":function(options){
		//默认参数
		var defaults = {
			'el':'.img',//图片的外层
			'speed':500,//动画执行的时间
			'switchBtn':true,//是否显示左右按钮
			'numBtn':true,//是否显示数字按钮
			'eventMode':'',//轮播的启动事件
			'auto':true,//是否启动自动轮播
			'loop':true,//是否循环轮播
			'pause':2000,//自动轮播时停留时间
			'width':400,//图片大小-宽度
			'height':''//图片大小-高度
		};
		var opts = $.extend({},defaults, options);
		this.each(function(){
			var $this = $(this),
				imgLen = $this.find("img"),
				j=0,
				maxWidth = opts.width*(imgLen.length+1),
				length = $(opts.el).find("li").length,
				clone = $(opts.el).find("li").first().css({"width":opts.width,"float":"left"}).clone(),//克隆第一张图片
				size = $(opts.el).find("li").size(),
				numlist=[],
				common = new function(){
					this.imgNum = function(list){
						return '<ul class="imgbtn" style="position:absolute;left:50%;bottom:40px;z-index:2;" >'+list+'</ul>';
					},
					this.btn = '<div class="btn btn_l">&lt;</div><div class="btn btn_r">&gt;</div>'
				};
			if(opts.loop){
				$(opts.el).append(clone);//复制到列表最后
				size = $(opts.el).find("li").size();
			}
			if(opts.switchBtn){
				$(common.btn).appendTo(this);
				$('.btn_l').on('click',function(ev){
					ev.stopPropagation();
					j++;
					move();
				})
				$('.btn_r').on('click',function(ev){
					ev.stopPropagation();
					j--;
					move();
				})
			}
			function move(){
				if (j == size) {
					$(opts.el).css({ left: 0 });
					j = 1;
				}
				if (j == -1) {
					$(opts.el).css({ left: -(size - 1) * opts.width });
					j = size - 2;
				}
				$(opts.el).stop().animate({ left: -j * opts.width }, opts.speed);

				if (j == size - 1 && opts.numBtn) {
					$(opts.el).siblings(".imgbtn").find("li").eq(0).addClass("active").siblings().removeClass("active");
				} else {
					$(opts.el).siblings(".imgbtn").find("li").eq(j).addClass("active").siblings().removeClass("active");
				}
			}
			//初始化列表
			$this.css("width",opts.width);
			for(var i=0;i<imgLen.length;i++){
				var jNumList = i == 0 ? '<li class="active" style="cursor: pointer"></li>':'<li style="cursor: pointer"></li>'
				$(opts.el).width(maxWidth);
				imgLen.parent().css({'float':'left','width':opts.width,'height':opts.height==''?$(opts.el).find("img").height():opts.height});
				numlist.push(jNumList);
			}
			if(opts.numBtn){
				$(this).append($(common.imgNum(numlist.join(""))));
				var numWidth = $(".imgbtn").width(),
					center = numWidth/2,
					Numli = $this.find(".imgbtn").find("li");
				$(".imgbtn").css("margin-left",-center+'px');
				/*鼠标滑入原点事件*/
				Numli.on("click",function (ev) {
					ev.stopPropagation();
					var index = $(this).index();//获取当前索引值
					j = index;
					$(opts.el).stop().animate({ left: -index * opts.width }, opts.speed);
					$(this).addClass("active").siblings().removeClass("active");
				});
			}
			if(opts.auto){
				var t = setInterval(function () { j++; move();},opts.pause);
				$(this).hover(function () {
					clearInterval(t);//鼠标悬停时清除定时器
				}, function () {
					t = setInterval(function () { j++; move(); }, 2000); //鼠标移出时清除定时器
				});
			}
		})
	},
	/*弹出框插件*/
	"jdqLayer":function(options){
		//默认参数
		var defaults = {
			'title':'这里填写一个标题',//弹出框的标题
			'type':'tips',//弹出框的风格(alert,confirm,tips,iframe)
			'width':'400',//弹出框的宽度
			'height':'200',//弹出框的高度
			'msg':"默认是tips类型框",//弹出框的内容
			"closeBtn":true,//是否显示关闭按钮
			"bgframe":true,//是否需要背景层
			"btnSureText":"确认",//确认按钮的文字
			"btnCancelText":"取消",//取消按钮的文字
			"quitTime":'1500',//自动退出的时间间隔，一般和type:'tips'时候配合使用
			"url":"",//iframe 访问的链接地址
			"clickSure":function(){},//点击确定按钮后执行回调函数
			"clickCancel":function(){}//点击取消按钮执行回调函数
		}
		var opts = $.extend({},defaults, options),
			jsObj = {},
		 	layer = {
			"alert":function(){
				var layerAlert = '<div class="jdq-alert-layer jdq-slide-down open"><div class="jdq-module">';
				opts.closeBtn?layerAlert+='<a href="javascript:;" class="jdq-icon-close"></a>':layerAlert;
				opts.title!=""?layerAlert+='<h2 class="alert_title">'+opts.title+'</h2>':layerAlert;
				opts.msg!=""?layerAlert+='<div class="jdq-alert-msg">'+opts.msg+'</div>':layerAlert;
				layerAlert+='<div id="btnbox"><button class="jdq-sure-btn sure">'+opts.btnSureText+'</button></div></div></div>';
				$(".jdq-alert-layer.open").remove();
				$("body").append(layerAlert);
				var jdqLayer = $("body").find(".jdq-alert-layer");
				jdqLayer.css({"marginLeft":-(jdqLayer.width()/2),"marginTop":-(jdqLayer.outerHeight()/2)});
				$("body").unbind().delegate("#btnbox button","click",function(){
					layerBtn.closeFrame($(this));
				})
			},
			"confirm":function(){
				var layerAlert = '<div class="jdq-alert-layer jdq-slide-down open"><div class="jdq-module">';
				opts.closeBtn?layerAlert+='<a href="javascript:;" class="jdq-icon-close"></a>':layerAlert;
				opts.title!=""?layerAlert+='<h2 class="alert_title">'+opts.title+'</h2>':layerAlert;
				opts.msg!=""?layerAlert+='<div class="jdq-alert-msg">'+opts.msg+'</div>':layerAlert;
				layerAlert+='<div id="btnbox"><button  class="jdq-sure-btn sure w50">'+opts.btnSureText+'</button><button class="jdq-cancel-btn cancel w50">'+opts.btnCancelText+'</button></div></div></div>';
				$(".jdq-alert-layer.open").remove();
				$("body").append(layerAlert);
				var jdqLayer = $("body").find(".jdq-alert-layer");
				jdqLayer.css({"marginLeft":-(jdqLayer.width()/2),"marginTop":-(jdqLayer.outerHeight()/2)});
				$("body").unbind().delegate("#btnbox button","click",function(){
					if($(this).hasClass("sure")){
						layerBtn.closeFrame($(this));
						return false;
					}
					if($(this).hasClass("cancel")){
						layerBtn.closeFrame($(this));
						return false;
					}
				})
			},
			"tips":function($this){
				var top = $this.offset().top,
					left = $this.offset().left,
					$height = $this.outerHeight();
					jsObj.tipsMsg = "<div class='tips tips_cartoon' style='top:"+(top-40)+"px; left:"+left+"px;'>"+opts.msg+"</div>";
					str = JSON.stringify(jsObj),
					txtMsg = JSON.parse(str);
				if(jsObj){
					$(".tips").remove();
					var objtxt = $this.parents("body").append(txtMsg.tipsMsg);
					$this.parents("body").find(".tips").stop().delay(opts.quitTime).animate({'opacity':0},300,function(){
						$(this).remove();
					});
				}
			},
			"iframe":function($this){
				var layerAlert = '<div class="jdq-iframe-layer jdq-slide-down open"><div class="jdq-module" style="width:'+opts.width+'px;height:'+opts.height+'px;">';
				opts.closeBtn?layerAlert+='<a href="javascript:;" class="jdq-icon-close"></a>':layerAlert;
				opts.title!=""?layerAlert+='<h2 class="alert_title">'+opts.title+'</h2>':layerAlert;
				opts.msg!=""?layerAlert+='<div class="jdq-iframe-page"><iframe src="'+opts.url+'" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" scrolling="auto"></iframe></div>':layerAlert;
				$(".jdq-alert-layer.open").remove();
				$("body").append(layerAlert);
				var iframeHeight = opts.height-$(".alert_title").outerHeight(),
					jdqLayer = $("body").find(".jdq-iframe-layer");
				$(".jdq-iframe-page").find("iframe").height(iframeHeight);
				jdqLayer.css({"marginLeft":-(jdqLayer.width()/2),"marginTop":-(jdqLayer.outerHeight()/2)});
			}
		},
		layerBtn = {
			"closeFrame":function($this){
				$this.parents(".open").animate({'top':'45%','opacity':0},500,function(){
					$(this).remove();
					$(".jdq-layer-bg").fadeOut(200,function(){
						$(this).remove();
						if($this.hasClass("sure"))opts.clickSure();
						if($this.hasClass("cancel"))opts.clickCancel();
					});
				});
			}
		}
		this.each(function(){
			var $this = $(this);
			switch(opts.type){
				case 'alert':
				layer.alert($this);
				break;
				case 'confirm':
				layer.confirm($this);
				break;
				case 'tips':
				layer.tips($this);
				break;
				case 'iframe':
				layer.iframe($this);
				break;
			}
			//背景层初始化
			if(opts.bgframe && opts.type!='tips'){
				/*初始化*/
				var layerBg = '<div class="jdq-layer-bg"></div>';
				$("body").append(layerBg);
				$(".jdq-layer-bg").unbind().bind("click",function(){
					$(this).siblings(".open").animate({'top':'45%','opacity':0},500,function(){
						$(this).remove();
						$(".jdq-layer-bg").fadeOut(200,function(){
							$(this).remove();
						});
					});
				})
			}
			//点击关闭按钮
			if(opts.closeBtn){
				$(document).unbind().delegate(".jdq-icon-close","click",function(){
					layerBtn.closeFrame($(this));
				});
			}
		})
	}
})
})(jQuery);