/**
 * Created by Administrator on 2015/2/13.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC",
        confirm_pop:"confirm_pop",
        sToast:"sToast"
    }
});

require(["jquery","fastC","confirm_pop","sToast"],function($,fastC,confirm_pop,sToast){
    //fast click
    fastC.attach(document.body);

    //confirm dialog
    $(".or_chargeBt2").on("click",function(){
        confirm_pop({
            msg:"需填写收获地址！",
            buttonNum:1,
            buttonText1:"立即填写",
            showIcon:false,
            showBtn:true,
            button1ClickFn:function(){
                window.location.href = "addressDetail.html";
            }
        });
    });

    //alert toast
    $(".or_chargeBt1").on("click",function(){
        sToast({msg:"请完善收获地址！"});
    });

    // go to addressDetail page
    $(".or_tips span,header").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    // go to coupon page
    $(".od-discount").on("click",function(){
        window.location.href = "coupon.html";
    });

});


