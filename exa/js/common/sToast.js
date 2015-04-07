/**
 * Created by schoeu on 2015/2/11.
 */
define(function(){
    'use strict';

    /*
     *   sToast({ele:"input",msg:"it is a message",time:2000});
     *   @param msg argument required.
     * */
    function sToast(options){
        if(options){
            var ele = options.ele,
                msg = options.msg || "",
                sec = options.time || 2000;
        }
        var oldT = document.querySelectorAll(".s_toast");
        if(oldT){
            for(var m=0;m<oldT.length;m++){
                oldT[m].style.display = "none";
            }
        }
        var s_body = document.querySelector("body"),timer=null,
            h = window.innerHeight,w = window.innerWidth;
        var st = document.createElement("p");
        st.className = "s_toast";
        st.innerHTML = msg;
        s_body.appendChild(st);
        var th = st.offsetHeight,tw = st.offsetWidth;
        st.style.left = (w-tw)/2+"px";
        st.style.top = (h-th)/2-20+"px";

        //no node for bind
        if(ele){
            document.querySelector(ele).addEventListener("click",ani,false);
        }else{
            ani();
        }

        function ani(){
            st.style.webkitAnimation="stShows "+sec/1000+"s ease-in-out";
            if(timer) clearTimeout(timer);
            timer = setTimeout(function(){
                st.style.webkitAnimation="";
                s_body.removeChild(st);
            },sec);
        }

    }
    return sToast;
});