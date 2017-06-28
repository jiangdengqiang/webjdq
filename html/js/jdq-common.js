;(function($){
$.fn.extend({
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
	"jdqLayer":function(options){
		//默认参数
		var defaults = {
			'title':'这里填写一个标题',//弹出框的标题
			'type':'tips',//弹出框的风格(alert,msg,tips)
			'move':'fadeDown',//弹出框显示的动画
			'width':'500',//弹出框的宽度
			'height':'300',//弹出框的高度
			'msg':"输出的内容",//弹出框的内容
			"closeBtn":true,//是否显示关闭按钮
			"bgframe":false,//是否需要背景层
			"quitTime":'2000',//自动退出的时间间隔，一般和type:'alert'时候配合使用
			"open":function(){}
		}
		var opts = $.extend({},defaults, options);
		var layer = {
			"alert":function(){
				alert("alert");
			},
			"msg":function(){
				alert("msg");
			},
			"tips":function($this){
				var top = $this.offset().top,
					left = $this.offset().left,
					tipsMsg = "<div class='tips' style='top:0; left:"+left+"px;'>"+opts.msg+"</div>";
				return $this.append(tipsMsg);
			}
		};
		this.each(function(){
			var $this = $(this);
			switch(opts.type){
				case 'alert':
				layer.alert($this);
				break;
				case 'msg':
				layer.msg($this);
				break;
				case 'tips':
				layer.tips($this);
				break;
			}
			if(opts.bgframe){
				/*初始化*/
				var layer_bg = "<div class='jdq-frame'></div>";
				$("body").append(layer_bg);
			}
		})
	}
})
})(jQuery);