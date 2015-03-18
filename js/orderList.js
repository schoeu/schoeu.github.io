/**
 * Created by schoeu on 2015/3/13.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        zepto:"zepto-mine",
        fastC:"fastC",
    }
});

require(["zepto","fastC"],function($,fastC){

    fastC.attach(document.body);
    var $headerDiv = $("header>div"),windowW = window.innerWidth;;

    // goodsDetail.html
    $(".row img").on("click",function(){
        window.location.href = "goodsDetail.html"
    });

    $(".goodsInfo").on("click",function(){
        window.location.href = "orderDetail.html"
    });

    function getUrlParam(str){
        var o={},arr,
            reg = /([^?&=]+)=([^?&=]+)/g;
        while(arr = reg.exec(str)){
            o[arr[1]] = arr[2];
        }
        return o;
    }

    $headerDiv.on("click",function(){
        var idx = $(this).index();
        $headerDiv.removeClass("activeNav");
        $headerDiv.eq(idx).addClass("activeNav");
        $(".ctt_stSrc").css("-webkit-transform","translate("+(-windowW*(idx))+"px,0px)");
    });

    var $order_sd = $(".order_sd");
    $(".goToP").on("click",function(){
        $order_sd.addClass("show");
    });

    $(".sd_clTap,.os_alipay,.os_credit,.os_card").on("click",function(){
        $order_sd.removeClass("show");
    });


});