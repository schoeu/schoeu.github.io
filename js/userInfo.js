/**
 * Created by schoeu on 2015/2/28.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        jquery:"jquery-2.1.3.min",
        fastC:"fastC"
    }
});

require(["jquery","fastC"],function($,fastC){
    fastC.attach(document.body);
});