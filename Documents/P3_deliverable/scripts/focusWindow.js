let focusNode = document.createElement("div");

function focusWindow(content, deleteOnClose=true) {
    focusNode = document.createElement("div");
    let background = document.createElement('div');
    let window = document.createElement("div");

    background.className = "underlay";
    background.addEventListener("click", function() {
        unFocusWindow(deleteOnClose);
    });
    
    window.className = "window";
    
    focusNode.appendChild(background);
    window.appendChild(content)
    focusNode.appendChild(window);
    document.body.appendChild(focusNode);
}

function unFocusWindow(deleteOnClose) {
    if (!deleteOnClose) {
        let content = document.getElementsByClassName("window")[0].childNodes[0];
        content.visible = "hidden";
        document.body.appendChild(content);
    }
    focusNode.innerHTML = "";
    focusNode.parentNode.removeChild(focusNode);
}