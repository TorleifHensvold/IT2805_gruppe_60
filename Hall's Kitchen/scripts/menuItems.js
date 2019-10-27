/*
	The constant menuItems is an Object, and works as a JSON object
 */

const menuItems =
	{
		hamburger: {
			key: 'hamburger',
			name: 'Hamburger',
			type: 'dinner',
			image_small: 'images/menu/hamburger-small.jpg',
			image_large: 'images/menu/hamburger-large.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			price: '100',
			weight: '200g',
		},
		pizza: {
			key: 'pizza',
			name: 'Pizza',
			type: 'dinner',
			image_small: 'images/menu/pizza-small.jpg',
			image_large: 'images/menu/pizza-large.jpg',
			description: 'This is a description about Pizza',
			price: '100',
			weight: '200g',
		},
		steak: {
			key: 'steak',
			name: 'Steak',
			type: 'dinner',
			image_small: 'images/menu/steak-small.jpg',
			image_large: 'images/menu/steak-large.jpg',
			description: 'This is a description about Steak',
			price: '100',
			weight: '200g',
		},
		noodles: {
			key: 'noodles',
			name: 'Noodles',
			type: 'dinner',
			image_small: 'images/menu/noodles-small.jpg',
			image_large: 'images/menu/noodles-large.jpg',
			description: 'This is a description about Noodles',
			price: '100',
			weight: '200g',
		},
		meatBalls: {
			key: 'meatBalls',
			name: 'Meat Balls',
			type: 'dinner',
			image_small: 'images/menu/meatballs-small.jpg',
			image_large: 'images/menu/meatballs-large.jpg',
			description: 'This is a description about Meat Balls',
			price: '100',
			weight: '200g',
		},
		iceCream: {
			key: 'iceCream',
			name: 'Ice Cream',
			type: 'dessert',
			image_small: 'images/menu/ice_cream-small.jpg',
			image_large: 'images/menu/ice_cream-large.jpg',
			description: 'This is a description about Ice cream',
			price: '50',
			weight: '50g',
		},
		chocolateCake: {
			key: 'chocolateCake',
			name: 'Chocolate Cake',
			type: 'dessert',
			image_small: 'images/menu/chocolate_cake-small.jpg',
			image_large: 'images/menu/chocolate_cake-large.jpg',
			description: 'This is a description about Chocolate cake',
			price: '50',
			weight: '50g',
		},
		milkshake: {
			key: 'milkshake',
			name: 'Milkshake',
			type: 'dessert',
			image_small: 'images/menu/milkshake-small.jpg',
			image_large: 'images/menu/milkshake-large.jpg',
			description: 'This is a description about Milkshake',
			price: '50',
			weight: '50g',
		},
		springRolls: {
			key: 'springRolls',
			name: 'Spring Rolls',
			type: 'appetizer',
			image_small: 'images/menu/spring_rolls-small.jpg',
			image_large: 'images/menu/spring_rolls-large.jpg',
			description: 'This is a description about Spring Rolls',
			price: '50',
			weight: '50g',
		},
		frenchFries: {
			key: 'frenchFries',
			name: 'French Fries',
			type: 'appetizer',
			image_small: 'images/menu/french_fires-small.jpg',
			image_large: 'images/menu/french_fires-large.jpg',
			description: 'This is a description about French Fries',
			price: '50',
			weight: '50g',
		},
		chickenSoup: {
			key: 'chickenSoup',
			name: 'Chicken Soup',
			type: 'appetizer',
			image_small: 'images/menu/chicken_soup-small.jpg',
			image_large: 'images/menu/chicken_soup-large.jpg',
			description: 'This is a description about Chicken Soup',
			price: '50',
			weight: '50g',
		},
	};


function getMenuItems ()
{
	return menuItems
}