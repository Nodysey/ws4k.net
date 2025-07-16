/*
    uDim = {x, y, w, h}
    x = position x
    y = position y
    w = width
    h = height
*/

function createWindow( title, href, uDim, isVideo ) {
    // setup
    const template = document.getElementById('window-template');
    const window = template.content.cloneNode(true).childNodes[0];
    console.log(window);

    // apply configuration
    window.querySelector('.title').innerHTML = title;
    window.style.left = uDim.x + 'px';
    window.style.top = uDim.y + 'px';
    window.style.width = uDim.w + 'px';
    window.style.height = uDim.h + 'px';

    // content rendering
    if (isVideo === true) {
        window.querySelector('.content-frame').style.display = 'none';
        createVideo(href, window.querySelector('.video-frame'));
        window.querySelector('.newtab').addEventListener("click", () => {
            const a = document.createElement('a');
            a.target = '_blank';
            a.href = './player?v=' + href;
            a.click();
            a.remove();
        });
    } else {
        window.querySelector('.content-frame').src = href;
        window.querySelector('.newtab').addEventListener("click", () => {
            const a = document.createElement('a');
            a.target = '_blank';
            a.href = href;
            a.click();
            a.remove();
        });
    }

    // window dragging
    let offsetX, offsetY;
    const windowDragNode = window.querySelector('.titlebar');

    function windowDragStart(e) {
        window.classList.add("dragging");
        offsetX = e.clientX - windowDragNode.getBoundingClientRect().left;
        offsetY = e.clientY - windowDragNode.getBoundingClientRect().top;

        document.addEventListener('mousemove', windowDrag);
        document.addEventListener('mouseup', windowDragEnd);
    }
    function windowDrag(e) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
    }
    function windowDragEnd() {
        window.classList.remove("dragging");
        document.removeEventListener('mousemove', windowDrag);
        document.removeEventListener('mouseup', windowDragEnd);
    }

    windowDragNode.addEventListener('mousedown', windowDragStart);

    // window resizing
    let resizeOffsetX, resizeOffsetY;
    const windowResizeNode = window.querySelector('.resize-handle');

    function windowResizeStart(e) {
        window.classList.add("dragging");
        resizeOffsetX = e.clientX - windowResizeNode.getBoundingClientRect().left
        resizeOffsetY = e.clientY - windowResizeNode.getBoundingClientRect().top

        document.addEventListener('mousemove', windowResize);
        document.addEventListener('mouseup', windowResizeEnd);
    }
    function windowResize(e) {
        window.style.width = `${e.clientX - window.getBoundingClientRect().left}px`;
        window.style.height = `${e.clientY - window.getBoundingClientRect().top}px`;
    }
    function windowResizeEnd() {
        window.classList.remove("dragging");
        document.removeEventListener('mousemove', windowResize);
        document.removeEventListener('mouseup', windowResizeEnd);
    }

    windowResizeNode.addEventListener('mousedown', windowResizeStart);

    // close button
    window.querySelector('.close').addEventListener("click", () => {
        window.remove();
    });

    // final step
    document.body.appendChild(window);
}