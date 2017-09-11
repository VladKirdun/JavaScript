
var html = document.documentElement;

if(html.clientWidth > html.clientHeight) {
	if(html.clientWidth > 1024) {
		document.body.innerHTML = "";
		alert("Зайдите с мобильного устройства");
	}
	else {
		document.body.innerHTML = "";
		alert("Поверните устройство в вертикальное положение");
	}
}

var dpt = window.devicePixelRatio;
if(dpt == 2) {
	dpt++;
}

var wrap = document.getElementsByClassName("wrap")[0];
wrap.style.height = html.clientHeight + "px";
wrap.style.width = html.clientWidth + "px";

var select = document.getElementsByClassName("wrap__select")[0];
var quote = document.getElementById("quote");
var trial = document.getElementById("trial");

function getAjaxJson() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			var resp = request.responseText;
			var langsObj = JSON.parse(resp);

			for(var i = 0; i < select.children.length; i++) {
				if(select.children[i].selected){
					for(var j = 0; j < langsObj.langs.length; j++) {					
						if(select.children[i].value == langsObj.langs[j].lang) {
							quote.textContent = langsObj.langs[j].quote.toUpperCase();
							trial.textContent = langsObj.langs[j].trial.toUpperCase();

							switch(langsObj.langs[j].lang) {
								case "en":
									quote.style.fontSize = dpt * 22 + "px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 18 + "px";
									trial.style.lineHeight = "1";
									break;
								case "es":
									quote.style.fontSize = dpt * 18 + "px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 16 + "px";
									trial.style.lineHeight = "1";
									break;
								case "de":
									quote.style.fontSize = dpt * 21 + "px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 16 + "px";
									trial.style.lineHeight = "1";
									break;
								case "fr":
									quote.style.fontSize = dpt * 21 + "px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 16 + "px";
									trial.style.lineHeight = "1";
									break;
								case "ja":
									quote.style.fontSize = dpt * 22 + "px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 19 + "px";
									trial.style.lineHeight = "1";
									break;
								case "it":
									quote.style.fontSize = dpt * 19 + "px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 18 + "px";
									trial.style.lineHeight = "1";
									break;
								case "ru":
									quote.style.fontSize = dpt * 16 + "px";
									quote.style.lineHeight = "1.2";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = dpt * 13 + "px";
									trial.style.lineHeight = "1.2";
									break;
								default:
									quote.style.fontSize = "66px";
									quote.style.lineHeight = "1";
									quote.style.marginBottom = "15px";
									trial.style.fontSize = "60px";
									trial.style.lineHeight = "1";				
							}
						}
					}
				}
			}
		}
	}
	request.open("GET", "langs.json", true);
	//request.responseType = "json";
	request.send();
};

getAjaxJson();

select.addEventListener("change", getAjaxJson);
