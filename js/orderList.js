/**
 * Created by schoeu on 2015/3/13.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        zepto:"zepto-mine",
        fastC:"fastC",
        /*scroll:"scroll",
         carous:"carous",*/
        Sturns:"sturns"
    }
});

require(["zepto","fastC","Sturns"],function($,fastC,Sturns){

    fastC.attach(document.body);

    var sturns = new Sturns(".ctt_sturns",{
        noTouch:true,
        pointer:false,
        autoplay:false,
        during:300
    });


    //getUrlParam
    var urlObj = getUrlParam(window.location.href),$headerDiv = $("header>div");;
    changePage(+(urlObj.clkType));


    $headerDiv.on("click",function(){
        var idx = $(this).index();
        changePage(idx);
    });

    // goodsDetail.html
    $(".row img").on("click",function(){
        window.location.href = "goodsDetail.html"
    });

    $(".goodsInfo").on("click",function(){
        window.location.href = "orderDetail.html"
    });

    function changePage(idx){
        $headerDiv.removeClass("activeNav");
        $headerDiv.eq(idx).addClass("activeNav");
        sturns.scrollToPage(idx+1);
    }

    function getUrlParam(str){
        var o={},arr,
            reg = /([^?&=]+)=([^?&=]+)/g;
        while(arr = reg.exec(str)){
            o[arr[1]] = arr[2];
        }
        return o;
    }
});