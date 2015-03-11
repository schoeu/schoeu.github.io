/**
 * Created by schoeu on 2015/3/10.
 */
require.config({
    baseUrl:"js/common",
    paths:{
        /*jquery:"jquery-2.1.3.min",*/
        zepto:"zepto-mine",
        fastC:"fastC",
        confirm_pop:"confirm_pop",
    }
});

require(["zepto","fastC","confirm_pop"],function($,fastC,confirm_pop){

    fastC.attach(document.body);

    var $cl_del = $(".cl_del"),$cl_title = $(".cl_title");

    var cl_okIdx = 0;
    $(".cl_ok").on("click",function(){
        if(cl_okIdx % 2 == 0){
            $cl_del.addClass("block");
            $(this).text("完成");
            $cl_title.width($cl_title.width()-20);
        }else{
            $cl_del.removeClass("block");
            $(this).text("编辑");
            $cl_title.width($cl_title.width()+20);
        }
        cl_okIdx ++;
    });

    $cl_del.on("click",function(){
        var _ = this;
        confirm_pop({
            msg:"确认要取消收藏么？",
            showIcon:true,
            showBtn:true,
            button1ClickFn:function(){
                $(_).parents(".cl_rows").remove();
            }
        });
    });


});