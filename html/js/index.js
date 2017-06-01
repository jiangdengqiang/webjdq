;(function($){
	var method = {
		scrollHeight:function(){
			$(window).scroll( function() {
				var _top = $(document).scrollTop(),
					_height = $(".author").offset().top;
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

		}
	}
	method.scrollHeight();
	method.heart();
})(jQuery);