//const cart = localStorage.getItem("cart")

//console.log(cart)
//console.log("logged cart")

//const menuJSON = getMenu();
const menuJSON = menuItems;
const priceIdArray = [];


function addCartItemsToHTML ()
{
	let storage = localStorage;
	if (storage.length === 0)
	{
		console.log('no cart found');
	}
	else if (storage['cart'] != null)
	{
		let cart = storage['cart'];
		let JSONcart = JSON.parse(cart);
		for (let thing in JSONcart)
		{
			createItemDiv(thing, JSONcart[thing]);
		}
	}
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
	let priceText = document.createTextNode('Price: ');
	priceDiv.appendChild(priceText);
	let priceField = document.createElement('input');
	priceField.disabled = true;
	let priceFieldID = 'price' + itemName;
	priceIdArray.push(priceFieldID);
	priceField.id = priceFieldID;
	priceField.value = 0;
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
	numberfield.addEventListener('change', () =>
	{
		setNumberOfDish(numberfield.id, numberfield.value, itemName,
			priceField.id);
	});
	let orderButton = document.getElementById("orderButton");
	orderButton.addEventListener('click', clearItems);

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
	addItemsToCart(dishKey, 1);
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
	removeItemsFromCart(dishKey, 1);
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
		setNumberOfDish(numberID, value, dishKey, outputID);
	}
	else if (direction === '-')
	{
		if (value == 1)
		{
			setNumberOfDish(numberID, 0, dishKey, outputID);
		}
		else
		{
			value--;
			setNumberOfDish(numberID, value, dishKey, outputID);
		}
	}

}

function setNumberOfDish (numberID, numberValue, dishKey, outputID)
{
	let numberBox = document.getElementById(numberID);
	if (numberValue <= 0)
	{
		setNumberOfItemsInCart(dishKey, 0);
		let itemDiv = numberBox.closest('.itemDiv');
		removeSingleItemDiv(itemDiv, dishKey);
	}
	else
	{

		numberBox.value = String(numberValue);
		setNumberOfItemsInCart(dishKey, numberValue);
		calculateItemPrice(numberID, dishKey, outputID);
	}

}

function removeSingleItemDiv (itemDiv, dishKey)
{
	let priceIndex = priceIdArray.indexOf('price' + dishKey);
	priceIdArray.splice(priceIndex, 1);
	itemDiv.parentNode.removeChild(itemDiv);
	calculateTotalPrice()
}

/**
 * Function to calculate the price for each dish based on how many of it there
 * is
 * @param numberID the ID of the numberbox we're to change
 * @param dishKey the key name used in menuItems.js for the item
 * @param outputID the "input" where we send the final price
 */
function calculateItemPrice (numberID, dishKey, outputID)
{
	let numberbox = document.getElementById(numberID);
	let value = numberbox.value;
	let dish = menuJSON[dishKey];
	let price = value * dish['price'];
	document.getElementById(outputID).value = price;
	calculateTotalPrice()
}

function getCartJSON ()
{
	let cartString = localStorage.getItem('cart');
	let cartJSON = JSON.parse(cartString);
	return cartJSON;
}

function addItemsToCart (itemKey, numberToAdd)
{
	let cart = getCartJSON();
	cart[itemKey] += numberToAdd;
	saveCartJSONtoLocalStorage(cart);
}

function removeItemsFromCart (itemKey, numberToRemove)
{
	let cart = getCartJSON();
	cart[itemKey] -= numberToRemove;
	if (cart[itemKey] < 1)
	{
		delete cart[itemKey];
	}
	saveCartJSONtoLocalStorage(cart);
}

function setNumberOfItemsInCart (itemKey, number)
{
	let cart = getCartJSON();
	if (number <= 0)
	{
		delete cart[itemKey];
	}
	else
	{
		cart[itemKey] = number;
	}
	saveCartJSONtoLocalStorage(cart);
}

function saveCartJSONtoLocalStorage (cartJSON)
{
	localStorage.setItem('cart', JSON.stringify(cartJSON));
}

function calculateTotalPrice()
{
	let price = 0;
	for (let key of priceIdArray)
	{
		price += Number(document.getElementById(key).value);
	}
	document.getElementById("totalPrice").value = price;
}

function clearItems()
{
	let cartJSON = getCartJSON();
	for (item in cartJSON)
	{
		setNumberOfDish("numberOf"+item, 0, item, null)
	}
	document.getElementById("finishedOrder").style.visibility = "visible";
}

addCartItemsToHTML();



