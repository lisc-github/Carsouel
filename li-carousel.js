/**
 * Created by admin on 2017/4/14.
 */
(function(window){
    function Carousel(){

    }
    Carousel.prototype = {
        init:function(){
            this.container = document.getElementById("li-container");
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
            this.eventBind();
        },
        eventBind:function(){
            var _this = this;
            var len = this.len;

            var j = 0;
            var timer;
            this.rightBtn.onclick = function(){
                var i = 0;
                var firstChild = _this.box.firstElementChild;
                var lastChild = _this.box.lastElementChild;
                _this.box.removeChild(firstChild);
                _this.box.appendChild(firstChild);

                timer = setInterval(function(){
                    for(var k=0;k<_this.len;k++) {
                        var l = parseInt(_this.imgBox[k].style.left);
                        _this.imgBox[k].style.left = l - 1 + "px";
                    }
                    i = i+2;
                    console.log(i,_this.width);
                    console.log(i>=_this.width);
                    if(i >= _this.width){
                        clearInterval(timer);
                        firstChild.style.left = parseInt(lastChild.style.left) + _this.width + "px";
                    }
                },1)


            };
            this.leftBtn.onclick = function(){
                var lastChild = _this.box.lastElementChild;
                var firstChild = _this.box.firstElementChild;
                _this.box.removeChild(lastChild);
                _this.box.insertBefore(lastChild,_this.box.firstElementChild);
                lastChild.style.left = parseInt(firstChild.style.left) - _this.width + "px";
                _this.box.style.left = parseInt(_this.box.style.left) + _this.width + "px";
            };
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
    window.carousel = function(){
        c.init.call(c);
    }
})(window);