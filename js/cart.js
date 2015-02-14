/**
 * Created by schoeu on 2015/2/11.
 */
require({
    baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC",
        confirm_pop:"confirm_pop"
    }
});

require(["jquery","fastC","confirm_pop"],function($,fastC,cartConfirm){

    // selected the check box.
    var rowsFlag = 0,$ck_iconDiv = $(".ck_icon");

    //fast click
    fastC.attach(document.body);

    //go to goods detail page
    $(".ct_rowCtt>p").on("click",function(){
        window.location.href = "goodsDetail.html";
    });

    // self goods count change action
    $(".ct_plus").on("click",function(){
        var selfIpt = $(this).prev().children("input");
        selfIpt.val(parseInt(selfIpt.val())+1);
    });

    $(".ct_reduce").on("click",function(){
        var selfIpt = $(this).next().children("input");
        if(+selfIpt.val() > 1){
            selfIpt.val(parseInt(selfIpt.val())-1);
        }
    });


    var $ft_priceSpan = $(".ft_price>span"),$ck_icon = $(".ck_icon"),$ft_chargeNow = $(".ft_chargeNow>p"),
        $ct_checkIcon = $(".ct_checkIcon");
    $(".ck_icon,.ct_checkIcon,.ct_reduce,.ct_plus").on("click",function(e){
        var currentParent = $(this).parents(".ct_rows");
            classNm = e.target.className,totleFlag = true,chargeBtn= false;

        if(classNm.indexOf("ct_checkIcon") > -1){
            var isCk = +currentParent.find(".ct_checkIcon").prop("dataset").check;
            if(isCk){
                currentParent.find(".ct_checkIcon").removeClass("checkedIcon").prop("dataset").check = 0;
            }else{
                currentParent.find(".ct_checkIcon").addClass("checkedIcon").prop("dataset").check = 1;
            }
        }else if(/^ct_reduce|ct_plus$/ig.test(classNm)){
            currentParent.find(".ct_checkIcon").addClass("checkedIcon").prop("dataset").check = 1;
        }else if(e.currentTarget.className.indexOf("ck_icon") > -1){
            var ck_iconCk = +$(this).prop("dataset").check;
            if(ck_iconCk){
                $ck_iconDiv.removeClass("checkedIcon");
                $ct_checkIcon.removeClass("checkedIcon");
                for(var c=0;c<$ct_checkIcon.length;c++){
                    $ct_checkIcon.eq(c).prop("dataset").check = 0;
                }
                $(this).children('div').removeClass("checkedIcon");
                $(this).prop("dataset").check = 0;
            }else{
                $ck_iconDiv.addClass("checkedIcon");
                $ct_checkIcon.addClass("checkedIcon");
                for(var d=0;d<$ct_checkIcon.length;d++){
                    $ct_checkIcon.eq(d).prop("dataset").check = 1;
                }
                $(this).children('div').addClass("checkedIcon");
                $(this).prop("dataset").check = 1;
            }
        }

        var priceSum = tempSinglePri = tempIpt= 0,$ct_rows = $(".ct_rows"),
            rowsLen = $ct_rows.length;

        for(var n=0;n<rowsLen;n++){
            var crRows = $ct_rows.eq(n),
                checkFlag = +crRows.find(".ct_checkIcon").prop("dataset").check;
            if(checkFlag){
                tempIpt = +crRows.find("input").val();
                tempSinglePri = +crRows.find(".ct_price>span").text();
                priceSum += tempIpt * tempSinglePri;
                chargeBtn = true;
            }else{
                totleFlag = false;
            }
        }

        $ft_priceSpan.text("￥"+priceSum);

        if(totleFlag){
            $ck_icon.children('div').addClass("checkedIcon");
            $ck_icon.prop("dataset").check = 1;
        }else{
            $ck_icon.children('div').removeClass("checkedIcon");
            $ck_icon.prop("dataset").check = 0;
        }

        if(chargeBtn){
            $ft_chargeNow.addClass("grayStyle");
        }else{
            $ft_chargeNow.removeClass("grayStyle");
        }
    });

    //comfirm
    var $ct_comfirm = $(".ct_comfirm");
    $("header :last-child").on("click",function(){
        if(!$(".ct_comfirm").length){
            if($ft_chargeNow.hasClass("grayStyle")){
                //cartConfirm({msg:"数据请求超时，您可以选择？",showBtn:true,buttonText1:"刷新重试",buttonText2:"继续等待"});
                cartConfirm({msg:"是否确认删除已选商品？",showBtn:true,showIcon:true});
            }else{
                cartConfirm({msg:"请选择要删除的商品",showBtn:false,showIcon:true});
            }
        }
    });

    //press ok buttom
    $('body').on("click",".cf_ok",function(){
        $(".checkedIcon").parents(".ct_rows").remove();
        $ft_priceSpan.text("￥0");
    });

    $(".ft_chargeNow>p").on("click",function(){
        if($(this).hasClass("grayStyle")){
            location.href = "confirmPage.html";
        }
    });
});