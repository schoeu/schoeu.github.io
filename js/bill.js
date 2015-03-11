/**
 * Created by schoeu on 2015/2/15.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC",
        confirm_pop:"confirm_pop"
    }
});

require(["zepto","fastC","confirm_pop"],function($,fastC,confirm_pop){

    //fast click
    fastC.attach(document.body);

    $(".bt_title,.be_title,.bc_title").on("click",function(){
        var state = $(this).prop("dataset").state;
        if(state === "off"){
            $(this).children(".idIcon").removeClass("turnRotate").end()
                .prop("dataset").state = "on";

            $(this).parent().removeClass("height45");
        }else if(state === "on"){
            $(this).children(".idIcon").addClass("turnRotate").end()
                .prop("dataset").state = "off";
            $(this).parent().addClass("height45");
        }
    });

    var $cpnName = $("#cpnName"),$be_cpn = $(".be_cpn");
    $(".bt_dtl,.be_bill,.be_cpn,.bc_no,.bc_dtl").on("click",function(e){
        var state = $(this).prop("dataset").check;
        if($(this).siblings().length > 1){
            $(this).children(".checkIcon").removeClass("notCk").addClass("turnChecked").end()
                .prop("dataset").check = "1";
            $(this).siblings().children(".checkIcon").removeClass("turnChecked").addClass("notCk").parent()
                .prop("dataset").check = "0";
            $(this).parent().find(".textCg").text($(this).children("p:nth-child(2)").text());
            if($(this).attr("class") == "be_bill"){
                $cpnName.removeClass("opacity1");
            }
            if($(this).attr("class") == "be_cpn"){
                $cpnName.addClass("opacity1");
            }

        }
    });

    $("footer").on("click",function(){
        if($be_cpn.prop("dataset").check === "1" && !/\S+/.test($cpnName.val())){
            confirm_pop({
                msg:"请填写公司名称",
                buttonNum : 1,
                showBtn : true,
                showIcon: false
            });
        }
    });
});