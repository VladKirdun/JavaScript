var board = document.getElementById("board");
var addNote = document.getElementById("newnote");
var html = document.documentElement;

function createNote(){

	var wrap = document.createElement("div");
	wrap.setAttribute("class", "note");
	wrap.style.left = getRandomInt(0, html.clientWidth - 300) + "px";
	wrap.style.top = getRandomInt(0, html.clientHeight - 300) + "px";
	wrap.style.transform = "rotate(" + getRandomInt(-10, 10) + "deg)";

	var overWrap = document.createElement("div");
	overWrap.setAttribute("class", "overWrap");

	var overWrapTextArea = document.createElement("textarea");
	overWrapTextArea.setAttribute("class", "overWrapTextArea");
	overWrapTextArea.setAttribute("readonly", "readonly");
	overWrapTextArea.value = "New Note";
	
	var wrapTextArea = document.createElement("textarea");
	wrapTextArea.setAttribute("class", "wrapTextArea");
	wrapTextArea.value = overWrapTextArea.value;

	var buttonSave = document.createElement("button");
	buttonSave.setAttribute("class", "buttonSave");
	buttonSave.addEventListener("click", function(){
		overWrap.style.display = "block";
		overWrapTextArea.value = wrapTextArea.value;
	});

	var imgSave = document.createElement("img");
	imgSave.setAttribute("src", "images/save.png");

	var buttonMod = document.createElement("button");
	buttonMod.setAttribute("class", "buttonMod");
	buttonMod.addEventListener("click", function(){
		overWrap.style.display = "none";
	});

	var imgMod = document.createElement("img");
	imgMod.setAttribute("src", "images/pencil.png");

	var buttonDel = document.createElement("button");
	buttonDel.setAttribute("class", "buttonDel");
	buttonDel.addEventListener("click", function(){
		board.removeChild(wrap);
	});

	var imgDel = document.createElement("img");
	imgDel.setAttribute("src", "images/trashCan.png");

	buttonSave.appendChild(imgSave);
	buttonMod.appendChild(imgMod);
	buttonDel.appendChild(imgDel);

	overWrap.appendChild(overWrapTextArea);
	overWrap.appendChild(buttonMod);
	overWrap.appendChild(buttonDel);

	wrap.appendChild(overWrap);
	wrap.appendChild(wrapTextArea);
	wrap.appendChild(buttonSave);

	board.appendChild(wrap);

	for(var i = 0; i < board.children.length; i++){
		board.children[i].addEventListener("mousedown", startDrag);
	}

}

addNote.addEventListener("click", createNote);

var deltaX;
var deltaY;

var notes = document.getElementsByClassName("note");

function startDrag(e) {
	var parentElement = e.target.parentElement.parentElement;
	var parentElementClass = parentElement.getAttribute("class");
	if(parentElementClass == "note" && e.target.tagName != "IMG" && e.target.tagName != "BUTTON"){
		
		for(var i = 0; i < notes.length; i++) {
			notes[i].style.zIndex = 1;
		}
		parentElement.style.zIndex = 10;

		e.preventDefault();
		deltaX = e.pageX - parentElement.offsetLeft;
		deltaY = e.pageY - parentElement.offsetTop;

		function move(e) {
			var pX = e.pageX;
			var pY = e.pageY;
			parentElement.style.left = (pX - deltaX) + "px";
			parentElement.style.top = (pY - deltaY) + "px";

			function stopDrag(e) {
				window.removeEventListener("mousemove", move);
			};

			window.onmouseup = stopDrag;
			
			if(parentElement.offsetLeft < 20) {
				parentElement.style.left = 20 + "px";
			} 
			else if(parentElement.offsetLeft > html.clientWidth - 220) {
				parentElement.style.left = html.clientWidth - 220 + "px";
			}
			else if(parentElement.offsetTop < 20) {
				parentElement.style.top = 20 + "px";
			}
			else if(parentElement.offsetTop > html.clientHeight - 220) {
				parentElement.style.top = html.clientHeight - 220 + "px";
			}

		};

		function stopDrag(e) {
			window.removeEventListener("mousemove", move);
		};

		window.onmouseup = stopDrag;
			
		window.addEventListener("mousemove", move);
	}
};

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
