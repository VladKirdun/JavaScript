
var main = document.createElement("main");

function Constractor(image, name, price) {
	this.image = image;
	this.name = name;
	this.price = price;
}

Constractor.prototype.render = function() {

	var product = document.createElement("div");
	product.setAttribute("class","product");

	var photo = document.createElement("div");
	photo.innerHTML = "<img src='" + this.image + "'>";

	var addToCart = document.createElement("input");
	addToCart.setAttribute("type","button");
	addToCart.setAttribute("value","В КОРЗИНУ");
	addToCart.setAttribute("class", "addToCart");
	var readMore = document.createElement("input");
	readMore.setAttribute("type","button");
	readMore.setAttribute("value","ПОДРОБНЕЕ");
	readMore.setAttribute("class", "readMore");

	var itemName = document.createElement("h3");
	itemName.textContent = this.name;

	var itemPrice = document.createElement("span");
	itemPrice.textContent = this.price;

	var mainInfo = document.createElement("div");
	mainInfo.appendChild(itemName);
	mainInfo.appendChild(itemPrice);

	var dopInfo = document.createElement("div");
	dopInfo.style.display = "none";
	dopInfo.appendChild(addToCart);
	dopInfo.appendChild(readMore);

	var hideDiv = document.createElement("div");
	hideDiv.setAttribute("class","hideDiv");
	
	hideDiv.addEventListener("mouseover",function(){
		product.style.paddingBottom = "3px";
		dopInfo.style.display = "block";
		mainInfo.style.display = "none";
	});

	hideDiv.addEventListener("mouseout",function(){
		mainInfo.style.display = "block";
		dopInfo.style.display = "none";
		product.style.paddingBottom = "5px";
	});
	
	hideDiv.appendChild(mainInfo);
	hideDiv.appendChild(dopInfo);
	
	product.appendChild(photo);
	product.appendChild(hideDiv);

	return product

}

var products = [
	["images/apple.jpg", "Apple", 150],
	["images/banana.jpg", "Banana", 200],
	["images/orange.jpg", "Orange", 180],
	["images/mango.jpg", "Mango", 230],
	["images/hurma.jpg", "Hurma", 250],
	["images/grape.jpg", "Grape", 170],
	["images/lemon.jpg", "Lemon", 140],
	["images/kivi.jpg", "Kivi", 190],
	["images/grapefruit.jpg", "Grapefruit", 210]
];

var items = [];

for(var i = 0; i < products.length; i++) {
	items.push( new Constractor(products[i][0], products[i][1], products[i][2]));
}

function sorted(){
	if(sel.options.selectedIndex == 0){
		items.sort(sortOnCost);
	}else{
		items.sort(sortOnName);
	}
	main.innerHTML = "";
	for(var i = 0; i < items.length; i++) {
		main.appendChild(items[i].render());
	}
};

function sortOnCost(productA, productB) {
  if(productA.price > productB.price) {
  	return 1
  }
  else {
  	return -1
  }
}

function sortOnName(productA, productB) {
  if(productA.name > productB.name){
  	return 1
  }
  else {
  	return -1
  }
}

var navElem = document.createElement("nav");
var ulElem = document.createElement("ul");
var liOne = document.createElement("li");
liOne.textContent = "1";
var liTwo = document.createElement("li");
liTwo.textContent = "2";
var liThree = document.createElement("li");
liThree.textContent = "3";

navElem.appendChild(ulElem);
ulElem.appendChild(liOne);
ulElem.appendChild(liTwo);
ulElem.appendChild(liThree);
document.body.appendChild(navElem);

var asideElem = document.createElement("aside");

var searchH2 = document.createElement("h2");
searchH2.textContent = "Search";
var searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "search...");
searchInput.setAttribute("class", "getName");
searchInput.oninput = function(){
	var result = filterName(items, searchInput.value.toLowerCase());
	main.innerHTML = "";
	for(var i = 0; i < result.length; i++) {
		main.appendChild(result[i].render());
	}
}
var buttonSort = document.createElement("button");
buttonSort.textContent = "Sort";
buttonSort.setAttribute("class", "buttonSort");

var priceH2 = document.createElement("h2");
priceH2.textContent = "Price";
var priceInput = document.createElement("input");
priceInput.setAttribute("type", "range");
priceInput.setAttribute("min", 100);
priceInput.setAttribute("max", 300);
priceInput.setAttribute("value", 300);
var priceValueInput = document.createElement("input");
priceValueInput.setAttribute("type", "text");
priceValueInput.setAttribute("class", "sort");
priceValueInput.value = 300;
priceInput.oninput = function(){
	priceValueInput.value = priceInput.value;
	var result = filterMaxPrice(items, priceInput.value);
	main.innerHTML = "";
	for(var i = 0; i < result.length; i++) {
		main.appendChild(result[i].render());
	}
}

var sortH2 = document.createElement("h2");
sortH2.textContent = "Sort";
var sel = document.createElement("select");
var op1 = document.createElement("option");
op1.textContent = "By Cost";
var op2 = document.createElement("option");
op2.textContent = "By Name";

var showFullList = document.createElement("button");
showFullList.textContent = "Show Full List";

asideElem.appendChild(searchH2);
asideElem.appendChild(searchInput);
asideElem.appendChild(priceH2);
asideElem.appendChild(priceInput);
asideElem.appendChild(priceValueInput);
asideElem.appendChild(sortH2);
asideElem.appendChild(sel);
sel.appendChild(op1);
sel.appendChild(op2);
asideElem.appendChild(buttonSort);
asideElem.appendChild(showFullList);

var wrapper = document.createElement("div");
wrapper.setAttribute("class", "wrapper");
wrapper.appendChild(asideElem);
wrapper.appendChild(main);
document.body.appendChild(wrapper);

for(var i = 0; i < items.length; i++) {
		main.appendChild(items[i].render());
	}

function buttonFunc1() {
	main.innerHTML = "";
	for(var i = 0; i < 3; i++) {
		main.appendChild(items[i].render());
	}
}

function buttonFunc2() {
	main.innerHTML = "";
	for(var i = 3; i < 6; i++) {
		main.appendChild(items[i].render());
	}
}

function buttonFunc3() {
	main.innerHTML = "";
	for(var i = 6; i < 9; i++) {
		main.appendChild(items[i].render());
	}
}

function showList() {
	main.innerHTML = "";
	for(var i = 0; i < items.length; i++) {
		main.appendChild(items[i].render());
	}
}

liOne.onclick = buttonFunc1;
liTwo.onclick = buttonFunc2;
liThree.onclick = buttonFunc3;
showFullList.onclick = showList;
buttonSort.onclick = sorted;


function filterMaxPrice(arr, pIv){
  var newarr = arr.filter(function(item){
    return item.price <= pIv;
  });
  return newarr
}

function filterName(arr, sIv){
  var newarr = arr.filter(function(item){
    return item.name.toLowerCase().includes(sIv);
  });
  return newarr
}
