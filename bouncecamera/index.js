let cornerHits = 0;
let insertIdx = -1;
let images = [];

function getStoredShapes() {
    //images = JSON.parse(localStorage.getItem("images")) == null ? [] : JSON.parse(localStorage.getItem("images"));
};

function buildShapes() {
    for (let idx = 0; idx < images.length; idx++) {
        const itm = images[idx];
        const icon = document.createElement('div');
        icon.setAttribute('class','shape');
        insertIdx++;
        icon.setAttribute("data-id", insertIdx);
        const parentRect = document.getElementById("shapes").getBoundingClientRect();
        const tempRect = icon.getBoundingClientRect();
        document.getElementById("shapes").appendChild(icon);
        icon.style.left = (Math.random() * (parentRect.width - tempRect.width)) + 'px';
        icon.style.top = (Math.random() * (parentRect.height - tempRect.height)) + 'px';
        icon.style.backgroundImage = `url(${itm})`
    };
    document.querySelectorAll('.shape').forEach(icon => {advance(icon)});
};

function addNewShape(img) {
    const idx = images.push(img) - 1;
    const itm = images[idx];
    const icon = document.createElement('div');
    icon.setAttribute('class','shape');
    const parentRect = document.getElementById("shapes").getBoundingClientRect();
    const tempRect = icon.getBoundingClientRect();
    document.getElementById("shapes").appendChild(icon);
    insertIdx++;
    icon.setAttribute("data-id", insertIdx);
    icon.style.left = (Math.random() * (parentRect.width - tempRect.width)) + 'px';
    icon.style.top = (Math.random() * (parentRect.height - tempRect.height)) + 'px';
    icon.style.backgroundImage = `url(${itm})`
    //localStorage.setItem("images", JSON.stringify(images));
    advance(icon);
};

function advance(icon) {
    var moveIntervalX = 1.2;
    var moveIntervalY = 1.2;
    var dampFactor = 0.98;
    var minVelo = 1.2;
    var grabbing = false;

    var directionX = Math.random() >= 0.5 ? '-' : '+';
    var directionY = Math.random() >= 0.5 ? '-' : '+';

    function updatePosition() {
        if (grabbing == false) {
            if (Math.abs(moveIntervalX) > minVelo) {
                moveIntervalX *= dampFactor;
            }
            if (Math.abs(moveIntervalY) > minVelo) {       
                moveIntervalY *= dampFactor;
            }
            if (Math.abs(moveIntervalX) < minVelo) {
                moveIntervalX = moveIntervalX < 0 ? -minVelo : minVelo;
            }
            if (Math.abs(moveIntervalY) < minVelo) {
                moveIntervalY = moveIntervalY < 0 ? -minVelo : minVelo;
            }
        };

        const rect = icon.getBoundingClientRect();
        const bodyRect = document.getElementById("shapes").getBoundingClientRect();

        if (rect.left + rect.width > bodyRect.width) {
            directionX = '-';
        }
        if (rect.left <= bodyRect.left) {
            directionX = '+';
        }
        if (rect.top + rect.height > bodyRect.height) {
            directionY = '-';
        }
        if (rect.top <= bodyRect.top) {
            directionY = '+';
        }
        if (directionX == '+') {
            icon.style.left = ((rect.left + moveIntervalX) + 'px');
        } else if (directionX == '-') {
            icon.style.left = ((rect.left - moveIntervalX) + 'px');
        }
        if (directionY == '-') {
            icon.style.top = ((rect.top - moveIntervalY) + 'px');
        } else if (directionY == '+') {
            icon.style.top = ((rect.top + moveIntervalY) + 'px');
        }
        window.requestAnimationFrame(updatePosition);
    };

    window.requestAnimationFrame(updatePosition);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'L' || event.key === 'l') {
            moveIntervalX += Math.random() * 20;
            moveIntervalY += Math.random() * 20;
            directionX = Math.random() >= 2 / 3 ? Math.random() >= 2 / 3 ? '-' : '+' : directionX;
            directionY = Math.random() >= 2 / 3 ? Math.random() >= 2 / 3 ? '-' : '+' : directionYr;
        }
    });

    var initMouseX;
    var initMouseY;

    icon.addEventListener('mousedown', (e) => {
        grabbing = true;
        let offsetX = e.clientX - icon.getBoundingClientRect().left;
        let offsetY = e.clientY - icon.getBoundingClientRect().top;

        initMouseX = e.clientX;
        initMouseY = e.clientY;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        const onMouseMove = (e) => {
            icon.style.left = `${e.clientX - offsetX}px`;
            icon.style.top = `${e.clientY - offsetY}px`;

            moveIntervalX = e.clientX - lastMouseX;
            moveIntervalY = e.clientY - lastMouseY;

            if (e.clientX - lastMouseX <= 0) {
                moveIntervalX = moveIntervalX * -1;
                directionX = '-';
            } else {
                directionX = '+';
            }
            if (e.clientY - lastMouseY <= 0) {
                moveIntervalY = moveIntervalY * -1;
                directionY = '-';
            } else {
                directionY = '+';
            }

            if (lastMouseX == e.clientX && lastMouseY == e.clientY) {
                moveIntervalX = 0;
                moveIntervalY = 0;
            }

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        };

        const onMouseUp = (e) => {
            grabbing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (Math.abs(e.clientX - initMouseX) <= 10 && Math.abs(e.clientY - initMouseY) <= 10) {
                // treat as a click and not as a drag
                showDownloadPrompt(Number(icon.getAttribute("data-id")));
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    icon.addEventListener('touchstart', (e) => {
        grabbing = true;
        let offsetX = e.touches[0].clientX - icon.getBoundingClientRect().left;
        let offsetY = e.touches[0].clientY - icon.getBoundingClientRect().top;

        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;

        const onMouseMove = (e) => {
            icon.style.left = `${e.touches[0].clientX - offsetX}px`;
            icon.style.top = `${e.touches[0].clientY - offsetY}px`;

            moveIntervalX = e.touches[0].clientX - lastMouseX;
            moveIntervalY = e.touches[0].clientY - lastMouseY;

            if (e.touches[0].clientX - lastMouseX <= 0) {
                moveIntervalX = moveIntervalX * -1;
                directionX = '-';
            } else {
                directionX = '+';
            }
            if (e.touches[0].clientY - lastMouseY <= 0) {
                moveIntervalY = moveIntervalY * -1;
                directionY = '-';
            } else {
                directionY = '+';
            }

            if (lastMouseX == e.touches[0].clientX && lastMouseY == e.touches[0].clientY) {
                moveIntervalX = 0;
                moveIntervalY = 0;
            }

            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        };

        const onMouseUp = () => {
            grabbing = false;
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
        };
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', onMouseUp);
    });
};

async function start() {
    getStoredShapes();
    buildShapes();
    advance();
};

start();

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
    }
};

function disableDownloading() {
    document.getElementById("download-shape-download").setAttribute("disabled", "");
    document.getElementById("no-download-alert").style.display = "block";
    document.getElementById("dl-disable-btn").style.display = "none";
    // also hide camera selector to prevent stupid people from breaking things
    document.querySelector(".add-shape-camera-select").style.display = "none";
}

document.getElementById("dl-disable-btn").addEventListener("click", disableDownloading);