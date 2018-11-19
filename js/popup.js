var audio, audio2, control, bg;

$(document).ready(function()
{
	bg = chrome.extension.getBackgroundPage();
	audio = bg.document.getElementById("AudioPlayer");
	$("#title").html(localStorage.title);

	control = $("#control");

	if(audio.paused)
	{
		control.attr("src", "Icons/play.png");
	}
	else
	{
		control.attr("src", "Icons/pause.png");
	}

	control.click(function()
	{
		if($(this).attr("src") == "Icons/play.png")
		{
			play();
		}
		else
		{
			stop();
		}
	});
	
	var radios_list = $("#radios-list");
	
	var radios_array = getRadios();
	for(i = 0; i < radios_array.length; i++)
	{
		var url = radios_array[i]["url"];
		var title = radios_array[i]["title"];
		radios_list.append("<li class='radio-list' data-title='" + title + "' data-url='" + url + "'>" + title + "</li>");
	}

	var radio_list = $(".radio-list");

	radio_list.click(function()
	{
		localStorage.url = $(this).data("url");
		localStorage.title = $(this).data("title");
		play(localStorage.url);
	});
});

function play(url)
{
	if(url != undefined && audio.src != url)
	{
		audio.remove();
		holder = bg.document.getElementById("holder");
		$(holder).append("<audio id='AudioPlayer' src='" + url + "' ></audio>" );
		audio = bg.document.getElementById("AudioPlayer");
	}
	control.attr("src", "Icons/pause.png");
	$("#title").html(localStorage.title);
	audio.play();
	
	chrome.browserAction.setBadgeBackgroundColor({"color": "#187700"});
	chrome.browserAction.setBadgeText({"text":"►"});
	chrome.browserAction.setTitle({"title" : "Quran Radio - " + localStorage.title});

	console.log(audio.src);
}

function stop()
{
	if(audio != undefined)
	{
		audio.pause();
	}
	control.attr("src", "Icons/play.png");
	chrome.browserAction.setBadgeText({"text":""});
	console.log("stop");
}