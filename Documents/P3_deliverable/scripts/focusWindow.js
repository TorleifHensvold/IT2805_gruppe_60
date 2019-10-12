let focusNode = document.createElement("div");

function focusWindow(content) {
    focusNode = document.createElement("div");
    let background = document.createElement('div');
    let window = document.createElement("div");

    background.className = "underlay";
    background.addEventListener("click", function() {
        unFocusWindow();
    });
    
    window.className = "window";
    
    focusNode.appendChild(background);
    window.appendChild(content)
    focusNode.appendChild(window);
    document.body.appendChild(focusNode);
}

function unFocusWindow() {
    focusNode.parentNode.removeChild(focusNode);
    focusNode.innerHTML = "";
}