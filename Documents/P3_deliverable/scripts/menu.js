const menuItems = {
    hamburger: {
        name: "Hamburger",
        image_small: "images/menu/hamburger.jpg",
        image_large: "",
        description: "This is a description about Hamburger",
        price: "100",
        weight: "200g"
    },
    pizza: {
        name: "Pizza",
        image_small: "images/menu/pizza.jpg",
        image_large: "",
        description: "This is a description about Pizza",
        price: "100",
        weight: "200g"
    }
};

function generateMenuItems() {
    let dinners = document.getElementById("dinners");
    for (item in menuItems) {
        let itemDiv = document.createElement("div");
        let h2 = document.createElement("h2");
        let button = document.createElement("button");
        
        let itemObject = menuItems[item];
        h2.innerText = itemObject.name;
        button.innerText = "More";
        itemDiv.style.backgroundImage = "url('" + itemObject.image_small +  "')";
        itemDiv.className = "menuItem";
        
        itemDiv.appendChild(h2);
        itemDiv.appendChild(button);
        dinners.appendChild(itemDiv)
        
        let windowDiv = document.createElement("div");
        let text = document.createElement("p");
        text.innerText = itemObject.description;
        windowDiv.appendChild(text);
        button.addEventListener("click", function() {
            focusWindow(windowDiv, 450, 450);
        });
    }
}

function addItemToCart(item) {

}

generateMenuItems();