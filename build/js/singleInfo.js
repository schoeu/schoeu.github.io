require.config({baseUrl:"js/common",paths:{jquery:"jquery-2.1.3.min",pageTools:"pageTools"}}),require(["jquery","pageTools"],function(e,t){var n=e(".slidePage"),r=e(".sp_listCtt"),i=window.innerHeight,s=e("body"),o=window.innerWidth;n.css("-webkit-transform","translateX(-"+o+"px)"),e(".all_menuButton").on("click",function(){n.css("-webkit-transform","translateX(0px)").removeClass("opacity0").addClass("transition opacity1")}),e(".sp_header>p:nth-child(2),.sp_listCtt").on("click",function(){n.css("-webkit-transform","translateX(-"+o+"px)").addClass("opacity0")}),r.height(i-46),t(),e(".all_titleImg").on("click",function(){window.history.back()})});