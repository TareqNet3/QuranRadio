$(document).ready(function()
{
	LoadOptions();

	$("#save").click(SaveOptions);
	
	$("#radios-urls").append(
		"<p><input type='text' id='new-radio-name' class='site' placeholder='Radio Name' /> "
		+ "<input type='text' id='new-radio-url' class='site' placeholder='URL' /> "
		+ "<button id='add-site'>+</button></p>"
		);
	
	$("#add-site").click(function()
	{
		var new_radio_name = $("#new-radio-name").val();
		var new_radio_url = $("#new-radio-url").val();
		var radios_urls;
		
		if(localStorage.getItem('radios_urls') != null)
		{
			radios_urls = JSON.parse(localStorage.getItem('radios_urls'));
		}
		else
		{
			radios_urls = Object();
		}

		if(typeof radios_urls["urls"] == 'undefined')
		{
			radios_urls["urls"] = Array();
		}
		
		radios_urls["urls"].push({"radio-name" : new_radio_name, "radio-url" : new_radio_url});
		localStorage.setItem('radios_urls', JSON.stringify(radios_urls));

		var i = $("#stored-urls").length;
		
		$("#stored-urls").append("<p><div class='url'>" + new_radio_name + "</div> <div class='url'>" + new_radio_url + "</div> <button id='del-" + i + "'>-</button></p>");
		$("#del-" + i).click(DeleteURL);
		
		$("#new-radio-name").val("");
		$("#new-radio-url").val("");
		
		Notify("URL Added");
	});
});

function LoadOptions()
{
	$("#radios-urls").append("<div id='stored-urls'></div>");

	if(localStorage.radios_urls != null)
	{
		var radios_urls = localStorage.getItem('radios_urls');
		var urls = JSON.parse(radios_urls)["urls"];

		for(i = 0; i < urls.length; i++)
		{
			$("#stored-urls").append("<p><lable class='site'>" + urls[i] + "</lable> <button id='del-" + i + "'>-</button></p>");
			$("#del-" + i).on('click', DeleteURL);
		}
	}
}

function SaveOptions()
{
	Notify();
}

function DeleteURL()
{
	var j = this.id;
	var n = j.replace("del-", "")
	
	$(this).parent().remove();
	
	var radios_urls = JSON.parse(localStorage.getItem('radios_urls'));

	radios_urls["urls"].splice(n, 1);
	
	localStorage.setItem('radios_urls', JSON.stringify(radios_urls));

	Notify("Site Deleted");
}

function Notify(message)
{
	if(message)
	{
		$("#ShowNotification").html(message);
	}
	else
	{
		$("#ShowNotification").html("Saved Successfully");
	}
	$("#ShowNotification").fadeIn().delay(800).fadeOut();
}