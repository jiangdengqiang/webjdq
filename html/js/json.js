;(function($){
    $.fn.extend({
        "sqlData":function(options){
            var defaults = {
                "url":"../data/new.json",
                "currentPage":1,
                "pageShowNum":3,
                "allPage":"",
                "newData":[]
            }
            var opts = $.extend({},defaults, options);
            this.each(function(){
                /*$.ajax({url:opts.url,success:function(data) {
                    for(var i=0;i<data.length;i++){
                        opts.newData.push(data[i]);
                    }
                }})*/
            })
        }
    })
})(jQuery);