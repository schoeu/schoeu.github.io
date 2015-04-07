/**
 * Created by schoeu on 2015/3/12.
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

    var stotrObj = window.localStorage,$addr_row = $(".addr_row"),$sentTo = $(".sentTo");

    if(stotrObj){
        for(var i=0;i<$addr_row.length;i++){
            $sentTo.removeClass("checked");
        }
        $sentTo.eq(stotrObj.getItem("clkIdx") || 0).addClass("checked");
    }

    //跳转到地址详情页
    $(".add_addr").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    $(".edit_icon").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    //回显选择的地址 跳转到确认支付页面
    $(".addr_info").on("click",function(){
        var rootEle = $(this).parents(".addr_row");

        stotrObj.setItem("clkIdx",rootEle.index());


        var addr_info = $(rootEle).find(".addr_info").text(),
            username = $(rootEle).find(".username").text(),
            phoneNum = $(rootEle).find(".phoneNum").text(),
            totalStr = "addr_info="+addr_info+"&add_userName="+username+"&add_phone="+phoneNum;

        window.location.href = "confirmPage.html?"+totalStr;
    });



});