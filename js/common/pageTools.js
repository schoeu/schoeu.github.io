/**
 * Created by Administrator on 2015/2/10.
 */
/**  slidePage part **/
define(function(){
    'use strict';

    function pageTools(){
        var $tools_list = $(".tools_list"),$tools_mng = $(".tools_mng"),times= 1,
            $tools_mngDiv = $(".tools_mng>div");
        $(".tools_list>div,.tools_mng").on('click',function(){
            if(times % 2){
                $tools_list.css("display","block").addClass('opacity1');
                $tools_mngDiv.addClass("turnRedBtn");
            }else{
                $tools_list.removeClass('opacity1');
                $tools_mngDiv.removeClass("turnRedBtn");
                setTimeout(function(){
                    $tools_list.css("display","none");
                },300);
            }
            times ++;
        });
    }
    return pageTools;
});


