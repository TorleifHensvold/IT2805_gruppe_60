// This is a global variable that will be a root node for everything to do with the window.
let focusNode = document.createElement("div");

/**
 * This is a general function that creates a window with a gray underlay under.
 * You can add whatever content you want inside the window.
 * @param {*} content - The content to fill the window with. 
 * @param {*} deleteOnClose - This says if you want delete the content when you close the window (true), or make it go to the body displayed:none (false). Default is true.
 */
function focusWindow(content, deleteOnClose=true) {
    // Create all element variables
    focusNode = document.createElement("div");
    let background = document.createElement('div');
    let window = document.createElement("div");
    
    // Filling all the elements with appropriate content
    background.className = "underlay";
    background.addEventListener("click", function() {
        unFocusWindow(deleteOnClose);
    });
    window.className = "window";
    
    // Appending all the elements in the right order
    focusNode.appendChild(background);
    window.appendChild(content)
    focusNode.appendChild(window);
    document.body.appendChild(focusNode);
}

/**
 * This will remove the focused window, and handle the content acordingly. This function should primarily be used as a helper function to focusWindow.
 * @param {*} deleteOnClose - The same as deleteOnClose for focusWindow.
 */
function unFocusWindow(deleteOnClose) {
    if (deleteOnClose === false) {
        let content = document.getElementsByClassName("window")[0].childNodes[0];
        content.style.display = "none";
        document.body.appendChild(content);
    }
    focusNode.innerHTML = "";
    focusNode.parentNode.removeChild(focusNode);
}