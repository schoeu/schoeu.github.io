/**
 * Created by schoeu on 2015/2/10.
 */
require.config({
    baseUrl: 'js/common/',
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC",
        scroll:"scroll",
        carous:"carous",
        pageTools:"pageTools",
        confirm_pop:"confirm_pop"
    }
});

require(["jquery","fastC","scroll","carous","pageTools","confirm_pop"],function($,fastC,scroll,carous,pageTools,confirm_pop){
    //fast click
    fastC.attach(document.body);

    //turn to the all goods page when click the first button of menu bar.
    $(".menu_bar>div").eq(0).on("click",function(){
        window.location.href = "allGoods.html";
    });

    //the button end of the page
    $(".s-allGoods").on("click",function(){
        window.location.href = "allGoods.html";
    });

    //go to the goods detail page when clicked goods images.
    $(".gImg_rows>div,.s_gds,.carousCtt img").on("click",function(){
        window.location.href = "goodsDetail.html";
    });

    //click go top button then go to the top of page.
    $('.go_top').on("click",function(){
        document.querySelector('header').scrollIntoView(true);
    });

    //go to the single goods page when clicked image of object.
    $(".s_imgAd").on('click',function(){
        window.location.href = "singleInfo.html";
    });

    /**  slidePage part **/
    var $slidePage = $(".slidePage"),winW = window.innerWidth;
    $slidePage.css("-webkit-transform","translateX(-"+winW+"px)");
    $(".menu_bar>div").eq(1).on('click',function(){
        $slidePage.css("-webkit-transform","translateX(0px)").removeClass("opacity0").addClass("transition opacity1");
    });
    $(".sp_header>p:nth-child(2),.sp_listCtt").on('click',function(){
        $slidePage.css("-webkit-transform","translateX(-"+winW+"px)").addClass("opacity0");
    });

    //page tools action.
    pageTools();

    //top view and middle view
    carous('.carous','.cirCtt');
    carous('.carousMiddle','.cirCttMiddle');

    $(".s_vipCard>div").on('click',function(){
        confirm_pop({
            msg:"领取成功！请前往个人中心查看~",
            showBtn:true,
            showIcon:false,
            buttonNum:1
        });
    });


});