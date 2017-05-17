var wrapper = document.createElement("div");
wrapper.setAttribute("class","wrapper");

var textInput = document.createElement("input");
textInput.setAttribute("class", "textInput");
textInput.setAttribute("placeholder", "Enter text");

var button = document.createElement("button");
button.setAttribute("class", "button");
button.setAttribute("disabled","true");
button.textContent = "Click";

var span = document.createElement("span");
span.setAttribute("class","span");
button.addEventListener("click", function() {
	if (textInput.value.length < 3) {
		span.textContent = "";
		span.textContent = "Too few characters!";
		span.style.display = "block";
	}
	else if (textInput.value.length > 10) {
		span.textContent = "";
		span.textContent = "Too many characters!";
		span.style.display = "block";
	}
	else {
		span.textContent = "";
		span.style.display = "none";
		var paragraph = document.createElement("p");
		paragraph.setAttribute("class", "paragraph");
		paragraph.textContent = textInput.value;

		var close = document.createElement("span");
		close.setAttribute("class", "close");
		close.textContent = "x";

		close.addEventListener("click", function() {
			this.parentElement.remove();
		});

		paragraph.appendChild(close);

		wrapper.appendChild(paragraph);
	}
});

var check = document.createElement("input");
check.setAttribute("type", "checkbox");
check.setAttribute("id", "check");

function getStatus(event){
	var ch = event.target;
	if(ch.checked == true){
		button.disabled = false;
		button.style.background = "#177246";
		button.addEventListener("mouseover", function(){
			button.style.background = "#00A86B";
		});
		button.addEventListener("mouseout", function(){
			button.style.background = "#177246";
		});
	}
	else {
		button.disabled = true;
		button.removeAttribute("style");
	}
}

var checkText = document.createElement("label");
checkText.setAttribute("for","check");
checkText.textContent = "I agree";

check.onchange = getStatus;

wrapper.appendChild(textInput);
wrapper.appendChild(button);
wrapper.appendChild(check);
wrapper.appendChild(checkText);
wrapper.appendChild(span);

document.body.appendChild(wrapper);