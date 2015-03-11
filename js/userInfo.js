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
});