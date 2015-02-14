/**
 * Created by schoeu on 2015/2/10.
 */

require.config({
    baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC",
        pageTools:"pageTools"
    }
});

require(["jquery","fastC","pageTools"],function($,fastC,pageTools){
    /**  slidePage part **/
    var $slidePage = $(".slidePage");
    var $sp_listCtt = $(".sp_listCtt"),winH = window.innerHeight,$body = $("body"),
        winW = window.innerWidth;

    //fast click
    fastC.attach(document.body);

    //let slidePage translated when page loading.
    $slidePage.css("-webkit-transform","translateX(-"+winW+"px)");

    //hide slidePage
    $(".all_menuButton").on('click',function(){
        $slidePage.css("-webkit-transform","translateX(0px)").removeClass("opacity0").addClass("transition opacity1");
    });

    //show slidePage
    $(".sp_header>p:nth-child(2),.sp_listCtt").on('click',function(){
        $slidePage.css("-webkit-transform","translateX(-"+winW+"px)").addClass("opacity0");
    });

    //resize the menu list in slidePage
    $sp_listCtt.height(winH - 46);

    //show the page tools.
    pageTools();

    //go back button action
    $(".all_titleImg").on("click",function(){
        window.history.back();
    });
});