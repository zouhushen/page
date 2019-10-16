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
var h=0;

// 初始化方法
function init(screen){
	var screenNAnimations=animations[screen];
	for(var i=0;i<screenNAnimations.length;i++){
		var screenNCls=document.querySelector(screenNAnimations[i]),
		    clsData=screenNCls.getAttribute("class");
		if(clsData.indexOf("init")===-1){
			screenNCls.setAttribute("class",clsData+" "+screenNAnimations[i].slice(1)+"__init");
		}
	}
}

//页面滚动事件执行函数
function scrollThing(){
	scrollHigh();
}

//获取滚动条高度
function scrollHigh(){
	h=document.documentElement.scrollTop||document.body.scrollTop;
	scollAnima();
	activeNav();
}

//判断滚动条高度
function scollAnima(){
	if(h>=0){
		toDone(".screen1");
		setNav(0,".header");
		setNav(0,".left-nav");
		dataId(0);
		// setLeftNav(0);
	}
	if(h>60){
		setNav(1,".header");
		setNav(1,".left-nav");
		// setLeftNav(1);
	}
	if(h>640-60){
		toDone(".screen2");
		dataId(1);
	}
	if(h>640*2-60){
		toDone(".screen3");
		dataId(2);
	}
	if(h>640*3-60){
		toDone(".screen4");
		dataId(3);
	}
	if(h>640*4-60){
		toDone(".screen5");
		dataId(4);
	}
}

//设置init to done
function toDone(screen){
	var screenNCls=animations[screen];
	for(var i=0;i<screenNCls.length;i++){
		var screenNClsEle=document.querySelector(screenNCls[i]),
		    clsData=screenNClsEle.getAttribute("class");
		if(clsData.indexOf("init")!=-1){
			screenNClsEle.setAttribute("class",clsData.replace("init","done"));
		}
	}
}

//设置header和左导航样式
function setNav(num,screen){
	var screenN=document.querySelector(screen),
	    screenNCls=screenN.getAttribute("class");
	if(num===1){
		screenN.setAttribute("class",screenNCls+" "+screen.slice(1)+"__fixed");
	}else{
		screenN.setAttribute("class",screenNCls.replace(" "+screen.slice(1)+"__fixed",""));
	}
}

//导航菜单点击事件
function navClick(i,navCls){
	var nav=document.querySelectorAll(navCls);
	nav[i].onclick=function(){
		setScroll(i);
	}
}

//设置滚动条高度
function setScroll(i){
	if(typeof(document.documentElement.scrollTop)==="number"){
		document.documentElement.scrollTop=i*640-59;
	}else{
		document.body.scrollTop=i*640-59;
	}
}

//设置一个data-id=1用于判断被激活的选项
function dataId(i){
	var headerNav=document.querySelectorAll(".header__nav__items"),
	    leftNav=document.querySelectorAll(".left-nav__item");
	for(var m=0;m<headerNav.length;m++){
		headerNav[m].setAttribute("data-id","0");
		leftNav[m].setAttribute("data-id","0");
	}
	headerNav[i].setAttribute("data-id","1");
	leftNav[i].setAttribute("data-id","1");
}

//判断激活的选项
function activeNav(){
	var headerNav=document.querySelectorAll(".header__nav__items"),
		leftNav=document.querySelectorAll(".left-nav__item");;
	for(var i=0;i<headerNav.length;i++){
		var dataid=headerNav[i].getAttribute("data-id");
		if(dataid==="1"){
			slipping(i);
			break;
		}
	}
}

//滑动门激活
function slipping(i){
	var outline=document.querySelector(".header__nav_outline_red");
	outline.style.left=i*96+"px";
}

//滑动门鼠标事件
function navMouse(i,navCls){
	var nav=document.querySelectorAll(navCls),
	    outline=document.querySelector(".header__nav_outline_red");
	nav[i].onmouseover=function(){
		outline.style.left=i*96+"px";
	}
	nav[i].onmouseout=function(){
		activeNav();
	}
}

//页面加载完毕后调用函数
window.onload=function(){
	//调用初始化
	for(k in animations){
		init(k);
	}
	//页面加载完毕，判断滚动条当前高度对应的页面
	setTimeout(scrollHigh,500);
	document.onscroll=scrollThing;
	//激活导航菜单点击事件
	for(var i=0;i<document.querySelectorAll(".header__nav__items").length;i++){
		navClick(i,".header__nav__items");
		navMouse(i,".header__nav__items");
	}
	//激活左导航点击
	for(var i=0;i<document.querySelectorAll(".left-nav__item").length;i++){
		navClick(i,".left-nav__item");
	}
}