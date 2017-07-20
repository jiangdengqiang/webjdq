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
		/*heart:function(){
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
		},*/
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
								if(data[i].href!=""){
									$.ajax({url:data[i].href,success:function(page){
										$(".new-content").html(page);
									}})
								}else {
									$(".new-content").html(data[i].msg);
								}
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
				/*$.ajax({
					url:"../data/jquery/layer.html",
					success:function(data){
						$(".new-content").html(data);
					}

				 "msg":"<iframe id='test' onload='this.height=100' src='../data/jquery/layer.html' width='100%' style='min-height:600px' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>",

				})*/
			}
		}
	}
	method.scrollHeight();
	/*method.heart();*/
	method.nav();
	method.link();
	method.share();
	$(window).load(function(){
		method.hrefLink();
	})
})(jQuery);