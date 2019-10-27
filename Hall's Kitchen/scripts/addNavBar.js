const pages = [
    {name: "Main Page", file: "index.html"},
    {name: "Menu", file: "menu.html"},
    {name: "Cart", file: "cart.html"},
    {name: "About us", file: "about_us.html"},
    {name: "Contact Us", file: "contact_us.html"},
];

const navBar = document.getElementById("navBar")

for (let page of pages) {
    let link = document.createElement("a");
    let button = document.createElement("button");

    link.href = page.file;
    button.innerText = page.name;

    link.appendChild(button);
    navBar.appendChild(link);
}
