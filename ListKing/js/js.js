var wrapper = document.createElement("div");
wrapper.setAttribute("class","wrapper");

var logo = document.createElement("img");
logo.setAttribute("src","images/logo.png");
logo.setAttribute("class", "logo");
wrapper.appendChild(logo);

var logoName = document.createElement("span");
logoName.textContent = "LISTKING";
logoName.setAttribute("class","logoName");
wrapper.appendChild(logoName);

var h1 = document.createElement("h1");
h1.textContent = "BUY GROCERIES";
h1.setAttribute("class","h1");
wrapper.appendChild(h1);

var ulHide = document.createElement("ul");
ulHide.setAttribute("class","ulHide");
wrapper.appendChild(ulHide);

var arr = ["fresh figs","pine nuts","honey"];
for (var i = 0; i < 3; i++) {
	var textRed = document.createElement("li");
	textRed.textContent = arr[i];
	textRed.style.background = "url(images/bgRed.jpg)";
	textRed.style.textShadow = "0 0 7px #000";
	ulHide.appendChild(textRed);
}

var addDescription = document.createElement("input");
addDescription.setAttribute("placeholder","Add description...");
addDescription.setAttribute("class","addDescription");
wrapper.appendChild(addDescription);

var buttonAdd = document.createElement("button");
buttonAdd.textContent = "ADD";
buttonAdd.setAttribute("class","buttonAdd");
wrapper.appendChild(buttonAdd);

var buttonNewItem = document.createElement("button");
buttonNewItem.textContent = "NEWITEM";
buttonNewItem.setAttribute("class","buttonNewItem");
wrapper.appendChild(buttonNewItem);

buttonNewItem.addEventListener("click", function(){
	buttonNewItem.style.display = "none";
	addDescription.style.display = "inline-block";
	buttonAdd.style.display = "inline-block";
});

buttonAdd.addEventListener("click", function(){
	var text = addDescription.value;
	if (text != "") {
		ulHide.innerHTML += "<li>" + text + "</li>";
		buttonAdd.style.display = "none";
		addDescription.style.display = "none";
		buttonNewItem.style.display = "inline-block";
	}
	addDescription.value = "";
});

document.body.appendChild(wrapper);