//zoom and parallax image on hover and move mouse cursor
(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Zoomarallax = factory();
    }
}(this, function() {
    var Zoomarallax = function (config){
        'use strict';
        var img = config.imgSelector;
        var lgImgData = config.largeImgData;
        if(img) {
            for (var i = 0; i < img.length; i++) {
                var initLgImg = document.createElement('img');
                initLgImg.className = 'zoomarallax_img';
                initLgImg.style.cssText='position: absolute; max-width:100%';

                var wrap = document.createElement('div');
                wrap.className = 'zoomarallax';
                wrap.style.cssText='position: relative; overflow: hidden';

                wrap.innerHTML = img[i].outerHTML;
                img[i].parentNode.replaceChild( wrap, img[i] );
                wrap.innerHTML += initLgImg.outerHTML;
            }

            var zxWrap = document.getElementsByClassName('zoomarallax');
            for (var i = 0; i < zxWrap.length; i++) {
                zxWrap[i].addEventListener('mousemove', function (event) {
                    var smImg = this.firstChild;
                    var lgImg = this.lastChild;
                    var imgX = 0;
                    var imgY = 0;
                    var wrapRectWidth = smImg.width;
                    var wrapRectHeight = smImg.height;
                    var imgRectWidth = lgImg.getBoundingClientRect().width;
                    var imgRectHeight = lgImg.getBoundingClientRect().height;
                    var mouseX = event.clientX - this.getBoundingClientRect().left;
                    var mouseY = event.clientY - this.getBoundingClientRect().top;

                    this.style.width = wrapRectWidth + 'px';
                    this.style.height = wrapRectHeight + 'px';
                    lgImg.src = smImg.getAttribute(lgImgData);
                    

                    lgImg.style.cssText='position: 0; max-width: none; transition: transform 0.1s linear';
                    smImg.style.cssText='position: absolute; left: 0; top: 0;max-width: 100%';


                    //if(imgRectWidth > wrapRectWidth && imgRectHeight >  wrapRectHeight){
                        imgX = mouseX * -((imgRectWidth - wrapRectWidth) / wrapRectWidth);
                        imgY = mouseY * -((imgRectHeight - wrapRectHeight) / wrapRectHeight);
                        lgImg.style.transform = 'translate(' + (imgX) + 'px,' + (imgY) + 'px)';
                    //}
                });
                zxWrap[i].addEventListener('mouseleave', function (event) {
                    this.lastChild.style.cssText='max-width: 100%; width: '+ this.firstChild.width + 'px; height' + this.firstChild.height + 'px';
                    this.style.cssText = 'position: relative; overflow: hidden'
                });
                zxWrap[i].addEventListener('click', function (event) {
                    this.firstChild.click();
                });
            }
            window.addEventListener('resize', function(){
                for (var i = 0; i < zxWrap.length; i++) {
                    zxWrap[i].lastChild.style.width = '';
                    //zxWrap[i].lastChild.style.height = '';
                }
            });
        }

    }
    return Zoomarallax;
}));


if(onLoadWindowWidth >= breakWidth) {

function one(){
    var zxGallerySelect = document.querySelectorAll('img[data-zoomarallax]');
    if (zxGallerySelect.length > 0){
        var zxGallery =  new Zoomarallax({
            imgSelector: zxGallerySelect,
            largeImgData: 'data-zoomarallax'
        });
    }
}
one();

function two(){
var zxSliderSelect = document.querySelectorAll('img[data-ami-mbpopup]');

if (zxSliderSelect.length > 0){
        var zxSlider =  new Zoomarallax({
            imgSelector: zxSliderSelect,
            largeImgData: 'data-ami-mbpopup'
        });
    }

}
two();
/*
    var zxSliderOpt = {
        imgSelector: 'img[data-zoomarallax]',
        largeImgData: 'data-zoomarallax'
    }
    var zxSlider =  new Zoomarallax(zxSliderOpt);
*/

}