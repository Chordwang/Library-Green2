//***************************************程序***************************************//
chrome.contextMenus.create({
	"id":"contextId",
	"title":"绿化·文库  [F5恢复]",
	"contexts":["page"],
	"documentUrlPatterns":[ "https://wenku.baidu.com/view/*",
							"http://wenku.baidu.com/view/*",
							"https://www.doc88.com/*",
							"http://www.doc88.com/*"]
	});

chrome.contextMenus.onClicked.addListener(genericOnClick);
//***************************************程序***************************************//

//***************************************函数***************************************//
function genericOnClick(info, tab) {
	//
	chrome.tabs.executeScript(null,{"file": "jspdf.min.js"},function(){
		chrome.tabs.executeScript(null,{"file": "jquery-3.4.1.min.js"},function() {
			chrome.tabs.executeScript(null,{"file": "html2canvas.min.js"},function() {
				chrome.tabs.sendMessage(tab.id,{"message":"Go"});
			});
		});
	});
}
//***************************************函数***************************************//