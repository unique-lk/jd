window.onload=function(){
	search();
	banner();
	downTime();
}

//搜索栏颜色的变化
var search=function(){
	//获取搜索栏的dom
	var searchBox=document.querySelector('.jd_search_box');
	//获取轮播图的dom
	var bannerBox=document.querySelector('.banner');
	//获取轮播图的高度
	var height=bannerBox.offsetHeight;
	var opacity=0;
	//监听滚动条滚动事件
	window.onscroll=function(){
		var top=document.body.scrollTop;
		if(top>height){
			opacity=0.85;
		}else{
			opacity=(top/height)*0.85;
		}
		searchBox.style.background="rgba(201,21,35,"+opacity+")";
	}
}

// 轮播图
/*
1.让轮播图轮播
	轮播图的宽度
	轮播图盒子
	白点的盒子
2.白点运动
3.能够拖拉
4.能够根据拖拉判断前进或者后退

*/
var banner=function(){
	var banner=document.querySelector('.banner');
	var bannerBox=banner.querySelector('ul:first-child');
	var whiteBox=banner.querySelector('ul:last-child');
	//轮播图的宽度
	var width=banner.offsetWidth;
	var index=1;


	//添加transition
	function addTransition(){
		bannerBox.style.transition="all 0.2s";
		bannerBox.style.webkitTransition="all 0.2s";
	}
	//移除transition
	function removeTransition(){
		bannerBox.style.transition="none";
		bannerBox.style.webkitTransition="none";
	}
	//移动
	function move(x){
		bannerBox.style.transform="translateX("+x+"px)";
	}
	var timer=setInterval(function(){
		index++;
		addTransition();
		move(-index*width);
	},3000);

	jd.transitionEnd(bannerBox,function(){
		if(index>=9){
			removeTransition();
			index=1;
			move(-index*width);
		}else if(index<=0){
			removeTransition();
			index=8;
			move(-index*width);
		}
		//来修改白点	
		point(index);
	});

	//白点运动
	function point(index){
		//获取到所有的li
		var lis=whiteBox.querySelectorAll('li');
		//重置class
		for(var i=0;i<lis.length;i++){
			lis[i].className="";
		}
		lis[index-1].className='now';
	}

	var startX=0;
	var moveX=0;
	var distance=0;
	var isMove=false;

	bannerBox.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startX=e.touches[0].clientX;
	});

	bannerBox.addEventListener('touchmove',function(e){
		isMove=true;
		moveX=e.touches[0].clientX;
		distance=moveX-startX;
		removeTransition();
		move(-index*width+distance);

	});


	bannerBox.addEventListener('touchend',function(e){
		if(Math.abs(distance)>width/3 && isMove){
			if(distance>0){
				index--;
			}else{
				index++;
			}
			addTransition();
			move(-index*width);
		}else{
			addTransition();
			move(-index*width);
		}
		startX=0;
		moveX=0;
		isMove=false;
		distance=0;
		clearInterval(timer);
		timer=setInterval(function(){
			index++;
			addTransition();
			move(-index*width);
		},3000);
	});
}



// 倒计时效果
function downTime(){
	var sk_time=document.querySelector('.sk_time');
	var span=sk_time.querySelectorAll('span');
	var time=3*60*60;//三个小时默认
	var timer=setInterval(function(){
		time--;
		if(time<0){
			clearInterval(timer);
			return false;
		}
		var h=Math.floor(time/3600);
		var m=Math.floor(time%3600/60);
		var s=Math.floor(time%60);

		span[0].innerHTML=Math.floor(h/10);
		span[1].innerHTML=h%10;
		span[3].innerHTML=Math.floor(m/10);
		span[4].innerHTML=m%10;
		span[6].innerHTML=Math.floor(s/10);
		span[7].innerHTML=s%10;
	},1000);
}