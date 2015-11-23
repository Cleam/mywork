$(function(){
	var $header = $('#J_header'),
		$navHandler = $('#J_nav_handler'),
		$navList = $('#J_nav_list'),
		$navLi = $navList.children('li'),
		$anchor = $('.J-anchor'),
		$mouse = $('#J_mouse'),
		$details = $('#J_details'),
		$peopleList = $('#J_people_list'),
		$popWinBg = $('#J_pop_win_bg'),
		$popWin = $('#J_pop_win'),
		$bannerList = $('#J_banner_list'),
		isIe8 = !!window.ActiveXObject && !!document.documentMode;
	// 菜单收缩功能实现
	$navHandler.click(function(){
		var $this = $(this);
		if(!isIe8){
			if(!$this.hasClass('shrink')){
				$this.addClass('shrink');
				$navList.addClass('shrink');
			} else {
				$this.removeClass('shrink');
				$navList.removeClass('shrink');
			}
		} else {
			if(!$this.hasClass('shrink')){
				$this.addClass('shrink');
				$navList.hide();
			} else {
				$this.removeClass('shrink');
				$navList.show();
			}
		}
	});

	function scrollTo($target){
		$('html,body').animate({
			scrollTop: $target.offset().top
		});
	}

	function scrollToTop(){
		$('html,body').animate({
			scrollTop: 0
		});
	}

	// “鼠标”icon点击事件
	$mouse.on('click', function(){
		scrollTo($($anchor.get(0)));
	});
	$details.on('click', function(){
		scrollTo($($anchor.get(0)));
	});

	// 滚动监听
	$(window).scroll(function(){
		var st = document.documentElement.scrollTop || document.body.scrollTop;
		if(st > 0){
			$header.addClass('sm');
		}else{
			$header.removeClass('sm');
		}
		var $t = getTarget(st);
		showLi($t ? parseInt($t.attr('data-index'), 10) : 0);
	});
	$(window).scroll();

	function getTarget(scrTop){
		var $target = null;
		$anchor.each(function(i, el) {
			var ot = $(el).offset().top - 66;
			if(scrTop >= ot){
				$target = $(el);
			}
		});
		return $target;
	}

	function showLi(index){
		$navLi.removeClass('active');
		$navLi.eq(index).addClass('active');
		if(index > 0){
			$header.addClass('active');
			$header.find('a.sm').children('img').attr('src', 'img/logo_2.png');
			$header.find('a.sm, .txt').css({
				'color': '#666'
			});
			$header.find('.circle').css({
				'backgroundImage': 'url("img/cl_a.png")'
			});
		} else {
			$header.removeClass('active');
			$header.find('a.sm').children('img').attr('src', 'img/logo_2_1.png');
			$header.find('a.sm, .txt').css({
				'color': '#fff'
			});
			$header.find('.circle').css({
				'backgroundImage': 'url("img/cl.png")'
			});
		}
	}

	// 导航菜单点击功能实现
	$navLi.on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
			index = $this.index();
		$anchor.each(function(i, el) {
			if(index === 0){
				scrollToTop();
			} else if(parseInt($(el).attr('data-index'), 10) === index){
				scrollTo($(el));
			}
		});
	});

	// banner切换功能实现
	(function(){
		var i = 0;
		setInterval(function(){
			i++;
			if(i > 1){
				i = 0;
			}
			$bannerList.children('li').eq(i).fadeIn().siblings().fadeOut();
		}, 6000);
	})();

	// 人员信息展示功能实现（弹窗）
	$peopleList.find('.icon').click(function(){
		var imgSrc = $(this).children('img').attr('src');
		$popWinBg.fadeIn();
		$popWin.find('img').attr('src', imgSrc);
		setTimeout(function(){
			$popWin.addClass('show');
			$popWin.find('.close').click(function(){
				$popWin.removeClass('show');
				setTimeout(function(){
					$popWinBg.fadeOut();
				}, 300);
			});
		}, 300);
	});


	/* 地图初始化 */
	(function(){
		var map = new BMap.Map("J_map", {
	        enableMapClick: false // 关闭地图底图默认可点功能
	    }); // 创建地图实例  
	    var point = new BMap.Point(121.543972,31.158758);
		map.centerAndZoom(point, 15);
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	})();
});