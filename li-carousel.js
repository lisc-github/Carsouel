(function(window){
    function Carousel(){}
    Carousel.prototype = {
        init:function(auto){
            this.container = document.getElementById("li-carousel");
            this.box = document.getElementById("li-box");
            this.box.style.left = 0;
            this.imgBox = this.getByClass("li-pic",this.box);
            this.leftBtn = this.getByClass("li-leftBtn",document)[0];
            this.rightBtn = this.getByClass("li-rightBtn")[0];
            this.len = this.imgBox.length;
            this.width = this.box.offsetWidth/(this.len);
            for(var i=0;i<this.imgBox.length;i++){
                this.imgBox[i].style.width = this.width+"px";
                this.imgBox[i].style.left = this.width*i+"px";
            }
            this.eventBind(auto);
        },
        eventBind:function(auto){
            var _this = this;
            var len = this.len;
            var flag = true;
            var timer,timer2,timer3;
            if(auto){
                timer3 = setInterval(function(){
                    move();
                },auto);
            }
            this.rightBtn.onclick = function(){
                move();
            };
            this.leftBtn.onclick = function(){
                if(flag){
                    var j = 1;
                    var lastChild = _this.box.lastElementChild;
                    var firstChild = _this.box.firstElementChild;
                    _this.box.removeChild(lastChild);
                    _this.box.insertBefore(lastChild,_this.box.firstElementChild);
                    lastChild.style.left = parseInt(firstChild.style.left) - _this.width + "px";
                    flag = !flag;
                    timer2 = setInterval(function(){
                        for(var k=0;k<_this.len;k++) {
                            var l = parseInt(_this.imgBox[k].style.left);
                            _this.imgBox[k].style.left = l + 2 + "px";
                        }
                        j=j+2;
                        if(j >= _this.width){
                            clearInterval(timer2);
                            flag = !flag;
                        }
                    },1);
                }
            };
            _this.container.onmouseover = function(){
                clearInterval(timer3);
            };
            _this.container.onmouseout = function(){
                timer3 = setInterval(function(){
                    move();
                },auto);
            };
            function move(){
                if(flag){
                    var j = 1;
                    var firstChild = _this.box.firstElementChild;
                    var lastChild = _this.box.lastElementChild;
                    _this.box.removeChild(firstChild);
                    _this.box.appendChild(firstChild);
                    flag = !flag;
                    timer = setInterval(function(){
                        for(var k=0;k<_this.len;k++) {
                            var l = parseInt(_this.imgBox[k].style.left);
                            _this.imgBox[k].style.left = l - 2 + "px";
                        }
                        j=j+2;
                        if(j >= _this.width){
                            clearInterval(timer);
                            firstChild.style.left = parseInt(lastChild.style.left) + _this.width + "px";
                            flag = !flag;
                        }
                    },1)
                }
            }
        },
        getByClass:function(classname,parentnode){
            var parent = document;
            if(parentnode){
                parent = parentnode;
            }
            var allNodes = parent.getElementsByTagName("*");
            var arr = [];
            var classlist;
            for(var i=0;i<allNodes.length;i++){
                classlist = allNodes[i].getAttribute("class");
                if(classlist&&classlist.indexOf(classname)!=-1){
                    arr.push(allNodes[i]);
                }
            }
            return arr;
        }
    };
    var c = new Carousel();
    window.carousel = function(auto){
        c.init.call(c,auto);
    }
})(window);