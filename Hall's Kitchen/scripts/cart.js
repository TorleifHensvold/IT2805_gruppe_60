//const cart = localStorage.getItem("cart")

//console.log(cart)
//console.log("logged cart")

//const menuJSON = getMenu();
const menuJSON = menuItems;
const priceIdArray = [];
console.log(menuJSON);
console.log(typeof menuJSON);


function addCartItemsToHTML ()
{
	console.log('Starting addCartItemsToHTML');
	let storage = localStorage;
	if (storage.length === 0)
	{
		console.log('no cart found');
		return;
	}
	else if (storage['cart'] != null)
	{
		let cart = storage['cart'];
		let JSONcart = JSON.parse(cart);
		for (let thing in JSONcart)
		{
			createItemDiv(thing, JSONcart[thing]);
			//console.log(thing + " : " + JSONcart[thing])
		}
	}
	console.log('addCartItemsToHTML done');
}

function createItemDiv (itemName, number)
{
	// Initializing the variables needed
	let itemDiv = document.createElement('div');
	let imageDiv = document.createElement('div');
	let choiceDiv = document.createElement('div');
	let priceDiv = document.createElement('div');

	/*
		Creating the image div.
	 */
	imageDiv.className = 'cartImageDiv';
	imageDiv.style.backgroundImage = 'url(\'' +
		menuJSON[itemName]['image_small'] + '\')';
	imageDiv.style.backgroundPosition = 'center';
	imageDiv.style.backgroundSize = 'cover';
	imageDiv.style.backgroundRepeat = 'no-repeat';


	/*
		Creating the choiceDiv for setting the number of each item
	 */
	choiceDiv.className = 'cartChoiceDiv';
	let textfield = document.createElement('div');
	textfield.className = 'cartDescription';
	let name = menuJSON[itemName]['name'];
	let h2 = document.createElement('h2');
	h2.style.margin = '2px';
	h2.innerText = name;
	textfield.appendChild(h2);
	let p = document.createElement('p');
	p.style.margin = '2px';
	let description = menuJSON[itemName]['description'].substring(0, 40);
	p.innerText = description;
	textfield.appendChild(p);

	let minusButton = document.createElement('button');
	minusButton.className = 'minusButton';
	minusButton.innerText = '-';

	let numberfield = document.createElement('input');
	numberfield.value = number;
	numberfield.className = 'numberfield';
	numberfield.id = 'numberOf' + itemName;
	//numberfield.disabled = "true";

	let plusButton = document.createElement('button');
	plusButton.className = 'plusButton';
	plusButton.innerText = '+';


	choiceDiv.appendChild(textfield);
	choiceDiv.appendChild(minusButton);
	choiceDiv.appendChild(numberfield);
	choiceDiv.appendChild(plusButton);


	/*
		Creating the priceDiv which will take into account the number of each
		item and calculate a price to show.
	 */
	let priceText = document.createTextNode('Price:');
	priceDiv.appendChild(priceText);
	let priceField = document.createElement('input');
	priceField.disabled = true;
	let priceFieldID = 'price' + itemName;
	priceIdArray.push(priceFieldID);
	priceField.id = priceFieldID;
	priceDiv.appendChild(priceField);

	/*
		Appending all the children of itemDiv
	 */
	itemDiv.appendChild(imageDiv);
	itemDiv.appendChild(choiceDiv);
	itemDiv.appendChild(priceDiv);


	plusButton.addEventListener('click',
		() =>
		{
			incrementNumberOfDish(numberfield.id, itemName, priceField.id);
		});
	minusButton.addEventListener('click',
		() =>
		{
			decrementNumberOfDish(numberfield.id, itemName, priceField.id);
		});

	/*
		Choosing where to append the item
	 */
	itemDiv.className = 'itemDiv';
	let filter = menuJSON[itemName]['type'];
	if (filter === 'dinner')
	{
		appendChildDiv(itemDiv, 'dinners');
	}
	else if (filter === 'appetizer')
	{
		appendChildDiv(itemDiv, 'appetizers');
	}
	else if (filter === 'dessert')
	{
		appendChildDiv(itemDiv, 'desserts');
	}
	console.log(itemName + ': ' + number);
	calculateItemPrice(numberfield.id, itemName, priceField.id);
}

/**
 * Helper function to keep code succinct and non-repeating
 * @param childDiv The div we want to append to a parentDiv
 * @param parentID The ID the parent Element will have
 */
function appendChildDiv (childDiv, parentID)
{
	let parentDiv = document.getElementById(parentID);
	parentDiv.appendChild(childDiv);
}

/**
 * Helper function to keep code DRY, and ease overview.
 * @param numberID the ID of the HTML element containing the number
 * @param dishKey the key to the JSON for the dish
 * @param outputID the price field for calculating the price based on number
 */
function incrementNumberOfDish (numberID, dishKey, outputID)
{
	changeNumberOfDish(numberID, '+', dishKey, outputID);
}

/**
 * Helper function to keep code DRY, and ease overview.
 * @param numberID the ID of the HTML element containing the number
 * @param dishKey the key to the JSON for the dish
 * @param outputID the price field for calculating the price based on number
 */
function decrementNumberOfDish (numberID, dishKey, outputID)
{
	changeNumberOfDish(numberID, '-', dishKey, outputID);
}

/**
 * Helper function to keep code DRY, and ease overview.
 * @param numberID the ID of the HTML element containing the number
 * @param direction "+" or "-" for adding or subtracting 1 to/from number
 * @param dishKey the key to the JSON for the dish
 * @param outputID the price field for calculating the price based on number
 */
function changeNumberOfDish (numberID, direction, dishKey, outputID)
{
	let numberBox = document.getElementById(numberID);
	let value = numberBox.value;
	if (direction === '+')
	{
		value++;
	}
	else if (direction === '-')
	{
		if (value == 1)
		{
			let itemDiv = numberBox.closest('.itemDiv');
			itemDiv.parentNode.removeChild(itemDiv);
			return;
		}
		else
		{
			value--;
		}
	}
	numberBox.value = String(value);
	calculateItemPrice(numberID, dishKey, outputID);
}

/**
 * TODO fill out documentation
 * @param numberID
 * @param dishKey
 * @param outputID
 */
function calculateItemPrice (numberID, dishKey, outputID)
{
	let numberbox = document.getElementById(numberID);
	let value = numberbox.value;
	let dish = menuJSON[dishKey];
	let price = value * dish['price'];
	document.getElementById(outputID).value = price;
}

//DEPRECATED
function getMenu ()
{
	let promise = loadScript('scripts/menuItems.js');
	promise.then(() =>
	{
		console.log(menuItems);
		return menuItems;
	});
	promise.catch(error => {console.log(error.message);});
	//promise.then(() => {console.log(menuItems)})
}

//DEPRECATED
function getMenuJSONDeprecated ()
{
	let request = new XMLHttpRequest();
	request.open('GET', 'JSON_files/menuItems.json', false);
	request.send(null);
	let data = request.responseText;
	/*
	console.log(data);
	console.log(typeof data);
	console.log(typeof JSON.parse(data));
	console.log(JSON.parse(data));
	*/
	return JSON.parse(data);
}

// DEPRECATED
/**
 * Uses Promises to allow script execution to be started up again once the
 * requested script has loaded.
 * @param source the relative filepath for the script we want to add and wait
 *     for loading to finish before doing more.
 * @return {Promise<any>} A Promise that will
 */
function loadScript (source)
{
	return new Promise(function (resolve, reject)
	{
		let script = document.createElement('script');
		script.src = source;

		script.onload = () => resolve(script);
		script.onerror = () => reject(
			new Error(`Script load error for ` + source));

		document.head.append(script);
	});
}


addCartItemsToHTML();


