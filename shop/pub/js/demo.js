/**
 * Created by IAOC on 2015/3/3.
 */

var singleDemo = new Sturns(".singleDemo");

var singleDemoCenter = new Sturns(".singleDemoCenter",{
    autoplay: false,
    centerMode : true,
    circle:false,
});

var singleDemoV = new Sturns(".singleDemoV",{
    autoplay: false,
    circle:false,
    isVertical:true,
    pointer:false,
    onScroll:function(idx,obj){
        //console.log("第"+idx+"页， moveX: "+obj.moveX+" moveY: "+obj.moveY);
    }
});

var singleDemoVCenter = new Sturns(".singleDemoVCenter",{
    autoplay: false,
    centerMode : true,
    isVertical:true,
});

var picDemo = new Sturns(".picDemo",{
    centerMode : true,
    isVertical:false,
    centerModeScale: 0.6
});


/**
 * 上下页按钮
 * */
/*
var prev = document.querySelector("#prev"),
    next = document.querySelector("#next");

prev.addEventListener("click",function(){
    singleDemo.prev();
});

next.addEventListener("click",function(){
    singleDemo.next();
});*/
