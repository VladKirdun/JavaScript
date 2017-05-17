var board = document.getElementById("board");
var addBtn = document.getElementById("newnote");

var deltaX;
var deltaY;

var notaDataArr = [];

function NoteData(){
	this.text = "Add text here";
	this.pos = [getRandomInt(0, screen.width-300), getRandomInt(0, screen.height-300)];
};

function Note( data, parentIndex, parentArray ) {
	this.parIndex = parentIndex;
	this.parArray = parentArray;
	this.text = data.text;
	this.posX = data.pos[0];
	this.posY = data.pos[1];
	this.startDrag = function(e) {
		var parEl = e.target.parentElement;
		e.preventDefault();
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var divOffsetLeft = parEl.offsetLeft;
		var divOffsetTop = parEl.offsetTop;
		deltaX = mouseX - divOffsetLeft;
		deltaY = mouseY - divOffsetTop;
		this.move = function(e) {
			var pX = e.pageX;
			var pY = e.pageY;
			parEl.style.left = (pX - deltaX - 20) + "px";
			parEl.style.top = (pY - deltaY - 20) + "px";
			this.stopDrag = function(e) {
				window.removeEventListener("mousemove", this.move);
			}
			parEl.onmouseup = this.stopDrag;
		}
		window.addEventListener("mousemove", this.move);
	}

	this.render = function() {
		var divNote = document.createElement("div");
		divNote.className = "note";
		divNote.style.transform = "rotate(" + getRandomInt(-10, 10) + "deg)";
		var divText = document.createElement("div");
		divText.textContent = this.text;
		var textarea = document.createElement("textarea");
		textarea.onchange = function(e) {
			this.text = e.target.value;
			this.parArray[this.parIndex].text = this.text;
			console.log(this.parArray);
		}.bind(this);
		
		divNote.onclick = function(e){
			var elem = e.target.parentElement.children;
			elem[1].style.display = "block";
		};
		divNote.onmousedown = this.startDrag;
		
		var innerFunc = function() {
			console.log(this);
		};

		divNote.appendChild(divText);
		divNote.appendChild(textarea);
		divNote.style.left = this.posX + "px";
		divNote.style.top = this.posY + "px";
		return divNote
	}
};

function addData() {
	var newData = new NoteData();
	notaDataArr.push(newData);
};

function createNote() {
	board.innerHTML = "";
	notaDataArr.map(function(item, index, arr) {
		board.appendChild(new Note(item, index, arr).render());
	});	
};

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

addBtn.onclick = function() {
	addData();
	createNote();
}
