window.jd={};
jd.transitionEnd=function(dom,callback){
	if(dom && typeof dom == 'object'){
		dom.addEventListener('transitionEnd',function(){
			callback && callback();
		});
		dom.addEventListener('webkitTransitionEnd',function(){
			callback && callback();
		});
	}
}