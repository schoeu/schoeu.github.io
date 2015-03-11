/**
 * Created by schoeu on 2015/2/6.
 */

require.config({
    baseUrl:"js/common/",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC",
        scroll:"scroll",
        carous:"carous",
        pageTools:"pageTools",
        sToast:"sToast",
        Sturns:"sturns"
    }
});

require(["zepto","fastC"/*,"scroll","carous"*/,"pageTools","sToast","Sturns"],function($,fastC/*,s,carous*/,pageTools,st,Sturns){
    //top carous and middle carous
    /*carous('.carous','.cirCtt',true);
    carous('.dtl_carous','.dtl_cirCtt',false,13,"mulpCurren");*/

    var SturnsTop = new Sturns('.sturnsTop',{
        pointerActiveClass:"carouCurrent",
        centerMode:true,
        preventDefault:false
    });

    var SturnsMiddle = new Sturns('.sturnsMiddle',{
        pointerActiveClass:"mulpCurren",
        preventDefault:false,
        pointerPosition:"middelSturns"
    });


    //fast click
    fastC.attach(document.body);

    //scale the footer
    $(".dtl_addBtn,.dtl_goBuy").width(($("footer").width()-134)/2);

    // goods count button
    var $dtl_gdsCt = $("#dtl_gdsCt");
    $(".dtl_mns").on('click',function(){
        $dtl_gdsCt.val($dtl_gdsCt.val() > 0 ? parseInt($dtl_gdsCt.val())-1 : 0);
        if($dtl_gdsCt.val() === '0'){
            $(this).children("p").removeClass("darkMins");
        }
    });


    //click event for plus or subduction goods counts.
    $(".dtl_plus").on('click',function(){
        $dtl_gdsCt.val(parseInt($dtl_gdsCt.val())+1);
        if(+$dtl_gdsCt.val()){
            $(".dtl_mns").children("p").addClass("darkMins");
        }
    });

    //goods introduce tap page
    var $dtl_scr = $(".dtl_scr"),winWidth =$(window).width(),$dtl_touchTapP = $(".dtl_touchTap>p") ;
    $dtl_touchTapP.eq(0).addClass('currentTap');
    $dtl_touchTapP.on("click",function(){
        $dtl_touchTapP.removeClass('currentTap');
        $(this).addClass('currentTap');
        $dtl_scr.css("-webkit-transform","translateX("+ -winWidth*$(this).index() +"px)")
    });

    //stop footer touch default event.
    $("footer").on("touch",function(e){
        e.preventDefault();
    });

    //go top action
    $('body').on("click",".go_top",function(){
        document.body.scrollTop = 0;
    });

    //turn fixed
    var dtl_touchTap = $(".dtl_touchTap"),$body = $("body"),$page_tools = $(".page_tools"),
        $scrollT = $(".dtl_touchTap").prop("offsetTop"),scroTimer = null,addFlag = true;
    $(window).on("scroll",function(){
        clearTimeout(scroTimer);
        scroTimer = null;
        scroTimer = setTimeout(function(){
            if($body.prop("scrollTop") >= $scrollT){
                dtl_touchTap.addClass("turnFixed");
                if(addFlag){
                    //$page_tools.append('<div class="go_top"><div></div></div>');
                    addFlag = false;
                }
            }else{
                dtl_touchTap.removeClass("turnFixed");
                if(!addFlag){
                    //$(".go_top").remove();
                    addFlag = true;
                }
            }
        },10);
    });

    //add to cart
    $(".dtl_addBtn").on("click",function(){
        st({msg:"添加成功"});
    });

    //describe and image action
    $(".dtl_sectionDtl").on("click",function(){
        $(".dtl_touchTap")[0].scrollIntoView(true);
    });

    //collect button action
    var collectIdx = 0;
    $(".dtl_getI").on("click",function(){
        if(collectIdx % 2 == 0){
            st({msg:"收藏成功"});
            $(this).find("span").addClass("collected").end().find("p").text("已收藏").addClass("collectedColor");
        }else{
            st({msg:"取消成功"});
            $(this).find("span").removeClass("collected").end().find("p").text("收藏").removeClass("collectedColor");
        }
        collectIdx++;
    });

    //page conner tools action.
    pageTools();

    //go to cart
    $(".dtl_goodsC").on("click",function(){
        window.location.href = "cart.html";
    });

    // go to addressdetail page
    $(".dtl_goBuy").on("click",function(){
        window.location.href = "addressDetail.html";
    });

});
