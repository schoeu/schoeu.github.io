/**
 * Created by Administrator on 2015/2/13.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC",
        confirm_pop:"confirm_pop",
        sToast:"sToast"
    }
});

require(["zepto","fastC","confirm_pop","sToast"],function($,fastC,confirm_pop,sToast){
    //fast click
    fastC.attach(document.body);

    // go to addressDetail page
    $(".or_tips span,header").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    // go to addressDetail page
    $("header").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    // go to coupon page
    $(".od-discount").on("click",function(){
        window.location.href = "coupon.html";
    });

    // go to bill page
    $(".od_lst").on("click",function(){
        window.location.href = "bill.html";
    });

    var pwIdx = 0,preEle=null;
    $(".pw_row").on("click",function(){
        if(preEle != this){
            pwIdx = 0;
        }
        if(pwIdx % 2 == 0){
            $(".pw_row").children(".ct_checkIcon").removeClass("checkedIcon");
            $(this).children(".ct_checkIcon").addClass("checkedIcon");
        }else{
            $(this).children(".ct_checkIcon").removeClass("checkedIcon");
        }
        pwIdx++;
        preEle = this;
    });

    //card and creditCard pay for
    $(".or_confirmBtn").on("click",function(){
        var whichType = $(".checkedIcon").parents(".pw_row").index();

        if(whichType === 0){
            window.location.href = "http://www.taobao.com";
        }else if(whichType === 1){
            window.location.href = "banks.html?isCredit=1";
        }else if(whichType === 2){
            window.location.href = "banks.html";
        }else{
            confirm_pop({
                msg:"需选择支付方式！",
                buttonNum:1,
                buttonText1:"立即选择",
                showIcon:false,
                showBtn:true
            });
        }

    });

});


