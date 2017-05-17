// "use strict"

var mainDiv = document.getElementById("container");

var div = document.createElement("div");
div.setAttribute("class","fly");
var deltaX;

var divImgSrc = document.createElement("div");
function showInfo(e) {
	var imgSrc = e.target.getAttribute("src");
	var img = document.createElement("img");
	divImgSrc.innerHTML = "";
	img.style.cssText = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: auto; height: 80%;";
	img.setAttribute("src", imgSrc);
	divImgSrc.appendChild(img);
	document.body.appendChild(divImgSrc);
	document.body.style.cssText = "background: #000;";
	mainDiv.style.display = "none";
	img.addEventListener("click", function() {
		divImgSrc.innerHTML = "";
		document.body.style.cssText = "background: none;";
		mainDiv.style.display = "block";
	});
}

for (var i = 0; i < div.children.length; i++) {
	div.children[i].addEventListener("mouseup", showInfo);
}

function move(e) {
	var pX = e.pageX;
	div.style.left = (pX - deltaX) + "px";

	for (var i = 0; i < div.children.length; i++) {
		div.children[i].removeEventListener("mouseup", showInfo);
	}
};

function startDrag(e) {
	e.preventDefault();
	deltaX = e.pageX - div.offsetLeft;
	window.addEventListener("mousemove", move);
};

function stopDrag(e) {
	window.removeEventListener("mousemove", move);
	var mainDivWidth = mainDiv.offsetWidth;
	var delta = -(div.scrollWidth - mainDivWidth);
	if(div.offsetLeft > 0) {
		div.style.left = 0;
	} else if(div.offsetLeft < delta) {
		div.style.left = delta + "px";
	}

for (var i = 0; i < div.children.length; i++) {
		div.children[i].addEventListener("mouseup", showInfo, false);
	}	

};

div.onmousedown = startDrag;
div.onmouseup = stopDrag;

mainDiv.appendChild(div);

function CreateItem( userName, photo, likesNum ) {
 this.userName = userName;
 this.photo = photo;
 this.likesNum = likesNum;
};

CreateItem.prototype.render = function() {
		var item = document.createElement("div");
			item.setAttribute("class", "item");

			var heading = document.createElement("h3");
			heading.textContent = this.userName;
			heading.setAttribute("class","h3");

			var img = document.createElement("img");
			img.setAttribute("src", this.photo);

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

			item.appendChild(heading);
			item.appendChild(img);
			item.appendChild(likesHolder);
			item.appendChild(comments);
			item.appendChild(ulHide);
			item.appendChild(blockForComments);
	
			return item
	};

var users = [ 
	["Anton", "images/anton.jpg", 24],
	["Kseniya", "images/kseniya.jpg", 31],
	["Vlad", "images/vlad.jpg", 253],
	["Kate", "images/kate.jpg", 23],
	["Zhenya", "images/zhenya.jpg", 78]
];

var persons = [];

for(var i = 0; i < users.length; i++) {
	persons.push( new CreateItem( users[i][0],  users[i][1], users[i][2]) );
	div.innerHTML += "<img src='" + users[i][1] + "'>"; 
};

for(var i = 0; i < persons.length; i++) {
	mainDiv.appendChild( persons[i].render() );
	console.log(persons[i].photo);
};
