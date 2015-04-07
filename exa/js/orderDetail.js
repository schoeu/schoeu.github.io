/**
 * Created by schoeu on 2015/3/13.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        zepto:"zepto-mine",
        fastC:"fastC"
    }
});

require(["zepto","fastC"],function($,faseC){
    faseC.attach(document.body);

    $(".gs_dtl").on("click",function(){
        window.location.href="goodsDetail.html"
    });
});