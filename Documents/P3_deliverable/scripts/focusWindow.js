function focusWindow(content, width, height) {
    let node = document.createElement("div");
    let background = document.createElement('div');
    let window = document.createElement("div");

    background.style.position = "fixed";
    background.style.width = "100%";
    background.style.height = "100%";
    background.style.left = "0px";
    background.style.top = "0px";
    background.style.backgroundColor = "rgba(100, 100, 100, 0.5)";    
    background.addEventListener("click", function() {
        unFocusWindow(node);
    });
    
    window.style.position = "fixed";
    window.style.left = "50%";
    window.style.top = "50%";
    window.style.marginTop = (-height/2).toString() + "px";
    window.style.marginLeft = (-width/2).toString() + "px";
    window.style.width = width.toString() + "px";
    window.style.height = height.toString() + "px";
    window.className = "window";
    
    node.appendChild(background);
    window.appendChild(content)
    node.appendChild(window);
    document.body.appendChild(node);
}

function unFocusWindow(window) {
    document.body.removeChild(window);
}