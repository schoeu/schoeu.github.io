define([],function(){function e(e,t,n,r,i){var s=$(t),o="",r=r||13,u=$(e+">div").length,i=i||"carouCurrent",n=n||!1;n?($(e).slick({infinite:!0,autoplay:!0,autoplaySpeed:3e3,arrows:!1,centerMode:!0}),r=15):$(e).slick({autoplay:!0,autoplaySpeed:3e3,arrows:!1});for(var a=0;a<u;a+=1)o+="<div></div>";s.append(o).width(r*u);var f=s.children("div");$(e).on("afterChange",function(e,t,n){f.removeClass(i).eq(n).addClass(i)})}return e});