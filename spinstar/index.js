let animationtime, rotatex, rotatey, rotatez;
var time = 0;
function spinything() {
    const logo = document.getElementById('logo');
    var startxx = Math.random()*2
    var startxy = Math.random()*2
    var startyx = Math.random()*2
    var startyy = Math.random()*2
    var startzx = Math.random()*2
    var startzy = Math.random()*2
    rotatex = (startxx*2, startxy*2)
    rotatey = (startyx*2, startyy*2)
    rotatez = (startzx*2, startzy*2)
    logo.style.transition = 'transform 2s linear'
    logo.style.transform = `rotatex(${rotatex}turn) rotatey(${rotatey}turn) rotatez(${rotatez}turn)`;
    var rotinterval;
    setTimeout(function() {
        rotinterval = setInterval(function(){
            time = time + .005;
            //animationtime = Math.floor(Math.random() * (12 - 3 + 1)) + 3
            rotatex = (startxx + time, startxy + time)*2
            rotatey = (startyx + time, startyy + time)*2
            rotatez = (startzx + time, startzy + time)*2
            logo.style.transition = 'transform 1s linear'
            logo.style.transform = `rotatex(${rotatex}turn) rotatey(${rotatey}turn) rotatez(${rotatez}turn)`;
        }, 100);
    },1000);
};
setTimeout(spinything,1000)