/**
 * Created by Administrator on 2015/2/10.
 */
define(function(){
    'use strict';

    function carous(scroll,ide,isMulp,gap,indeClassName){
        var $cirCtt = $(ide),addHtml = "",gap = gap || 13,
            $carousImg = $(scroll+">div").length,indeClassName = indeClassName || "carouCurrent",
            isMulp = isMulp || false;
        if(isMulp){
            $(scroll).slick({
                infinite: true,
                autoplay:true,
                autoplaySpeed:3000,
                arrows:false,
                centerMode: true
            });
            gap = 15;
        }else{
            $(scroll).slick({
                autoplay:true,
                autoplaySpeed:3000,
                arrows:false
            });
        }
        for(var i=0;i<$carousImg;i+=1){
            addHtml += "<div></div>";
        }
        $cirCtt.append(addHtml).width(gap*$carousImg);
        var $cirCttChild = $cirCtt.children("div");
        $(scroll).on('afterChange', function(event, slick, currentSlide){
            $cirCttChild.removeClass(indeClassName).eq(currentSlide).addClass(indeClassName);
        });
    }
    return carous;
});
