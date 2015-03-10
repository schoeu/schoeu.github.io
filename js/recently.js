/**
 * Created by schoeu on 2015/3/10.
 */

require.config({
    baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC"
    }
});

require(["jquery","fastC"],function($,fastC){
    fastC.attach(document.body);

    $(".rt_clear").on("click",function(){
        $(".recently_dtl,header").remove();
        $("body").prepend("<div class='tips'>最近一周没有浏览记录</div>");
    });

});