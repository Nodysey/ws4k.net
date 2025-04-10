document.getElementById("addbtn").addEventListener("click", start)

var width = 240;    // We will scale the photo width to this
var height = 0;     // This will be computed based on the input stream

var streaming = false;

let video = document.getElementById("add-shape-preview");
let canvas = document.getElementById("add-shape-snapshot");
let photo = document.getElementById("add-shape-photo");
let startButton = document.getElementById("add-shape-take-picture");
var stream;
var feedActive = false;
var pictureEvent;

async function start() {
    document.getElementById("add-shape").style.display = "block";
    startButton.removeEventListener("click",start);
    document.querySelector("#add-shape .input").style.display = "flex";
    document.querySelector("#add-shape .output").style.display = "none";

    document.querySelector("#add-shape-take-picture").style.display = "flex";
    document.querySelector("#add-shape-apply").style.display = "none";
    document.querySelector("#add-shape-retake").style.display = "none";
    if (!feedActive) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            video.srcObject = stream;
            video.play();
            feedActive = true;
            video.addEventListener("canplay",(ev) => {
                if (!streaming) {
                    height = (video.videoHeight / video.videoWidth) * width;
            
                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    startButton.addEventListener("click",(ev) => {
                        takePicture();
                        ev.preventDefault();
                    }, false);
                    streaming = true;
                }
            },false);
        } catch (err) {
            console.error(`An error occurred: ${err}`);
        }
    }
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
    const countDown = document.querySelector("#add-shape .input .countdown span");
    const countDownWrap = document.querySelector("#add-shape .input .countdown");
    countDownWrap.style.display = "flex";
    let countdownValue = 5;
    countDown.textContent = countdownValue;

    const countdownInterval = setInterval(() => {
        countdownValue--;
        countDown.textContent = countdownValue;

        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            const context = canvas.getContext("2d");
            if (width && height) {
                const audio = new Audio("sfx/shutter.mp3");
                audio.play();
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                const data = canvas.toDataURL("image/png");
                photo.setAttribute("src", data);
                document.querySelector("#add-shape .input").style.display = "none";
                document.querySelector("#add-shape .output").style.display = "flex";
                countDownWrap.style.display = "none";

                document.querySelector("#add-shape-take-picture").style.display = "none";
                document.querySelector("#add-shape-apply").style.display = "flex";
                document.querySelector("#add-shape-retake").style.display = "flex";
            } else {
                clearPhoto();
            };
        } else {
            const audio = new Audio("sfx/countdown.mp3");
            audio.play();
        }
    }, 1000);
};

async function addShape() {
    var src = photo.getAttribute('src');
    addNewShape(src);
    document.getElementById("add-shape").style.display = "none";
    /*stream.getTracks().forEach(track => {
        track.active = false;
        track.stop();
    });*/
}
startButton.addEventListener("click",start);
document.getElementById("add-shape-apply").addEventListener("click",addShape);
document.getElementById("add-shape-retake").addEventListener("click",start);