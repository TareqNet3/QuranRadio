function getData(callback)
{
	try 
	{
		$.getJSON("https://labs.tareq.tk/QuranRadio/data/radios.json", function(data, textStatus, xhr)
		{
			if(xhr.status == 200)
			{
				if(typeof(callback) == "function")
					callback(data);
			}
			else
			{
				throw xhr.status;
			}
		});
	}
	catch (e)
	{
		$.getJSON("data/radios.json", function(data)
		{
			console.log(data);
			if(typeof(callback) == "function")
				callback(data);
		});
	}
}

function initRadios(data)
{
	localStorage.setItem('radios_urls', JSON.stringify(data));
	localStorage.url = JSON.parse(localStorage.getItem('radios_urls'))[0]["url"];
	localStorage.title = JSON.parse(localStorage.getItem('radios_urls'))[0]["title"];
}

function getRadios()
{
	return JSON.parse(localStorage.getItem('radios_urls'));
}

function addRadio(obj)
{
	var radios = JSON.parse(localStorage.getItem('radios_urls'));
	obj["ID"] = radios.length;
	radios.push(obj);
	localStorage.setItem('radios_urls', JSON.stringify(radios));
}

function deleteRadio(ID)
{
	var radios = JSON.parse(localStorage.getItem('radios_urls'));
	// radios.pull(ID);
	// localStorage.setItem('radios_urls', JSON.stringify(radios));
}

$(document).ready(function()
{
	if(!localStorage.firstTime)
	{
		getData(initRadios);
		localStorage.firstTime = false;
	}
});

//http://www.mp3quran.net/radio.html