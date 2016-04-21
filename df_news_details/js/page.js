/**
 * 东方头条新闻详情页js文件
 * Created by lizhigao on 2015/12/2.
 */
$(function(){
    //$('#J_carousel').unslider();
    /**
     * 定义变量
     */
    var $wechat = $('#J_wechat'),
        $wechatEwm = $('#J_wechat_ewm'),
        $phone = $('#J_phone'),
        $phoneEwm = $('#J_phone_ewm'),
        $specialLinks = $('#J_special_list').children('li'),
        $carouselTable = $('#J_carousel_table'),
        $carouselImgs = $carouselTable.find('img'),
        $prevImg = $('#prev_img'),
        $nextImg = $('#next_img'),
        index = 0,
        length = $carouselImgs.length;

    // 微信二维码 hover事件
    $wechat.hover(function(){
        $wechatEwm.show();
    }, function(){
        $wechatEwm.hide();
    });
    // 手机app二维码 hover事件
    $phone.hover(function(){
        $phoneEwm.show();
    }, function(){
        $phoneEwm.hide();
    });

    // 右侧链接列表hover事件
    $specialLinks.hover(function(){
        $specialLinks.children('a').removeClass('active');
        $(this).children('a').addClass('active');
    });

    // 上下图 hover效果实现
    $prevImg.hover(function(){
        $(this).css('opacity', '0.8');
    }, function(){
        $(this).css('opacity', '0.2');
    });

    $nextImg.hover(function(){
        $(this).css('opacity', '0.8');
    }, function(){
        $(this).css('opacity', '0.2');
    });

    // 图片轮播
    $prevImg.on('click', function(event) {
        event.preventDefault();
        if(index === 0){
            index = length - 1;
        } else {
            index--;
        }
        show(index);
    });
    $nextImg.on('click', function(event) {
        event.preventDefault();
        if(index === length - 1){
            index = 0;
        } else {
            index++;
        }
        show(index);
    });

    function show(i){
        $carouselImgs.eq(i).css('display', 'inline').siblings('img').css('display','none');
    }

});