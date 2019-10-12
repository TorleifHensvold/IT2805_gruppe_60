// This is a list of objects that has information and represents the menu items.
const menuItems = {
    hamburger: {
        key: "hamburger",
        name: "Hamburger",
        type: "dinner",
        image_small: "images/menu/hamburger.jpg",
        image_large: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "100",
        weight: "200g"
    },
    pizza: {
        key: "pizza",
        name: "Pizza",
        type: "dinner",
        image_small: "images/menu/pizza.jpg",
        image_large: "",
        description: "This is a description about Pizza",
        price: "100",
        weight: "200g"
    },
    steak: {
        key: "steak",
        name: "Steak",
        type: "dinner",
        image_small: "images/menu/steak.jpg",
        image_large: "",
        description: "This is a description about Steak",
        price: "100",
        weight: "200g"
    },
    noodles: {
        key: "noodles",
        name: "Noodles",
        type: "dinner",
        image_small: "images/menu/noodles.jpg",
        image_large: "",
        description: "This is a description about Noodles",
        price: "100",
        weight: "200g"
    }, 
    meatBalls: {
        key: "meatBalls",
        name: "Meat Balls",
        type: "dinner",
        image_small: "images/menu/meatballs.jpg",
        image_large: "",
        description: "This is a description about Meat Balls",
        price: "100",
        weight: "200g"
    },
    iceCream: {
        key: "iceCream",
        name: "Ice Cream",
        type: "dessert",
        image_small: "images/menu/ice_cream.jpg",
        image_large: "",
        description: "This is a description about Ice cream",
        price: "50",
        weight: "50g"
    }
};

function generateMenuItems() {
    for (item in menuItems) {
        // Create all elements variables
        let itemObject = menuItems[item];
        let itemDiv = document.createElement("div");
        let h2 = document.createElement("h2");
        let button = document.createElement("button");
        
        // Filling the elements with the appropriate content
        h2.innerText = itemObject.name;
        itemDiv.style.backgroundImage = "url('" + itemObject.image_small +  "')";
        itemDiv.className = "menuItem";
        button.innerText = "More";
        button.addEventListener("click", function() {
            focusWindow(createWindowDiv(itemObject));
        });
        
        // Appending The content in the itemDiv in the right order
        itemDiv.appendChild(h2);
        itemDiv.appendChild(button);
        document.getElementById(itemObject.type + "s").appendChild(itemDiv);
    }
}

function createWindowDiv(menuItem) {
    // Create all element variables
    let windowDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let description = document.createElement("p");
    let img = document.createElement("img");
    let addButton = document.createElement("button");
    let detailText = document.createElement("p");
    
    // Filling all the elements with appropriate content
    h2.innerText = menuItem.name;
    description.innerText = menuItem.description;
    img.alt = menuItem.name;
    img.src = menuItem.image_small;
    addButton.innerText = "Add to Cart";
    addButton.addEventListener("click", function() {
        addItemToCart(menuItem);
        unFocusWindow(windowDiv);
    });
    detailText.innerHTML = "Type: " + menuItem.type + "<br> Price:" + menuItem.price + "<br> Weight: " + menuItem.weight;
    detailText.id = "detailText";

    // Appending all the elements in the right order
    windowDiv.appendChild(h2);
    windowDiv.appendChild(img);
    windowDiv.appendChild(description);
    windowDiv.appendChild(addButton);
    windowDiv.appendChild(detailText);
    return windowDiv;
}

function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) cart = {};
    const key = item.key;
    if (key in cart) {
        cart[key] += 1;
    } else {
        cart[key] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

generateMenuItems();