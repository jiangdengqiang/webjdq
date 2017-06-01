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
		}
	}
	method.scrollHeight();
})(jQuery);