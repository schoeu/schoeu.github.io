/**
 * Created by schoeu on 2015/2/14.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC: "fastC"
    }
});

require(["jquery","fastC"],function($,fastC){

    fastC.attach(document.body);

    var rotateFlag = 0,$couponList = $(".couponList");
    $(".couponTt").on("click",function(){
        var cpLstChild = $(this).children(":last-child");
        if(rotateFlag % 2 == 0){
            cpLstChild.addClass("turnRotate");
            $couponList.addClass("zeroHeight")
        }else{
            cpLstChild.removeClass("turnRotate");
            $couponList.removeClass("zeroHeight")
        }
        rotateFlag += 1;
    });

    $("footer>p:last-child").on("click",function(){
        window.history.back();
    });
});