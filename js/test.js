//公共变量
var animations={
	".screen1":[
		".header",
		".screen1__item1",
		".screen1__item2",
	],
	".screen2":[
	    ".screen2__item1",
	    ".screen2__item2",
	    ".screen2__img2",
	    ".screen2__img3"
	],
	".screen3":[
	    ".screen3__item1",
	    ".screen3__item2",
	    ".screen3__img",
	    ".screen3__block"
	],
	".screen4":[
	    ".screen4__item1",
	    ".screen4__block__item1",
	    ".screen4__block__item2",
	    ".screen4__block__item3",
	    ".screen4__block__item4",
	    ".screen4__item2"
	],
	".screen5":[
	    ".screen5__img",
	    ".screen5__item1",
	    ".screen5__item2"
	]
}

// 初始化方法
function init(screen){
	var screenNAnimations=animations[screen];
	for(var i=0;i<screenNAnimations.length;i++){
		var screenNCls=document.querySelector(screenNAnimations[i]),
		    clsData=screenNCls.getAttribute("class");
		screenNCls.setAttribute("class",clsData+" "+screenNAnimations[i].slice(1)+"__init");
	}
}

//点击测试动画
function clickTest(screen){
	var screenN=document.querySelector(screen);
	screenN.onclick=function(){
		var screenNAnimations=animations[screen];
		for(var i=0;i<screenNAnimations.length;i++){
			var screenNCls=document.querySelector(screenNAnimations[i]),
			    clsData=screenNCls.getAttribute("class");
			if(clsData.indexOf("init")!=-1){
				screenNCls.setAttribute("class",clsData.replace("init","done"));
			}else{
				screenNCls.setAttribute("class",clsData.replace("done","init"));
			}
		}
	}
}

window.onload=function(){
	//调用初始化
	for(k in animations){
		init(k);
		clickTest(k);
	}
}