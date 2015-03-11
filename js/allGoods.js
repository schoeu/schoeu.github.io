/**
 * Created by schoeu on 2015/2/6.
 */

require.config({
    baseUrl:"js/common",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC",
        pageTools:"pageTools"
    }
});

require(["zepto","fastC","pageTools"],function($,fastC,pageTools){
    //fast click
    fastC.attach(document.body);

    var $all_keyWord = $("#all_keyWord");
    $(".all_s_iptBor div").eq(1).on('click',function(){
        $all_keyWord.val("");
    });

    //
    $(".all_gds").on("click",function(){
        window.location.href = "goodsDetail.html";
    });


    //back to previous page.
    $(".all_titleImg").on("click",function(){
        window.history.back();
    });

    var $all_selectMenuDIV = $(".all_selectMenu>div");
    $all_selectMenuDIV.eq(0).addClass("isChecked");
    $all_selectMenuDIV.on("click",function(){
        $all_selectMenuDIV.removeClass("isChecked");
        $(this).addClass("isChecked");
    });

    $('.go_top').on("click",function(){
        document.body.scrollTop = 0;
    });

    /**  slidePage part **/
    var $slidePage = $(".slidePage"),winW = window.innerWidth;
    $slidePage.css("-webkit-transform","translateX(-"+winW+"px)");
    $(".all_menuButton").on('click',function(){
        $slidePage.css("-webkit-transform","translateX(0px)").removeClass("opacity0").addClass("transition opacity1");
    });
    $(".sp_header>p:nth-child(2),.sp_listCtt").on('click',function(){
        $slidePage.css("-webkit-transform","translateX(-"+winW+"px)").addClass("opacity0");
    });

    //page helper action.
    pageTools();
});
