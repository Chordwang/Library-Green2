//***************************************定义***************************************//
var CurURL=location.hostname;//URL

var PageCount=0;//总页数
var CurPageCount=0;//当前所在页
var CurScrollBarState=0//当前滚动条位置

var PageArray;//克隆控制数组
var PageArrayFinish;//对照组

var Clone=false;//克隆开关

var PageID="";//页面ID
var SCSDivID;//显示克隆状态的DIV的ID

var ThisScroll;//循环执行对象
var CloneDivObject;//克隆的DIV对象

var PageTLen;//页总长
var PageSLen;//单页长
//***************************************定义***************************************//

//***************************************程序***************************************//
//
document.addEventListener("copy", function (event) {event.stopPropagation();}, true);
//
$(document).ready(function(){
	//百度
	if(CurURL=="wenku.baidu.com"){
		//获取总页数
		PageCount=parseInt($(".page-count").text().replace("/",""));
		//创建克隆控制数组 和 对照组
		CloneDivObject=Array(Number(PageCount));
		PageArray = Array(Number(PageCount)).fill("Yes");
		PageArrayFinish = Array(PageCount).fill("No");
		//
		$(document).ready(function(){
			//展开所有页
			$(".down-arrow.goBtn").click();
			//回到页面顶端
			window.setTimeout(function(){window.scroll(0,0);}, 500);
		});
		//
		ThisScroll=setInterval(BaiDuClone, 250);
	}
	//道客巴巴
	if(CurURL=="www.doc88.com"){
		//获取总页数
		PageCount=$("#pageNumInput").parent().text().replace("/","").trim();
		//创建克隆控制数组 和 对照组
		CloneDivObject=Array(PageCount);
		PageArray = Array(Number(PageCount)).fill("Yes");
		PageArrayFinish = Array(Number(PageCount)).fill("No");
		//
		$(document).ready(function(){
			//展开所有页
			$(".iconfont.more").click();
			//回到页面顶端
			window.setTimeout(function(){window.scroll(0,0);}, 500);
		});
		//
		ThisScroll=setInterval(DocClone, 500);
	}
});
//***************************************程序***************************************//

//***************************************监听***************************************//
chrome.runtime.onMessage.addListener(
	function(msg, sender, sendResponse){
		//
		if (msg.message == 'Go'){
			//
			if(CurURL=="wenku.baidu.com"){
				BaiDuClean();
			}
			//
			if(CurURL=="www.doc88.com"){
				DocClean();
			}
		}
		//
		sendResponse();
	}
);
//***************************************监听***************************************//

//***************************************函数***************************************//
function DocClean(){
	//居中
	$("#boxleft").removeClass("boxleft");
	$("#boxleft").attr("align","center");

	//ID
	$("#header").remove();
	$("#box1").remove();
	$("#boxright").remove();
	$("#readEndDiv").remove();
	$("#commentDiv").remove();
	$("#footer").remove();

	//类
	$(".toplayer-shop").remove();
	$(".dk-bg").parent().remove();
	$(".commonbox1").remove();
	$(".activelist").remove();

	//隐藏
	$("#readshop").hide();

	//克隆
	Clone=true;

	//克隆指示
	ShowCloneState();
}

function BaiDuClean(){
	//居中
	$(".main").attr("align","center");
	$(".main").css("margin-right","0px");

	//ID
	$("#hd").remove();
	$("#doc-header-test").remove();
	$("#lastcell-dialog").remove();
	$("#ft").remove();
	$("#next_doc_box").remove();
	$("#view-like-recom").remove();
	$("#guess-like-doc").remove();
	$("#fc-left").remove();

	//类
	$(".crubms-wrap").remove();
	$(".wk-other-new-cntent").remove();
	$(".doc-tag-wrap.super-vip").remove();
	$(".aside.aside-v3").remove();
	$(".fix-searchbar-wrap").remove();
	$(".reader-back2top-wrap").remove();
	$(".banner-ad.banner-wrap").remove();
	$(".ft").remove();
	$(".wkfc-wrap").remove();
	$(".aside").remove();
	$(".fc-inner").remove();

	$('a[title="全屏显示"]').remove();

	//隐藏
	$("#doc_bottom_wrap").hide();
	$(".reader-tools-bar-wrap.tools-bar-small").hide();

	//克隆
	Clone=true;

	//克隆指示
	ShowCloneState();
}

function DocClone(){
	//
	if(Clone==true)
	{
		//
		PageTLen=$("#mainPanel").outerHeight(true);
		PageSLen=PageTLen/PageCount;
		//
		CurScrollBarState=$(window).scrollTop();
		//
		for (var i=1;i<=PageCount;i++)
		{
			if(CurScrollBarState>=PageSLen*(i-1)&&CurScrollBarState<PageSLen*i)
			{
				CurPageCount=i;
			}
		}
		//
		if(PageArray[CurPageCount-1]=="Yes")
		{
			//
			PageArray[CurPageCount-1]="No";
			//
			SCSDivID="#SCSCloneDiv"+CurPageCount;
			$(SCSDivID).css("background-color","#66CD00");
		}
		//
		if(PageArray.toString()===PageArrayFinish.toString()){
			//
			Clone=false;
			//
			clearInterval(ThisScroll);
			//
			$('div[id*="CloneDiv"]').each(function(i){
				$(this).hide();
			});
			//
			window.scroll(0,0);
		}
	}
}

function BaiDuClone(){
	//
	if(Clone==true)
	{
		//
		CurPageCount=parseInt($(".page-input").val());
		//
		if(PageArray[CurPageCount-1]=="Yes")
		{
			//
			PageArray[CurPageCount-1]="No";
			//
			PageID="#pageNo-"+CurPageCount;
			//
			CloneDivObject[CurPageCount-1] = $(PageID).clone();
			//
			SCSDivID="#SCSCloneDiv"+CurPageCount;
			$(SCSDivID).css("background-color","#66CD00");
		}
		//
		if(PageArray.toString()===PageArrayFinish.toString()){
			//
			Clone=false;
			//
			clearInterval(ThisScroll);
			//
			$('div[id*="pageNo"]').each(function(i){
				CloneDivObject[i].replaceAll($(this).parent());
			});
			//
			window.setTimeout(function(){
				$('div[id*="CloneDiv"]').each(function(i){
					$(this).hide();
				});
			}, 3000);
		}
	}
}

function ShowCloneState(){
	//
	var ThisDivStyle;
	var ThisTopJi=5;
	var ThisTopOu=5;
	var ThisDivName;
	//
	for (var i=1;i<=PageCount;i++)
	{
		//
		ThisDivName="SCSCloneDiv"+i;
		//
		if(i%2==1){
			//
			ThisDivStyle="<div id="+ThisDivName+" style=\"position:fixed; top:"+ThisTopJi+"%; right:5%; width:15px; height:15px; background-color:#FFCC00;\"></div>";
			//
			ThisTopJi+=2;
		}
		else{
			//
			ThisDivStyle="<div id="+ThisDivName+" style=\"position:fixed; top:"+ThisTopOu+"%; right:4%; width:15px; height:15px; background-color:#FFCC00;\"></div>";
			//
			ThisTopOu+=2;
		}
		//
		$("body").append(ThisDivStyle);
	}
}
//***************************************函数***************************************//