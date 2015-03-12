/**
 * Created by Administrator on 2015/2/13.
 */
require.config({
   baseUrl:"js/common",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC",
        sToast:"sToast"
    }
});

require(["zepto","fastC","sToast"],function($,fastC,sToast){

    var add_pre = document.querySelector("#add_pre"),
        add_city = document.querySelector("#add_city"),
        add_area = document.querySelector("#add_area"),
        add_street = document.querySelector("#add_street");

    //fast click
    fastC.attach(document.body);

    document.querySelector(".add_selects").addEventListener("change",function(e){
        var target = e.target,targetClass =target.id ;
        if(targetClass.indexOf("add_pre") > -1){
            if(target.value !== "0"){
                add_city.parentNode.style.display = "block";
            }else{
                add_city.parentNode.style.display = "none";
                add_area.parentNode.style.display = "none";
                add_street.parentNode.style.display = "none";
                add_city.value = add_area.value = add_street.value = "0";
            }
        }else if(targetClass.indexOf("add_city") > -1){
            if(target.value !== "0"){
                add_area.parentNode.style.display = "block";
            }else{
                add_area.parentNode.style.display = "none";
                add_street.parentNode.style.display = "none";
                add_area.value = add_street.value = "0";
            }

        }else if(targetClass.indexOf("add_area") > -1){
            if(target.value !== "0"){
                add_street.parentNode.style.display = "block";
            }else{
                add_street.parentNode.style.display = "none";
                add_street.value = "0";
            }
        }else if(targetClass.indexOf("add_street") > -1){
        }
    });

    //确定后跳转至confirmPage.html
    $(".ensureBtn").on("click",function(){

        var $userName = $("#add_userName").val(),
            $add_phone = $("#add_phone").val(),
            $add_pre = $("#add_pre").val(),
            $add_city = $("#add_city").val(),
            $add_area = $("#add_area").val(),
            $add_street = $("#add_street").val(),
            add_address = $("#add_address").val();

        var returnStr = "add_userName="+$userName+"&add_phone="+$add_phone+
            "&add_pre="+$add_pre+"&add_city="+$add_city+"&add_area="+$add_area
            +"&add_phone="+$add_street+"&add_address="+add_address;

        //回显
        //window.postMessage(returnStr,"*");
        window.location.href = "confirmPage.html?"+returnStr;
    })

});