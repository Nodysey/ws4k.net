fetch("/feed.xml")
    .then(response => {
        if (!response.ok) {
            throw new Error("my balls exploded " + response.statusText);
        }
        return response.text();
    })
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");
        var x2js = new X2JS();
        var rsse = x2js.xml2json(xml).rss;
        var rss = rsse.channel;
        var buffer = "";
        const items = rss.item;
        console.log(rss);
        for (let idx = 0; idx < items.length; idx++) {
            const itm = items[idx];
            buffer += `
            <div class="section">
                <h2>${itm.title}</h2>
                <div class="post-title flex-row align-baseline">
                    <span>${itm.author}</span>
                    <span class="dot"> • </span>
                    <span>${itm.pubDate}</span>
                </div>
                <hr>
                <p>
                    ${itm.description}
                </p>
            </div>
            `
            console.log("parsed feed item" + idx)
        };
        document.getElementById("blog-content").innerHTML = buffer;
    })
    .catch(error => {
        console.error("my balls exploded with style ", error);
    });
