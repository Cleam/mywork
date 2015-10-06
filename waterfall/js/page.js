(function(){
	function ZgWaterfall(param){
		// this.__defaults = {
		// 	container: 'wf-container',
		// 	columns: 5,
		// 	colWidth: 
		// };
		this.container = typeof param.container == 'string' ? document.getElementById(param.container) : param.container;
		this.colCount = param.colCount || 4;
		this.boxCls = param.boxCls && param.boxCls != '' ? param.boxCls : 'box';
		this.colWidth = Math.floor(this.container.offsetWidth / this.colCount) - 10; // 10为间隙
		this.init();
	}

	ZgWaterfall.prototype = {
		/**
		 * 通过父节点获取指定类名的所有孩子节点
		 * @param  {[type]} parent         父节点DOM对象
		 * @param  {[type]} childClassName 子节点类名
		 * @return {[type]}                
		 */
		getChildElementByClassName: function(parent, childClassName){
			var childs = parent.getElementsByTagName('*');
			var boxes = [];
			for (var i = 0; i < childs.length; i++) {
				if(childs[i].className.indexOf(childClassName) != -1){
					boxes.push(childs[i]);
				}
			}
			return boxes;
		},
		/**
		 * 获取最小高度及其索引
		 * @param  {[type]} arr [description]
		 * @return {[type]}     [description]
		 */
		getMin: function(arr){
			// console.info(arr);
			var minColIndex = 0,
				minHeight = arr[0];
			for (var i = 0; i < arr.length; i++) {
				if(minHeight > arr[i]){
					minHeight = arr[i];
					minColIndex = i;
				}
			}
			return {height: minHeight, index: minColIndex};
		},
		/**
		 * 获取margin值
		 * @param  {[type]} node [description]
		 * @return {[type]}      [description]
		 */
		getMarginBottom:function(node){
	        var dis = 0;
	        if(node.currentStyle){
	            dis = parseInt(node.currentStyle.marginBottom);
	        }else if(document.defaultView){
	            dis = parseInt(document.defaultView.getComputedStyle(node,null).marginBottom);
	        }
	        return dis;
	    },
	    /**
	     * 获取最大高度
	     * @param  {[type]} arr [description]
	     * @return {[type]}     [description]
	     */
		getMaxheight: function(arr){
			var mh = arr[0];
			for (var i = 0; i < arr.length; i++) {
				if (mh < arr[i]) {
					mh = arr[i];
				}
			}
			return mh;
		},
		/**
		 * 初始化方法
		 */
		init: function(){
			var scope = this,
				i = 0,
				colHeightArr = [];	// 列高数组
			// 获取所有图片盒子
			var boxes = scope.getChildElementByClassName(scope.container, scope.boxCls);
			// 初始化列高、列索引数组
			for (i = 0; i < scope.colCount; i++) {
				colHeightArr[i] = 0;
			}
			for (i = 0; i < boxes.length; i++) {
				boxes[i].h = boxes[i].offsetHeight + scope.getMarginBottom(boxes[i]);
			}
			// 布置图片盒子
			for (i = 0; i < boxes.length; i++) {
				// 获取最小高度列索引及其最小高度
				var min = scope.getMin(colHeightArr);
				boxes[i].style.left = ((scope.colWidth + 10) * min.index) + 'px';
				boxes[i].style.top = min.height + 'px';
				colHeightArr[min.index] += boxes[i].h;
			}
			// 设置容器高度
			scope.container.style.height = scope.getMaxheight(colHeightArr) + 'px';
			scope.container.style.visibility = 'visible';
		}
	};

	window.onload = function(){
		new ZgWaterfall({
			container: 'wf_container',
			// colWidth: 240,	// 待扩展
			// gap: 10,			// 待扩展
		    colCount: 4,
		    boxCls: 'box'
		});
	};

})();


