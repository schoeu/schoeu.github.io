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

    //是否能去的回传地址
    var param = getUrlObj(window.location.href);
    if(param.add_userName){
        $(".bigFont").css("display","none");
        $(".hasAddress").css("display","block");
        $(".username").text(decodeURIComponent(param.add_userName));
        $(".phoneNum").text(decodeURIComponent(param.add_phone));
        if(param.addr_info){
            $(".addr_info").text(decodeURIComponent(param.addr_info));
        }else{
            var totalStr = decodeURIComponent(param.add_pre+param.add_city+param.add_area+param.add_street+param.add_address);
            $(".addr_info").text(totalStr);
        }
    }


    //fast click
    fastC.attach(document.body);

    // go to addressDetail page
    $(".or_tips span,header").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    // go to addressList page
    $("header").on("click",function(){
        window.location.href = "addressList.html";
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



    function getUrlObj(str){
        var o = {},arr,
            reg = /([^=&?]+)=([^=&?]+)/g;
        while(arr = reg.exec(str)){
            o[arr[1]] = arr[2];
        }
        return o;
    }
});


