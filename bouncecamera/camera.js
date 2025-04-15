document.getElementById("addbtn").addEventListener("click", start)

var width = 1920;    // We will scale the photo width to this
var height = 0;     // This will be computed based on the input stream

var streaming = false;

let video = document.getElementById("add-shape-preview");
let canvas = document.getElementById("add-shape-snapshot");
let photo = document.getElementById("add-shape-photo");
let startButton = document.getElementById("add-shape-take-picture");
var stream;
var feedActive = false;
var pictureEvent;

var currentImageId = -1;

async function start() {
    openFullscreen();
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
    document.querySelector("#add-shape-content").style.height = "400px";
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
                const shutterSound = new Audio("sfx/shutter.mp3");
                shutterSound.play();
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                const data = canvas.toDataURL("image/png");
                photo.setAttribute("src", data);
                document.querySelector("#add-shape-content").style.height = "488px";
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
    const audio = new Audio("sfx/countdown.mp3");
    audio.play();
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

async function showDownloadPrompt(imgId) {
    document.getElementById("download-shape-download").style.display = "flex";
    document.getElementById("download-shape-content").style.animationName = "height-in";
    var imgElement = document.querySelector(`.shape[data-id="${imgId}"]`);
    const dlPrompt = document.querySelector("#download-shape");
    document.querySelector("#download-shape-preview").style.backgroundImage = imgElement.style.backgroundImage;
    dlPrompt.style.display = "block";
    document.querySelector("#download-shape .input").style.display = "flex";
    document.querySelector("#download-shape .output").style.display = "none";
    currentImageId = imgId;
}

async function download() {
    const imgId = currentImageId;
    var imageFile;
    const formData = new FormData();
    const imgPreview = document.querySelector("#download-shape-preview");

    const backgroundImage = imgPreview.style.backgroundImage;
    const dataUrl = backgroundImage.slice(5, -2); // Remove 'url("' and '")' from the string
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // upload to LitterBox
    imageFile = new File([blob], "image.png", { type: "image/png" });
    formData.append("time", "1h");
    formData.append("reqtype", "fileupload");
    formData.append("fileToUpload", imageFile, `uploaded-${Math.floor(Math.random() * 1000000)}.png`);
    try {
        const response = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', {
            method: 'POST',
            headers: {
                "Host": "litterbox.catbox.moe",
                "Origin": "https://litterbox.catbox.moe",
                "Referer": "https://litterbox.catbox.moe/",
                "Cookie": "PHPSESSID=o94d14afat9jvs2hdl4o6am860"
            },
            body: formData
        });
        if (response.ok) {
            document.getElementById("download-shape-download").style.display = "none";
            document.querySelector("#download-shape .input").style.display = "none";
            document.querySelector("#download-shape .output").style.display = "flex";
            const result = await response.text();
            QRCode.toCanvas(document.getElementById('download-shape-qrcode'), result, function (error) {
                if (error) console.error(error);
            })
            document.getElementById("downloaded-shape-link").innerText = result.slice(8);
            console.log('File uploaded successfully:', result);
        } else {
            console.error('File upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

async function closeDownloadWindow() {
    document.getElementById("download-shape-content").style.animationName = "height-out";
    setTimeout(() => {document.getElementById("download-shape").style.display = "none"}, 300);
}


startButton.addEventListener("click",start);
document.getElementById("add-shape-apply").addEventListener("click",addShape);
document.getElementById("add-shape-retake").addEventListener("click",start);

document.getElementById("download-shape-close").addEventListener("click",closeDownloadWindow);
document.getElementById("download-shape-download").addEventListener("click",download);