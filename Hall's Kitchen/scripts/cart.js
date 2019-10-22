//const cart = localStorage.getItem("cart")

//console.log(cart)
//console.log("logged cart")

const menuJSON = getMenuJSON()


function addCartItemsToHTML ()
{
	console.log("Starting addCartItemsToHTML")
	let storage = localStorage;
	if (storage.length === 0)
	{
		console.log("no cart found")
		return
	}
	else if (storage["cart"] != null)
	{
		let cart = storage["cart"]
		let JSONcart = JSON.parse(cart)
		for (let thing in JSONcart)
		{
			createItemDiv(thing, JSONcart[thing])
			//console.log(thing + " : " + JSONcart[thing])
		}
	}
	console.log("addCartItemsToHTML done")
}

function createItemDiv (itemName, number)
{
	// Initializing the variables needed
	let itemDiv = document.createElement('div')
	let imageDiv = document.createElement('div')
	let choiceDiv = document.createElement('div')
	let priceDiv = document.createElement('div')
	//let image = document.createElement('img')

	// Setting the image
	/*
	image.src = menuJSON[itemName]["image_small"];
	image.width = "180px";
	image.className = "cartImage";
	*/

	//imageDiv.appendChild(image);
	imageDiv.className = "cartImageDiv";
	imageDiv.style.backgroundImage = "url('" + menuJSON[itemName]['image_small'] + "')"
	imageDiv.style.backgroundPosition = "center"
	itemDiv.appendChild(imageDiv);
	itemDiv.appendChild(choiceDiv)
	itemDiv.appendChild(priceDiv)
	if (menuJSON[itemName]["type"] === "dinner")
	{
		let parentDiv = document.getElementById("dinners");
		parentDiv.appendChild(itemDiv);
	}
}

function getMenuJSON()
{
	var request = new XMLHttpRequest();
	request.open("GET", "JSON_files/menuItems.json", false);
	request.send(null);
	var data = request.responseText;
	console.log(data);
	console.log(typeof data);
	console.log(typeof JSON.parse(data));
	console.log(JSON.parse(data));
	return JSON.parse(data);

}


addCartItemsToHTML()


