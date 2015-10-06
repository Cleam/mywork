(function(){
	window.onload=function(){
		var imgs = document.querySelectorAll('img');
		// var defultTransform = null;
		for (var i = 0; i < imgs.length; i++) {
			var ranNum1 = Math.floor(100 * Math.random() - 50); // 获取-50~50之间的随机数
			imgs[i].style.transform = 'rotate(' + ranNum1 + 'deg)';
			imgs[i].onmouseover = mover;
			imgs[i].onmouseout = mout;
		}
		function mover(e){
			// defultTransform = this.style.transform;
			this.style.transform = 'rotate(0deg) scale(1.2,1.2)';
		}
		function mout(){
			// this.style.transform = defultTransform;
			var ranNum = Math.floor(100 * Math.random() - 50); // 获取-50~50之间的随机数
			this.style.transform = 'rotate(' + ranNum + 'deg)';
		}
	};
})();