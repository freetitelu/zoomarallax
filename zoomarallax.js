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
                initLgImg.style.cssText='position: absolute; top: 0; left: 0';

                var wrap = document.createElement('div');
                wrap.className = 'zoomarallax';
                wrap.style.cssText='position: relative; overflow: hidden';

                wrap.innerHTML = img[i].outerHTML;
                img[i].parentNode.replaceChild( wrap, img[i] );
                wrap.innerHTML += initLgImg.outerHTML;
            }

            var zx = document.getElementsByClassName('zoomarallax');
            var zxWidth;
            var zxHeight;
            var imgX = 0;
            var imgY = 0;
            var smImg;
            var lgImg;
            var mouseX;
            var mouseY;

            for (var i = 0; i < zx.length; i++) {
                zx[i].addEventListener('mouseenter', function (event) {
                    smImg = this.firstChild;
                    lgImg = this.lastChild;
                    zxWidth = smImg.width;
                    zxHeight = smImg.height;
                    this.style.width = zxWidth + 'px';
                    this.style.height = zxHeight + 'px';
                    lgImg.src = smImg.getAttribute(lgImgData);
                    lgImg.style.cssText = 'max-width: none';
                    smImg.style.cssText = 'position: absolute; left: 0; top: 0; max-width: 100%';
                    lgImg.style.willChange = 'transform';

                    setTimeout(function() { 
                        lgImg.style.transition = 'transform 0.3s ease-out';
                     }, 300);
                    
                    
                });
                zx[i].addEventListener('mousemove', function (event) {
                    mouseX = event.clientX - this.getBoundingClientRect().left;
                    mouseY = event.clientY - this.getBoundingClientRect().top;

                    //if(imgRectWidth > zxWidth && imgRectHeight >  zxHeight){
                        imgX = mouseX * -((lgImg.width - zxWidth) / zxWidth);
                        imgY = mouseY * -((lgImg.height - zxHeight) / zxHeight);
                        lgImg.style.transform = 'translate(' + (imgX) + 'px,' + (imgY) + 'px)';

                    //}
                });
                zx[i].addEventListener('mouseleave', function (event) {
                    lgImg.style.cssText='max-width: 100%; width: '+ smImg.width + 'px; height:' + smImg.height + 'px';
                    this.style.cssText = 'position: relative; overflow: hidden'
                });
                zx[i].addEventListener('click', function (event) {
                    this.firstChild.click();
                });
            }
            window.addEventListener('resize', function(){
                for (var i = 0; i < zx.length; i++) {
                    zx[i].lastChild.style.width = '';
                }
            });
        }

    }
    return Zoomarallax;
}));


if(onLoadWindowWidth >= breakWidth) {

    var zxGallerySelect = document.querySelectorAll('.gallery_img');
    function zxGalleryInit(){
        var zxGallery =  new Zoomarallax({
            imgSelector: zxGallerySelect,
            largeImgData: 'data-ami-mbpopup'
        });
    }
    if (zxGallerySelect.length > 0){
        zxGalleryInit();
    }
    var zxGalleryLinkSelect = document.querySelectorAll('.gallery-link_img');
    function zxGalleryLinkInit(){
        var zxGalleryLink =  new Zoomarallax({
            imgSelector: zxGalleryLinkSelect,
            largeImgData: 'data-zoomarallax'
        });
    }
    if (zxGalleryLinkSelect.length > 0){
        zxGalleryLinkInit();
    }

    var zxSliderSelect = document.querySelectorAll('#multiSlider img[data-zoomarallax]');
    function zxSliderInit(){
        var zxSlider =  new Zoomarallax({
            imgSelector: zxSliderSelect,
            largeImgData: 'data-zoomarallax'
        });
    }
    if (zxSliderSelect.length > 0){
        zxSliderInit();
    }

}
