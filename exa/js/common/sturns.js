/*
     Version: 1.0.1
     Author: Schoeu
     update: 2015/3/3
     suports:IE10+ Firefox Chrome Opera Safari Android IOS
     Website: http://schoeu.com
     Docs: http://schoeu.github.io/sturns
     Repo: http://github.com/schoeu/sturns
     Issues: http://github.com/schoeu/sturns/issues
 */

void function (window,s,undefined){
    'use strict';

    //����AMDģʽ
    if (typeof define === 'function' && define.amd) {
        define(function(){
            return s(window,undefined);
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = s(window,undefined);
    } else {
        //��ȫ�ֱ���window
        window.Sturns || (window.Sturns = s(window,undefined));
    }

}(window,function(window,undefined){
    'use strict';

    var Sturns = function(selector,options){
        var centerModeScale;

        options = options || {};

        this.mainEle = document.querySelector(selector);

        //�����Ԫ�ش���������ֱ�ӷ��ء�
        if(!this.mainEle){
            return;
        }

        //��������Ŀ��
        this.mainEleW = this.mainEle.offsetWidth;

        //��������ĸ߶�
        this.mainEleH = this.mainEle.offsetHeight;

        //����ҳ�ĸ�Ԫ��
        this.scrollEle = this.mainEle.children[0];

        //����ҳ������Ԫ��
        this.pages = this.scrollEle.children;

        //��ǰҳ���
        this.currentIndex = 0;

        //����ҳ���
        this.pageWidth = this.pages[0].offsetWidth;

        //����ҳ�߶�
        this.pageHeight = this.pages[0].offsetHeight;

        //�Ƿ��Ѿ��������߽�
        this.isBoundary = true;

        //����Ҳ�ĸ�����¡��Ԫ�ؽڵ�
        this.length = this.scrollEle.children.length;
        this.prevPageIdx = 1;
        if(typeof options === "object"){
            //ˮƽ�����ķ���
            // ltr������   rtl���ҵ���  Ĭ��Ϊ������
            this.direction = options.direction || "ltr";
            //����ʱ�Ļص�����
            this.onScroll = options.onScroll || undefined;

            //��ǰҳ�������֮ǰ�Ļص�����
            this.onScrollBeforeEnd = options.onScrollBeforeEnd || undefined;

            //��ǰҳ������ɵĻص�����
            this.onScrollEnd = options.onScrollEnd || undefined;
            //��ǰҳ������ʼʱ�Ļص�����
            this.onScrollStart = options.onScrollStart || undefined;
            //��ǰҳ������ʼ֮ǰ�Ļص�����
            this.onScrollBeforeStart = options.onScrollBeforeStart || undefined;
            //�Ƿ��Զ��ֲ� Booleanֵ
            this.autoplay = options.autoplay === false ? false : true;

            //ˮƽ���� or ��ֱ����
            this.isVertical = options.isVertical === true ? true : false;

            //��ǰҳ���������������ж�������һҳ��
            // intֵ��Ĭ��Ϊ��ǰҳ��ȵ����֮һ��
            this.boundary = parseInt(options.boundary) || (this.isVertical ? this.mainEleH : this.mainEleW)/5;
            this.prevBoundary = this.boundary;   //���ڻ�ҳʱ�ж��Ƿ�ѭ��

            //�����ͣ�ڲ��������ֹͣ�Զ��ֲ��� Booleanֵ
            this.hoverStop = options.hoverStop === false ? false : true;

            //�Ƿ����þ���ģʽ��Ĭ��Ϊ�����á�
            // ���ú�ǰҳ���������߿��Կ���ǰһ���ͺ�һ������ҳ��һ�ߡ�
            this.centerMode = options.centerMode === true ? true : false;

            //����ʱʹ�����ö�����Ĭ��Ϊ����
            this.animate = options.animate === false ? false : true;

            //�Ƿ����ù���ҳָʾ����Ĭ��Ϊtrue
            this.pointer = options.pointer === false ? false : true;

            //Ĭ�ϵĹ���ҳָʾ��СԲ�����ʽ�� ����CSS��ʽ�����ַ�
            this.pointerClass = options.pointerClass || "s_turnsPointerClass";

            //��ǰ�Ĺ���ҳ����ʽ�� ����CSS��ʽ�����ַ�
            this.activeClass = options.activeClass || "sturns_active";

            //��ǰ�Ĺ���ҳָʾ��СԲ�����ʽ�� ����CSS��ʽ�����ַ�
            this.pointerActiveClass = options.pointerActiveClass || "s_indi_active";

            //����ҳָʾ��������λ�ã�����CSS��ʽ�����ַ�
            this.pointerPosition = options.pointerPosition || "s_indicator";

            //�Ƿ�����ѭ��ģʽ��Ĭ��Ϊ����
            this.circle = options.circle === false ? false : true;

            //���þ���ģʽ�󣬵�ǰҳ��Ǿ���ģʽҳ��Ŀ�ȱ�
            //��ΧΪ0~1֮���С��Ĭ��Ϊ 0.85
            centerModeScale = options.centerModeScale || 0.85;
            this.centerModeScale = centerModeScale > 1 ? 1 : centerModeScale;

            //������������
            this.timingFn = options.timingFn || "ease";

            //��������ʱ��
            this.during = (options.during || 500);
            this.duringSec = this.during/1000;

            //�Զ��ֲ���ʱ�������Ժ���Ϊ��λ
            this.autoplaySpeed = (options.autoplaySpeed || 3000) + this.during;

            //����ʱ�Ƿ���ֹĬ���¼�
            this.preventDefault = options.preventDefault === false ? false : true;

            //����ʱ�Ƿ���ֹĬ���¼�
            this.noTouch = options.noTouch === true ? true : false;

        }

        //�����ʼ��
        this._init();
    }

    Sturns.prototype = {
        //�����캯��ָ��
        constructor: Sturns,

        //�����ʼ��
        _init:function(){
          var that = this,
              scrollEleCls = that.isVertical ? "s_turnsListsV" : "s_turnsLists";

          that._addClass(that.mainEle,"s_turns");
          that._addClass(that.scrollEle,scrollEleCls);

          that.clipWidth = 0;
          that.clipHeight = 0;
          that.clipSize = 0;

          that.moveRange = 0;

          //����ģʽʱ����ǰҳ��С
          if(that.centerMode){
              if(that.isVertical){
                  that.pageHeight = that.mainEleH * that.centerModeScale;
                  that.clipHeight = +((that.mainEleH * (1-that.centerModeScale)/2).toFixed(1));
              }else{
                  that.pageWidth = that.mainEleW * that.centerModeScale;
                  that.clipWidth = +((that.mainEleW * (1-that.centerModeScale)/2).toFixed(1));
              }

              that.clipSize = that.isVertical ? that.clipHeight : that.clipWidth;

          }else{
              that.centerModeScale = 1;
          }

          //����ҳ��С
          that.pageSize = that.isVertical ? that.pageHeight : that.pageWidth;

          //��������
          that._fix();

          var vendor = {
              'Webkit': 'WebkitTransform',
              'Moz': 'MozTransform',
              'O': 'OTransform',
              'ms': 'mstransform'
          }

          //�������
          that.supports = (function(){
              var u = navigator.userAgent;
              var obj = {
                  //�ں�
                  isTrident:  u.indexOf('Trident') > 0  ? "ms" : false,
                  isPresto: !!window.opera ? "Webkit" : false ? "O" : false,
                  isWebKit: u.indexOf('AppleWebKit') > 0 ? "Webkit" : false,
                  isGecko :  u.indexOf('Gecko') > 0 &&  u.indexOf('IE') < 0? "Moz" : false ,

                  //ϵͳ��ƽ̨
                  isAndroid:/android/ig.test(u),
                  isIPhone: /iphone/ig.test(u),
                  isIPad:/ipad/ig.test(u),
              }

              /***
               * transition  IE 8 9 ��֧��
               * transform  IE 8��֧�� IE9дǰ׺
               * gradient IE89 ��֧��
               * classList IE89��֧��
               * **/

              function prefixStyle(str){
                  return {
                      'Webkit': "Webkit"+str.charAt(0).toUpperCase()+str.substring(1),
                      'Moz': "Moz"+str.charAt(0).toUpperCase()+str.substring(1),
                      'O': "O"+str.charAt(0).toUpperCase()+str.substring(1),
                      'ms': "ms"+str.charAt(0).toUpperCase()+str.substring(1),
                      ' ': str,
                  };
              }

              //�豸
              obj.isMobile = u.indexOf('Mobi')>0 || obj.isIPhone || obj.isAndroid || obj.isIPad  ||u.indexOf('480')>0;
              obj.isTablet = u.indexOf('Tablet')>0 || obj.isIPad || u.indexOf('Nexus 7')>0;

              //�¼����
              obj.isTouchPad = (/hp-tablet/gi).test(u);
              obj.hasTouch = 'ontouchstart' in window && !obj.isTouchPad;

              obj.vendor = obj.isWebKit || obj.isGecko || obj.isTrident || obj.isPresto || " ";
              obj.transition =  prefixStyle("transition")[obj.vendor]
              obj.evtStart = obj.hasTouch ? "touchstart" : "mousedown";
              obj.evtMove = obj.hasTouch ? "touchmove" : "mousemove";
              obj.evtEnd = obj.hasTouch ? "touchend" : "mouseup";
              obj.translate = obj.hasTouch ? "WebkitTransform" : prefixStyle("transform")[obj.vendor];

              return obj;
          })();

          //���Լ���
          that.setTransFn = (function(){
              if(that.isVertical){
                  return function(num){
                      //that.scrollEle.style[that.supports.translate] = "translate3d(0px,"+ num +"px,0px)";
                      that.scrollEle.style[that.supports.translate] = "translate3d(0px,"+ num +"px,0px)";
                  }
              }else{
                  return function(num){
                      //that.scrollEle.style[that.supports.translate] = "translate3d("+ num +"px,0px,0px)";
                      that.scrollEle.style[that.supports.translate] = "translate3d("+ num +"px,0px,0px)";
                  }
              }
          })();

          //that.currentPage = -that.pageWidth*(that.centerMode ? 2 : 1);
          that.currentPage = -that._fix.fixTOPage;
          //ʹ��ʼ���ĵ�һҳΪ�ǿ�¡ҳ
          that.setTransFn(-that._fix.fixTOPage+that.clipSize);
          that.currentIndex = Math.abs((that.currentPage+that._fix.fixOZPage)/that.pageSize);


          //������������
          that._move();

          //���
          that._each(that.scrollEle.children,function(idx){
              this.setAttribute("data-sturns-index",idx+1);
              this.setAttribute("index",idx+1);
          });

          //��¡ǰ������Ԫ�ز���ӵ�������
          var tempLastele = that.scrollEle.lastElementChild.cloneNode(true),
              tempFirstele = that.scrollEle.firstElementChild.cloneNode(true);
          that.scrollEle.insertBefore(tempLastele,that.scrollEle.firstElementChild);
          that.scrollEle.appendChild(tempFirstele);

          that.centerMode && fixCenterMode.call(that,that);

          //����ÿ������Ҳ�Ŀ��Ϊҳ����
          that._each(that.pages,function(idx){
              that.isVertical ?
                  this.style.height = that.pageHeight+"px" :
                  this.style.width = that.pageWidth+"px";
          });

          //���ù���ҳ�������Ŀ��
          //that.scrollEle.style.width = (that.centerMode? that.length+4 : that.length+2) * that.pageWidth+"px";
          that.isVertical ?
              that.scrollEle.style.height = (that.centerMode? that.length+4 : that.length+2) * that.pageHeight+"px" :
              that.scrollEle.style.width = (that.centerMode? that.length+4 : that.length+2) * that.pageWidth+"px";

          that._addClass(that.scrollEle.lastElementChild,"s_turnsClone");
          that._addClass(that.scrollEle.firstElementChild,"s_turnsClone");


          //��ʼ�ֲ�
          that.start();

          that._addClass(that.scrollEle.children[that.centerMode ? 2 : 1],that.activeClass);

          //�������ָʾ�����ʼ��ָʾ��
          that.pointer && that.indicator();

          //���ָ����ָʾ��������ʼ��ʼ��ָʾ��λ��
          that.s_indicator && that.pointerPosition && that._addClass(that.s_indicator.parentNode,that.pointerPosition);

          that.run = run;


          //������
          this.aniTimer = null;
          //that.sUtils = sUtils;
        },
        //�����¼�����
        _move:function(){
          var that = this,isDown = false,
              downX = 0, downY= 0,  //���������߿�ʼ����ʱ�����
              moveX = 0,moveY = 0,    //���������߿�ʼ�������ƶ������
              changeX = 0,changeY = 0;    //���������֮��仯�Ĳ�ֵ

          //��ʼ��ק�¼�����
          that.mainEle.addEventListener(that.supports.evtStart,function(e){
              isDown = true;
              downX = that.supports.hasTouch ? e.touches[0].clientX : e.clientX;
              downY = that.supports.hasTouch ? e.touches[0].clientY : e.clientY;
              that.stop();
          });

          //��קʱ�¼�������
          that.mainEle.addEventListener(that.supports.evtMove,function(e){
              //�ж��Ƿ���ק״̬
              if(isDown && !that.noTouch){
                  moveX = that.supports.hasTouch ? e.touches[0].clientX : e.clientX;
                  moveY = that.supports.hasTouch ? e.touches[0].clientY : e.clientY;
                  changeX = moveX - downX;
                  changeY = moveY - downY;
                  //TODO
                 /* clearTimeout(that.aniTimer);
                  that.aniTimer = null;
                  that.aniTimer = setTimeout(function(){
                      that.setTransFn(that.currentPage+(that.isVertical ? changeY : changeX)+that.clipSize);
                      that.onScroll && that.onScroll.call(that,that.currentIndex,{moveX:moveX,moveY:moveY});
                  },5);*/

                  that.setTransFn(that.currentPage+(that.isVertical ? changeY : changeX)+that.clipSize);
                  that.onScroll && that.onScroll.call(that,that.currentIndex,e);
              }
              //��ֹĬ���¼�
              that.preventDefault && e.preventDefault();
          });

          //��ק�¼��������
            that.mainEle.addEventListener(that.supports.evtEnd,function(e){
              isDown = false;

              //������޷��ֲ�������£� �ֲ�����һҳ���ٲ����󻮣����һҳ�����һ�
              if(!that.circle){
                  if((that.currentIndex === 1 && that.isBoundary && (that.isVertical ? changeY : changeX) > 0) ||
                      (that.currentIndex === that.length && that.isBoundary && (that.isVertical ? changeY : changeX) < 0)){
                      that.boundary = that.mainEleW*this.length;
                  }
              }
              //����ʱ�ж��߽�
              var changedPX = that.isVertical ? changeY : changeX;
              if(Math.abs((that.isVertical ? changeY : changeX)) > that.boundary){
                  changedPX > 0 ? that.prev() : that.next();
              }else{

                  //�����޲�ֵ���ߵ���򲻴�������
                  if(changedPX !== 0){
                      that.animate && that._ani();
                      that.setTransFn(that.currentPage+that.clipSize);
                  }
              }

              !that.circle && that.isBoundary && (that.boundary = that.prevBoundary);

              that.start();

              //��ֵ���㣬�Է���������ֲ�
              changeY = 0;
              changeX = 0;

              //��ֹ�¼�ð��
              e.stopPropagation();
          });

          if(!that.supports.hasTouch){
                //����hoverStop�¼���ֻ���PC
                that.mainEle.addEventListener("mouseover",function(){
                    if(that.hoverStop){
                        that.stop();
                    }
                });
                that.mainEle.addEventListener("mouseleave",function(){
                    that.start();
                });
          }
        },

        //����ģ��  TODO
        _fix : function(){
            this._fix = {
                fixTOPage : (this.centerMode?2:1) * this.pageSize,
                fixOZ : this.centerMode?1:0,
                fixOZPage : (this.centerMode?1:0) * this.pageSize
            }
        },
        //����ģ��
        _ani : function(){
            var _ = this;

            _.scrollEle.style[_.supports.transition] = "all "+ _.duringSec +"s "+ _.timingFn;
            //_.scrollEle.style.WebkitTransition = "all "+ _.duringSec +"s "+ _.timingFn;
            setTimeout(function(){
                _.scrollEle.style[_.supports.transition] = "";
                //_.scrollEle.style.WebkitTransition = "";
            },_.during)
        },
        //scrollBy �������پ���
        scrollBy : function(pxNum){
            this.animate && this._ani();
            this.setTransFn(this.currentPage+pxNum);
        },
        //scrollTo ����������
        scrollTo : function(pxNum){
            this.animate && this._ani();
            this.setTransFn(pxNum);
        },
        //scrollTo ������ָ��ҳ
        scrollToPage : function(pageNum){
            this.animate && this._ani();
            //var realPageNum = this.length-(this.centerMode?4 : 2);
            pageNum = pageNum > this.length ? this.length : pageNum;

            this.setTransFn(this.clipSize-this.pageSize*(pageNum+this._fix.fixOZ));

            this.currentPage = -this.pageSize*(pageNum+this._fix.fixOZ);
        },
        //��ʼ����
        start : function(){
            var _ = this;
            if(_.hoverStop && _.autoplay){
                _.stop();
                _.timer = setInterval(function(){_.run(_)},_.autoplaySpeed);
            }
        },

        //����ָʾ����ʼ��
        indicator : function(){
            var _ = this,insertHtml = "";

            var s_indicator = document.createElement("div");
            s_indicator.className = "s_indicator";
            s_indicator.innerHTML = "<div></div>";
            _.mainEle.appendChild(s_indicator);
            _.s_indicator = _.mainEle.querySelector(".s_indicator>div");

            for(var i= 0,l = this.length;i<l;i++){
                insertHtml += "<div></div>"
            }
            _.s_indicator.innerHTML = insertHtml;

            _._each(_.s_indicator.children,function(el){
                _._addClass(this,_.pointerClass);
            });

            //����ָʾ����� ����
            _.s_indicator.style.width = (_.s_indicator.children[0].getBoundingClientRect().width + 5) * _.length+"px";

            //��ʼ����һ��ָʾ��ѡ��
            _._addClass(_.s_indicator.children[0],_.pointerActiveClass);

        },

        _each : function(obj,fn){
            for(var i= 0,l = obj.length;i<l;i++){
                fn.call(obj[i],i,obj[i]);
            }
        },

        stop : function(obj,fn){
            clearInterval(this.timer);
            this.timer = null;
        },

        //��һҳ
        prev : function(){
            if(/*this.isBoundary &&*/!this.circle && this.currentIndex === 1){
                return;
            }else{
                this.direction = "rtl";
                this.run.call(this,this);
            }
        },

        //��һҳ
        next : function(){
            if(/*this.isBoundary &&*/ !this.circle && this.currentIndex === this.length){
                return;
            }else{
                this.direction = "ltr";
                this.run.call(this,this);
            }
        },

        //class���߷��� Ϊ�˼���IE89,��׿2.3
        _addClass:(function(){
            var div = document.createElement("div");
            if(div.classList){
                return function(el,cls){
                    if(el){
                        el.classList.add(cls);
                    }
                }
            }else{
                return function(el,cls){
                    var className = el.className,
                        reg = new RegExp("\\b"+cls+"\\b","g");
                    if(!new RegExp(cls).test(className)){
                        el.className += " "+cls+" ";
                    }
                }
            }
        })(),
        _removeClass:(function(){
            var div = document.createElement("div");
            if(div.classList){
                return function(el,cls){
                    if(el) {
                        el.classList.remove(cls);
                    }
                }
            }else{
                return function(el,cls){
                    var className = el.className,
                        reg = new RegExp("\\b"+cls+"\\b","g");
                    if(reg.test(className)){
                        el.className = className.replace(reg,"");
                    }
                }
            }
        })(),
        _hasClass:(function(){
            var div = document.createElement("div");
            if(div.classList){
                return function(el,cls){
                    if(el) {
                        el.classList.contains(cls);
                    }
                }
            }else{
                return function(el,cls){
                    var className = el.className,
                        reg = new RegExp("\\b"+cls+"\\b","g");
                    if(reg.test(className)){
                        return true;
                    }
                    return false;
                }
            }

        })()
    };

    //У������ģʽ�¶���Ч��
    var fixCenterMode = function(o){
        //����Ǿ���ģʽ����ǰ�˺ͺ�˷ֱ��¡�����ڵ�
        o.scrollEle.appendChild(o.scrollEle.children[2].cloneNode(true));
        o.scrollEle.insertBefore(o.scrollEle.lastElementChild.previousElementSibling
                .previousElementSibling.previousElementSibling.cloneNode(true),
            o.scrollEle.firstElementChild);

        //��ʶΪ��¡�ڵ����
        o._addClass(o.scrollEle.lastElementChild.previousElementSibling,"s_turnsClone");
        o._addClass(o.scrollEle.firstElementChild.nextElementSibling,"s_turnsClone");
    }

    //ָʾ����������
    var indicatorMove = function(obj){
        var children = obj.s_indicator.children;
        obj._each(children,function(){
            obj._removeClass(this,obj.pointerActiveClass);
        });
        obj._addClass(children[obj.currentIndex-1],obj.pointerActiveClass);
    }


    // �˶�����
    var run = function(obj){
        //������
        obj.moveRange = obj.direction === "rtl" ? obj.pageSize : -obj.pageSize;

        var beforeNum = (obj.currentIndex+(obj.centerMode?0:1))%obj.length+1;
        //����ǰ�ص�
        obj.onScrollBeforeStart && obj.onScrollBeforeStart.call(obj,beforeNum);

        //����ʱ�ص�
        obj.onScrollStart && obj.onScrollStart.call(obj,beforeNum);

        obj.animate && obj._ani();

        obj.setTransFn((obj.currentPage += (obj.moveRange))+obj.clipSize);
        obj.prevPageIdx = obj.currentIndex;

        //������ҳ�����޹�������
        setTimeout(function(){
            var objLth = obj.length+2;

            //TODO
            //�������ҹ���ʱ������������¡ҳ������ת����Ӧ�ķǿ�¡ҳ
            if(obj.circle){
                if(obj.currentPage == ((obj.centerMode?0:1)-objLth)*obj.pageSize) {
                    obj.setTransFn(obj.clipSize - obj._fix.fixTOPage);
                    obj.currentPage = -obj._fix.fixTOPage;
                }
                //�����������ʱ������������¡ҳ������ת����Ӧ�ķǿ�¡ҳ
                if(obj.currentPage == -obj._fix.fixOZPage){
                    obj.setTransFn(obj.clipSize-(objLth-(obj.centerMode?1:2))*obj.pageSize);
                    obj.currentPage = -(objLth-(obj.centerMode?1:2))*obj.pageSize;
                }

            }else{
                var ltrFlag = obj.currentPage == -(obj._fix.fixOZ+obj.length)*obj.pageSize,
                    rtlFlag = obj.currentPage == -obj._fix.fixTOPage;

                if(ltrFlag && obj.direction === "ltr"){
                    obj.direction = "rtl";
                }

                //�����������ʱ������������¡ҳ������ת����Ӧ�ķǿ�¡ҳ
                if(rtlFlag &&  obj.direction === "rtl"){
                    obj.direction = "ltr";
                }

                if(ltrFlag || rtlFlag){
                    obj.isBoundary = true;
                }else{
                    //�߽��־λ��ԭΪfalse��
                    obj.isBoundary = false;;
                }
            }

            //�������֮ǰ�ص�
            obj.onScrollBeforeEnd && obj.onScrollBeforeEnd.call(obj,obj.currentIndex);

            //���㵱ǰҳ
            obj.currentIndex = Math.abs((obj.currentPage+obj._fix.fixOZPage)/obj.pageSize);

            //�������ʱ�ص�
            obj.onScrollEnd && obj.onScrollEnd.call(obj,obj.currentIndex);

            //ָʾ���䶯
            obj.pointer && indicatorMove.call(obj,obj);

            //��ǰҳ���� active��
            obj._each(obj.pages,function(i,ele){
                obj._removeClass(ele,obj.activeClass);
            });

            obj._each(obj.pages,function(i,ele){
                //dataset IE8 9 10 ����֧��  ����
                if(ele.dataset){
                    if(+ele.dataset.sturnsIndex === obj.currentIndex &&
                        !obj._hasClass(ele,"s_turnsClone")){
                        obj._addClass(ele,obj.activeClass);
                    }
                }else{
                    if(+ele.getAttribute("index") === obj.currentIndex &&
                        !obj._hasClass(ele,"s_turnsClone")){
                        obj._addClass(ele,obj.activeClass);
                    }
                }

            });
        },obj.during);
    }

    return Sturns;
});

