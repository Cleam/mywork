/**
 * 轮播插件jquery.zgcarousel.js
 * 初始化：$('...').zgcarousel({...});
 * 支持jquery插件调用方法，支持AMD模块化调用
 * @version v1.0
 * @author lizhigao
 * @date 2015-09-09
 */
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        /* AMD模式 */
        define(['jquery'], factory);
    } else {
        /* 全局模式 */
        factory(jQuery, window);
    }
})(function($, window) {
    // 插件名称
    var PLUGIN_NAME = 'zgcarousel',
        // 默认配置参数
        defaults = {
            itemWidth: 600,      // item的宽度，默认600px
            itemHeight: 350,     // item的高度，默认350px
            autoPlay: true,      // 自动播放，默认：true
            delay: 5000,         // 自动滚动时间间隔，默认：5000ms
            speed: 'normal',     // 滚动速度，默认：normal，支持：slow、normal、fast、100、200等
            prevBtn: '',         // 上一页按钮的选择器，默认无
            nextBtn: '',         // 下一页按钮的选择器，默认无
            /**
             * 滚动之前回调方法
             * @param  {Number} index 当前item索引，从0开始计数
             */
            beforeShow: null,
            /**
             * 滚动之后回调方法
             * @param  {Number} index 当前item索引，从0开始计数
             */
            afterShow: null
        };
    // 创建一个轮播对象
    function ZgCarousel(element, options){
        // 插件名
        this._name = PLUGIN_NAME;
        // 默认配置参数
        this._defaults = defaults;
        // 初始化定时器
        this._timer = null;
        // 配置参数
        this.settings = $.extend(true, {}, defaults, options);
        // 当前ul对象
        this.$element = $(element);
        // ul的parent对象
        this.$elementWrap = this.$element.parent();
        // items对象
        this.$items = this.$element.children('li');
        // 上一页按钮对象
        this.$prevBtn = this.$elementWrap.find(this.settings.prevBtn).length ? this.$elementWrap.find(this.settings.prevBtn).eq(0) : null;
        // 下一页按钮对象
        this.$nextBtn = this.$elementWrap.find(this.settings.nextBtn).length ? this.$elementWrap.find(this.settings.nextBtn).eq(0) : null;
        // item宽度
        this.itemWidth = this.settings.itemWidth;
        // item高度
        this.itemHeight = this.settings.itemHeight;
        // 总页数
        this.totalPages = this.$items.length;
        // 当前页数
        this.currentPage = 0;   // 从0开始计数
        // 总宽度
        this.width = this.itemWidth * this.totalPages;
    }

    ZgCarousel.prototype = {
    	constructor: ZgCarousel,
        /**
         * 初始化
         */
    	init: function(){
            var scope = this;
            this.initStyle();
            if(this.$prevBtn){
                this.$prevBtn.on('click.zgcarousel', function(){
                    scope.prevPage();
                });
            }
            if(this.$nextBtn){
                this.$nextBtn.on('click.zgcarousel', function(){
                    scope.nextPage();
                });
            }
            // 自动播放
            if(this.settings.autoPlay){
                this.startInterval();
                this.$elementWrap.hover(function(){
                    scope.stopInterval();
                }, function(){
                    scope.startInterval();
                });
            }
            // 添加hover事件
            //this.$elementWrap.hover(function(){
            //    // 显示上下页按钮
            //    scope.showPrevBtn();
            //    scope.showNextBtn();
            //}, function(){
            //    // 隐藏上下页按钮
            //    scope.hidePrevBtn();
            //    scope.hideNextBtn();
            //});
            return this;
    	},
        /**
         * 样式初始化
         */
        initStyle: function(){
            // 初始化容器样式
            this.$elementWrap.css({
                'width': this.itemWidth,
                'height': this.itemHeight,
                'position': 'relative',
                'overflow': 'hidden'
            });
            // 初始化ul样式
            this.$element.css({
                'width': this.itemWidth,
                'height': this.itemHeight,
                'overflow': 'hidden',
                'display': 'block',
                'position': 'relative',
                'list-style': 'none',
                'margin': 0,
                'padding': 0
            });
            // 初始化li样式
            this.$items.css({
                //'position': 'absolute',
                //'left': 0,
                //'top': 0,
                'width': this.itemWidth,
                'height': this.itemHeight,
                'display': 'none'
            });
            this.$items.eq(0).show();
            //this.$items.find('img').css({
            //    'width': '100%',
            //    'height': '100%'
            //});
            return this;
        },
        /**
         * 上一页
         */
        prevPage: function(){
            // 第一页的上一页为最后一页
            if(this.currentPage !== 0){
                this.currentPage--;
            } else {
                this.currentPage = this.totalPages - 1;
            }
            this.showPage(this.currentPage);
            return this;
        },
        /**
         * 下一页
         */
        nextPage: function(){
            // 第一页的前一页为最后一页
            if(this.currentPage !== this.totalPages - 1){
                this.currentPage++;
            } else {
                this.currentPage = 0;
            }
            this.showPage(this.currentPage);
            return this;
        },
        /**
         * 显示指定页
         * @param  {Number} index 从0开始计数的页码
         * @return {[type]}       this
         */
        showPage: function(index){
            var scope = this;
            this.currentPage = index;
            // 滚动之前回调beforeShow
            if(typeof scope.settings.beforeShow == 'function'){
                scope.settings.beforeShow.call(this, index);
            }
            this.$items.eq(index).stop().show().siblings().stop().hide();
            return this;
        },
        /**
         * 开始播放
         * @return {[type]} this
         */
        startInterval: function(){
            var scope = this;
            scope.stopInterval();
            this._timer = setInterval(function(){
                scope.nextPage();
            }, scope.settings.delay);
            return this;
        },
        /**
         * 停止循环播放
         * @return {[type]} this
         */
        stopInterval: function(){
            if(this._timer){
                clearInterval(this._timer);
            }
            return this;
        },
        /**
         * 显示上一页按钮
         * @return {[type]} this
         */
        showPrevBtn: function(){
            if(this.$prevBtn){
                this.$prevBtn.stop().fadeIn();
            }
            return this;
        },
        /**
         * 显示下一页按钮
         * @return {[type]} this
         */
        showNextBtn: function(){
            if(this.$nextBtn){
                this.$nextBtn.stop().fadeIn();
            }
            return this;
        },
        /**
         * 隐藏上一页按钮
         * @return {[type]} this
         */
        hidePrevBtn: function(){
            if(this.$prevBtn){
                this.$prevBtn.stop().fadeOut();
            }
            return this;
        },
        /**
         * 隐藏下一页按钮
         * @return {[type]} this
         */
        hideNextBtn: function(){
            if(this.$nextBtn){
                this.$nextBtn.stop().fadeOut();
            }
            return this;
        },
        /**
         * 销毁插件
         */
        destroy: function(){
            this.stopInterval();
            this.currentPage = 0;
            this.$prevBtn.off('.zgcarousel');
            this.$nextBtn.off('.zgcarousel');
        }
    };

    /**
     * 初始化插件
     * @param  {String|Object} option String: 作为方法/事件调用，Object: 插件初始化。
     * @param  {Object} param  参数
     * @return {Object}        
     */
    $.fn[PLUGIN_NAME] = function(option, param) {
        var value, args = [];
        // 将参数arguments存储到args数组中
        Array.prototype.push.apply(args, arguments);
        // 存储返回的值，方便插件返回。 此时this是jquery对象
        var $elements = this.each(function() {
            // this为DOM对象
            var $this = $(this),    
                // 获取插件对象，如果存在。
                obj = $this.data(PLUGIN_NAME), 
                // 获取option参数,存储到options中
                options = typeof option == 'object' && option;
            /*
                1、插件已经初始化(为什么要插件已经初始化？（个人理解）：必须先初始化插件，才能调用其中的方法。
                如果没有初始化插件就想调用方法，obj将是null，插件将不会有任何操作。此判断可优化。
                因为：第一次如果这样调用：$('...').zgcarousel('init', {...})将不被支持，只能这样调用：$('...').zgcarousel({...}));
                2、判断第一个参数option是否是string类型，
                3、判断该option是否是插件的一个方法。
             */
            if (obj && typeof option === 'string' && obj[option]) {
                // 删除数组中第一个值（方法名），其余值将作为方法的参数。
                args.shift();
                // 调用option方法并返回相应的返回值给value。
                value = obj[option].apply(obj, args);
            } else {
                /*
                    1、未初始化（即第一次调用时）
                    2、option不是string类型
                    3、无其他参数，即param为空
                 */
                if (!obj && typeof option !== 'string' && !param) {
                    $this.data(PLUGIN_NAME, (obj = new ZgCarousel(this, options)));
                    // 调用初始化方法。也可以放到构造方法中去调用init方法。
                    obj.init();
                }
            }
        });
        return typeof value !== 'undefined' ? value : $elements;
    };

    return ZgCarousel;
});
