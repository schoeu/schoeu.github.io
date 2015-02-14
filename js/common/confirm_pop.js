/**
 * Created by schoeu on 2015/2/12.
 */
define(function(){
    'use strict';

    var cartConfirm = function(options){
        return new F(options);
    };

    var F = function(options){
        this.init(options);
        return this;
    };
    F.prototype.init = function(options){
        var that = this;
        if(typeof  options === "object"){
            that.msg = options.msg || "",
            that.showBtn = options.showBtn,
            that.buttonText1 = options.buttonText1 || "确认",
            that.buttonText2 = options.buttonText2 || "取消";
            that.buttonNum = options.buttonNum || 2;
            that.showImg = options.showIcon,
            that.button1ClickFn = options.button1ClickFn || function(){},
            that.button2ClickFn = options.button2ClickFn || function(){};
        }
        var winH = window.innerHeight,winW = window.innerWidth,
            confirmHTML = '<div class="ct_comfirm">';
        if(that.showImg){
            confirmHTML += '<div></div>';
        }
        confirmHTML += '<p>'+that.msg+'</p>';
        if(that.showBtn){
            confirmHTML += '<div class="confirm_btn"><div class="cf_ok">'+that.buttonText1+'</div>';
            if(that.buttonNum === 2){
                confirmHTML += '<div class="cf_cancel">'+that.buttonText2+'</div>';
            }
        }
        $("body").append(confirmHTML+'</div></div>');
        that.$ct_comfirm = $(".ct_comfirm");
        that.$ct_comfirm.css({"left":(winW-240)/2+"px","top":(winH-170)/2+"px"});
        that.show();

        $(".cf_cancel,.cf_ok").on("click",function(e){
            that.hide();
            var target = e.target.className;
            if(target.indexOf("cf_cancel") > -1){
                that.button2ClickFn.call(target);
            }else if(target.indexOf("cf_ok") > -1){
                that.button1ClickFn.call(target);
            }
        });
        $(".ct_rows").on("click",function(){
            that.hide();
        });

        return that;
    };

    F.prototype.show = function(){
        this.$ct_comfirm.css({"display":"block"}).addClass("showConfirm");
    };
    F.prototype.hide = function(){
        var that = this;
        that.$ct_comfirm.removeClass("showConfirm");
        setTimeout(function(){
            that.$ct_comfirm.remove();
        },300);

    };

    return cartConfirm;
});