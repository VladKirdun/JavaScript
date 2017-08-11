
var mainDiv = document.getElementById("container");

var slider = document.createElement("div");
slider.setAttribute("class","fly");
var deltaX;

mainDiv.appendChild(slider);

var transparency = document.createElement("div");
transparency.setAttribute("class", "transparency");

var bigPhoto = document.createElement("img");
bigPhoto.setAttribute("class", "bigPhoto");
bigPhoto.setAttribute("src", "images/anton.jpg");

transparency.addEventListener("click", function(){
	bigPhoto.style.display = "none";
	transparency.style.display = "none";
	document.body.style.overflow = "auto";
});

document.body.appendChild(bigPhoto);
document.body.appendChild(transparency);

function showInfo(e) {

	var photoSrc = e.target.getAttribute("src");

	bigPhoto.setAttribute("src", photoSrc.slice(0, -10) + ".jpg");

	transparency.style.display = "block";
	bigPhoto.style.display = "block";
	document.body.style.overflow = "hidden";

}

for (var i = 0; i < slider.children.length; i++) {
	slider.children[i].addEventListener("mouseup", showInfo);
}


function move(e) {
	var pX = e.pageX;
	slider.style.left = (pX - deltaX) + "px";

	if(slider.offsetLeft > 0) {
		slider.style.left = 0;
	} else if(slider.offsetLeft < -240) {
		slider.style.left = -240 + "px";
	}

	for (var i = 0; i < slider.children.length; i++) {
		slider.children[i].removeEventListener("mouseup", showInfo);
	}
};

function startDrag(e) {
	e.preventDefault();
	deltaX = e.pageX - slider.offsetLeft;
	window.addEventListener("mousemove", move);

	for (var i = 0; i < slider.children.length; i++) {
		slider.children[i].addEventListener("mouseup", showInfo);
	}	
};

function stopDrag(e) {
	window.removeEventListener("mousemove", move);
	var mainDivWidth = mainDiv.offsetWidth;
	var delta = -(slider.scrollWidth - mainDivWidth);
};

slider.onmousedown = startDrag;
document.body.onmouseup = stopDrag;


function CreateItem( userName, photo, littlePhoto, likesNum ) {
	this.userName = userName;
	this.photo = photo;
	this.littlePhoto = littlePhoto;
 	this.likesNum = likesNum;
};

CreateItem.prototype.render = function() {
	
	var wrap = document.createElement("div");
	wrap.setAttribute("class", "wrap");

	var littlePhoto = document.createElement("img");
	littlePhoto.setAttribute("src", this.littlePhoto);
	littlePhoto.setAttribute("class", "littlePhoto");

	wrap.appendChild(littlePhoto);
	slider.appendChild(wrap);

	var item = document.createElement("div");
	item.setAttribute("class", "item");

	var name = document.createElement("h3");
	name.textContent = this.userName;
	name.setAttribute("class","name");

	var photo = document.createElement("img");
	photo.setAttribute("src", this.photo);

	var likesHolder = document.createElement("div");
	var likes = document.createElement("div");
	likes.setAttribute("class", "likes");
	likes.textContent = this.likesNum;
	likesHolder.appendChild(likes);
	likes.addEventListener("click", function(event){
		event.target.textContent++;
	});

	var comments = document.createElement("input");
	comments.setAttribute('placeholder','Add the comment');
	comments.setAttribute("class", "comments");

	var ulHide = document.createElement("ul");
	ulHide.setAttribute("class","ulHide");
			
	var blockForComments = document.createElement("div");
	blockForComments.setAttribute("class","blockForComments");
			
	var comm = ["You are so beautiful :D", "Nice!", "Wonderful!!!", "I like :)"];
	for (var i = 0; i < comm.length; i++) {
		var liHide = document.createElement("li");
		liHide.textContent = comm[i];
		liHide.addEventListener("click", function(event){
			var text = event.target.textContent;
			blockForComments.innerHTML += "<p>"+text+"</p>";
			ulHide.style.display = "none";
		});
		ulHide.appendChild(liHide);
	}

	function hide() {
		ulHide.style.display = "none";
		comments.style.borderRadius = "3px";
	}

	function show() {
		ulHide.style.display = "block";
		comments.style.borderRadius = "3px 3px 0 0";
	}

	comments.addEventListener("mouseover", show);
	ulHide.addEventListener("mouseover", show);
	comments.addEventListener("mouseout", hide);
	ulHide.addEventListener("mouseout", hide);

	item.appendChild(name);
	item.appendChild(photo);
	item.appendChild(likesHolder);
	item.appendChild(comments);
	item.appendChild(ulHide);
	item.appendChild(blockForComments);

	return item
};

var users = [ 
	["Anton", "images/anton.jpg", "images/antonLittle.png", 24],
	["Kseniya", "images/kseniya.jpg", "images/kseniyaLittle.png", 31],
	["Vlad", "images/vlad.jpg", "images/vladLittle.png", 253],
	["Kate", "images/kate.jpg", "images/kateLittle.png", 23],
	["Zhenya", "images/zhenya.jpg", "images/zhenyaLittle.png", 78]
];

var persons = [];

for(var i = 0; i < users.length; i++) {
	persons.push( new CreateItem( users[i][0],  users[i][1], users[i][2], users[i][3]) ); 
};

for(var i = 0; i < persons.length; i++) {
	mainDiv.appendChild( persons[i].render() );
};
