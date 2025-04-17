async function viewCount() {
    const wrapper = document.querySelector(".flex-row.grow-row.visitorcount");
    // get and increment visitor count
    try {
        var count = await fetch("https://hnds.lewolfyt.cc/api/visitor-count")
        .then((res) => {return res.text()});
    } catch (err) {
        console.error(err);
        wrapper.innerHTML = "";
        const str = " error! "
        for (let idx = 0; idx < str.length; idx++) {
            const itm = str.charAt(idx);
            wrapper.innerHTML += `<span>${itm}</span>`;
        };    
    }
    // manipulate view count and turn it into an array
    count = count.padStart(8,"-");
    wrapper.innerHTML = "";
    for (let idx = 0; idx < count.length; idx++) {
        const itm = count.charAt(idx);
        if (itm === "-") {
            wrapper.innerHTML += `<span>-</span>`;
        } else {
            wrapper.innerHTML += `<span>${itm}</span>`;
        }
    };
};

viewCount();