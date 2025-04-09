document.getElementById("addbtn").addEventListener("click", start)

var width = 240;    // We will scale the photo width to this
var height = 0;     // This will be computed based on the input stream

var streaming = false;

let video = document.getElementById("add-shape-preview");
let canvas = document.getElementById("add-shape-snapshot");
let photo = document.getElementById("add-shape-photo");
let startButton = document.getElementById("add-shape-take-picture");
var stream;

async function start() {
    document.getElementById("add-shape").style.display = "block";
    startButton.removeEventListener("click",start);
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        video.srcObject = stream;
        video.play();
    } catch (err) {
        console.error(`An error occurred: ${err}`);
    }
    video.addEventListener("canplay",(ev) => {
        if (!streaming) {
            height = (video.videoHeight / video.videoWidth) * width;
    
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
        }
    },false);
    startButton.addEventListener("click",(ev) => {
        takePicture();
        ev.preventDefault();
    }, false);
    clearPhoto();
};

function clearPhoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
};  

function takePicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    } else {
        clearPhoto();
    }
};

async function addShape() {
    var src = photo.getAttribute('src');
    addNewShape(src);
    document.getElementById("add-shape").style.display = "none";
    stream.getTracks().forEach(track => {
        track.active = false;
        track.stop();
    });
}
startButton.addEventListener("click",start);
document.getElementById("add-shape-apply").addEventListener("click",addShape);