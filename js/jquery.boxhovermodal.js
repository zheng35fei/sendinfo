; (function ($) {
	$.fn.extend({
		"boxhovermodal": function (value) {
			//获取传过来的模态层
			var $childmodal = $(value) || $(".box-hover-modal-m");

			//鼠标滑动事件
			$(this).mouseenter(function () {
				//getMouseWay()返回值是0~3,分别对应左上右下
				var wayNum = getMouseWay(this);
				if (wayNum == 0) {
					$(this).children($childmodal).css({
						"display": "block",
						"top": "0",
						"left": -$(this).width()
					}).animate({
						"left": "0"
					}, 200);
				}
				else if (wayNum == 1) {
					$(this).children($childmodal).css({
						"display": "block",
						"top": -$(this).height(),
						"left": '0'
					}).animate({
						"top": "0"
					}, 200);
				}
				else if (wayNum == 2) {
					$(this).children($childmodal).css({
						"display": "block",
						"top": "0",
						"left": $(this).width()
					}).animate({
						"left": "0"
					}, 200);
				}
				else if (wayNum == 3) {
					$(this).children($childmodal).css({
						"display": "block",
						"top": $(this).height(),
						"left": 0
					}).animate({
						"top": "0"
					}, 200);
				}
			}).mouseleave(function () {
				var wayNum = getMouseWay(this);
				if (wayNum == 0) {
					$(this).children($childmodal).animate({
						"left": -$(this).width()
					}, 200);
				}
				else if (wayNum == 1) {
					$(this).children($childmodal).animate({
						"top": -$(this).height()
					}, 200);
				}
				else if (wayNum == 2) {
					$(this).children($childmodal).animate({
						"left": 2 * $(this).width()
					}, 200);
				}
				else if (wayNum == 3) {
					$(this).children($childmodal).animate({
						"top": $(this).height()
					}, 200);
				}
			});


			//获取鼠标移动到元素的时候距离最近的边
			//左上右下=>0,1,2,3
			function getMouseWay(nowEle) {
				//获取当前鼠标位置
				var mx = event.pageX;
				var my = event.pageY;
				//获取当前元素的上下左右
				var bl = $(nowEle).offset().left;
				var bt = $(nowEle).offset().top;
				var br = bl + parseInt($(nowEle).width());
				var bb = bt + parseInt($(nowEle).height());

				//计算出鼠标距离上下左右哪个最近
				var ml = Math.abs(mx - bl);
				var mt = Math.abs(my - bt);
				var mr = Math.abs(br - mx);
				var mb = Math.abs(bb - my);

				//把计算出的是个距离放到数组bm里面
				var bm = [ml, mt, mr, mb];
				var aaa = Math.min.apply(Math,[1,2,3]);
				console.log(aaa);

				//计算出最小的那个值,虽然我不懂apply但是挺管用的
				var bmMin = Math.min.apply(null, bm);

				//根据最小值遍历数组判断出是哪边最近
				var way;
				$.each(bm, function (index, content) {
					if (content == bmMin) {
						way = index;
					}
				});
				return way;
			}


		}
	});
})(jQuery);