/**
 * This function will generate all the images and buttons for all of the menu-Items in the menuItems array.
 */
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

/**
 * Creates a div that has the content of a menu-item. This div will be placed inside the window when you select a menu Item.
 * @param {*} menuItem This is what menu-item that should be made content for in the window.
 */
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
    img.src = menuItem.image_large;
    addButton.innerText = "Add to Cart";
    addButton.addEventListener("click", function() {
        addItemToCart(menuItem);
        unFocusWindow();
        
        // Changing the response window for the approprite menuItem
        document.getElementById("menuItemText").innerText = menuItem.name;
        let responseDiv = document.getElementById("response");
        responseDiv.style.display = "block";
        focusWindow(responseDiv, false);
    });
    // This could've been done with a list, but it was just 3 things
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

/**
 * Increments the item in the cart in localStorage.
 * The cart in localStorage works just like a simple map that has item: amount, as key/value pair.
 * @param {*} item - The item that should be incrementet.
 */
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
document.getElementById("backBtn").addEventListener("click", function() {
    unFocusWindow(false);
});