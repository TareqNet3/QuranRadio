$(document).ready(function()
{
	bg = chrome.extension.getBackgroundPage();
	holder = bg.document.getElementById("holder");
	$(holder).append("<audio id='AudioPlayer' src='" + localStorage.url + "' ></audio>" );
	chrome.browserAction.setBadgeText({"text":""});
});