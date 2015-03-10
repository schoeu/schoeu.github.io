/**
 * Created by Administrator on 2015/2/13.
 */
require.config({
   baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC",
        sToast:"sToast"
    }
});

require(["jquery","fastC","sToast"],function($,fastC,sToast){

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
        window.location.href = "confirmPage.html";
    })

});