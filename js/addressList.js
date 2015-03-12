/**
 * Created by schoeu on 2015/3/12.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        zepto:"zepto-mine",
        fastC:"fastC",
    }
});

require(["zepto","fastC"],function($,fastC){

    fastC.attach(document.body);


    $(".add_addr").on("click",function(){
        window.location.href = "addressDetail.html";
    });

    $(".edit_icon").on("click",function(){
        window.location.href = "addressDetail.html";
    });

});