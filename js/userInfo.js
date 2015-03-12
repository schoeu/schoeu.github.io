/**
 * Created by schoeu on 2015/2/28.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC"
    }
});

require(["zepto","fastC"],function($,fastC){
    fastC.attach(document.body);

    //go to collection page
    $(".ui_collection").on("click",function(){
        window.location.href = "collection.html";
    });

    //go to cart page
    $(".ui_cart").on("click",function(){
        window.location.href = "cart.html";
    });

    //go to recently page
    $(".ui_history").on("click",function(){
        window.location.href = "recently.html";
    });

});