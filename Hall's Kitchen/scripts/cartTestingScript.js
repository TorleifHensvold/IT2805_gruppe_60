const cartDev = false;

function addItemToCart (item)
{
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (cart == null)
	{
		cart = {};
	}
	const key = item.key;
	if (key in cart)
	{
		cart[key] += 1;
	}
	else
	{
		cart[key] = 1;
	}
	localStorage.setItem('cart', JSON.stringify(cart));
}

if (cartDev)
{
localStorage.clear();


addItemToCart(menuItems.chickenSoup);
addItemToCart(menuItems.hamburger);
addItemToCart(menuItems.chickenSoup);
addItemToCart(menuItems.pizza);
}