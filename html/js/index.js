;(function($){
	var method = {
/*返回顶部*/
		scrollHeight:function(){
			$(window).scroll( function() {
				var _top = $(document).scrollTop();
				if(_top>0){
					$(".callback").fadeIn();
				}else {
					$(".callback").fadeOut();
				}
			});
			$(".callback").on("click",function(){
				$("body,html").animate({scrollTop:"0px"},500);
			})
		},
/*点击心心*/
		heart:function(){
			var i = 0;
			$("body").on("click",function(event){
				i++;
				var res="",
					heart = "<span class='glyphicon glyphicon-heart heart num"+i+"'></span>",
					top = $(document).scrollTop(),
					y_top = (event || window.event).clientY,
					x = (event || window.event).clientX,
					y = y_top+top;
				$("body").append(heart);
				$(".num"+i).css({"color":location(),"top":y,"left":x}).animate({"top":y-80,"opacity":0.6},1000,function(){
					$(this).remove();

				});
			})
			var location  = function(){
				var color_val = ["#99cc33","#ff9933","#ff99cc","#99ccff","#f08080","#8EE5EE","#8470FF","#CD3700","#F5DEB3","#e7afaf"],
				id = Math.floor(Math.random()*10),
				colors = color_val[id];
				return colors;
			}
		},
/*导航栏*/
		nav:function(){
			$(".nav_link").on("click",function(){
				$(".menu").stop().toggleClass("menu_run");
				$(this).stop().toggleClass("open");
			})
		},
/*点赞（正在开发中）*/
		link:function(){
			$(".feel span").click(function(ev){
				ev.stopPropagation();
			})
		},
/*分享按钮*/
		share:function(){
			window._bd_share_config={
				"common":{
					"bdSnsKey":{},
					"bdText":"",
					"bdMini":"2",
					"bdPic":"www.jdqhy299.com/webjdq/html/images/logo.png",
					"bdMiniList":false,
					"bdStyle":"1",
					"bdSize":"32"
				},
				"share" : [
				],
			};
			with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
		},
/*link*/
		hrefLink:function(){
			var url = window.location.href;
			if (url.indexOf("?id") != -1) {
				strs = url.split("?")[1].split("=")[1];
				$.ajax({
					url: "../data/new.json",
					dataType:"json",
					success: function(data){
						$.each(data,function(i){
							if(strs.indexOf("#")!=-1){
								strs = strs.substring(0,strs.indexOf("#"));
							}
							if(strs == data[i].id){
								var w=url.indexOf("id");
								var NewUrl = url.substring(0,w);
								$("title").html(data[i].title);
								$(".new-content").html(data[i].msg);
								$(".new h2").html(data[i].title);
								$(".myself").html(data[i].from);
								data[i].from == "转载"?$(".myself").addClass("reprint"):false;
								data[i].id-1>0?$(".new-prev span").html(data[i-1].title)&&$(".new-prev").attr("href",NewUrl+"id="+data[i-1].id):$(".new-prev span").html("没有了")&&$(".new-prev").attr("href","javascript:;");
								data[i].id+1<=data.length?$(".new-next span").html(data[i+1].title)&&$(".new-next").attr("href",NewUrl+"id="+data[i+1].id):$(".new-next span").html("没有了")&&$(".new-next").attr("href","javascript:;");
							}
						})
					},
					error:function(){
						alert("此新闻已经被删除");
					}

				});
			}
		}
	}
	method.scrollHeight();
	method.heart();
	method.nav();
	method.link();
	method.share();
	$.fn.extend({
		"jdqSlider":function(options){
			//默认参数
			var defaults = {
				'el':'.img',//图片的外层
				'speed':500,//动画执行的时间
				'switchBtn':true,//是否显示左右按钮
				'numBtn':true,//是否显示数字按钮
				'eventMode':'',//轮播的启动事件
				'auto':false,//是否启动自动轮播
				'loop':true,//是否循环轮播
				'pause':20000,//自动轮播时停留时间
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
							return '<ul class="imgbtn" style="position:absolute;left:50%;bottom:20px;z-index:2;" >'+list+'</ul>';
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
					imgLen.parent().css({'float':'left','width':opts.width,'height':opts.height==''?$(opts.el).height():opts.height});
					numlist.push(jNumList);
				}
				if(opts.numBtn){
					$(this).append($(common.imgNum(numlist.join(""))));
					var numWidth = $(".imgbtn").width(),
						center = numWidth/2,
						Numli = $this.find(".imgbtn").find("li");
					$(".imgbtn").css("margin-left",-center+'px');
					/*鼠标滑入原点事件*/
					Numli.on("click",function () {
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
		}
	})
	$(window).load(function(){
		method.hrefLink();
		$(".jdqslider").jdqSlider({'width':300});
	})
})(jQuery);