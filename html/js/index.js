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
			$("body").on("click",function(event){
				var heart = "<span class='glyphicon glyphicon-heart heart'></span>",
					res="",
					top = $(document).scrollTop(),
					y_top = (event || window.event).clientY,
					x = (event || window.event).clientX,
					y = y_top+top;
				$("body").append(heart);
				location(res);
			})
			var location  = function(colors){
				var color_val = ["#99cc33","#ff9933","#ff99cc","#99ccff","#f08080","#8EE5EE","#8470FF","#CD3700","#F5DEB3","#e7afaf"];
				colors = Math.ceil(Math.random()*10);
				console.log(colors);
			}

		}
	}
	method.scrollHeight();
	method.heart();
})(jQuery);