const background = document.getElementById("parallax-background");

window.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        background.style.backgroundPosition = (`${scrollX / 2}px`) + " " + (`${scrollY / 2}px`);
        background.style.height = document.body.getBoundingClientRect().height + "px";
    });
});