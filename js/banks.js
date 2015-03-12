/**
 * Created by schoeu on 2015/3/11.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        zepto:"zepto-mine",
        fastC:"fastC"
    }
});

require(["zepto","fastC"],function($,fastC){
    fastC.attach(document.body);

    var $bk_rowDiv = $(".bk_row>div");
    var isCredit = getUrlObj(window.location.href);
    if(isCredit.isCredit !== "1"){
        $bk_rowDiv.each(function(){
            $(this).text($(this).text().replace("信用","储蓄"));
        });
    }

    $("header>div:first-child").on("click",function(){
        window.history.back();
    });

    function getUrlObj(str){
        var o = {},a;
        var reg = /([^?=&]+)=([^?=&]+)/g;
        while(a = reg.exec(str)){
            o[a[1]] = a[2];
        }
        return o;
    }

});

