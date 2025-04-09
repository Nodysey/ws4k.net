function getFormattedTime(time) {
    const date = new Date(Date.parse(time));
    const now = new Date();
    if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        // posted today
        return `Today at ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`
    } else if (date.getDate() === now.getDate() - 1 && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        // posted yesterday
        return `Yesterday at ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`
    } else {
        return `${date.getFullYear()}-${String(date.getMonth()).padStart(2,'0')}-${String(date.getDay()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
    }
}
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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let guid = urlParams.get('id').toLowerCase();
        const items = rss.item.filter(item => item.guid.toLowerCase() === guid);

        console.log(rss);
        for (let idx = 0; idx < items.length; idx++) {
            const itm = items[idx];
            buffer += `
            <div class="section">
                <h2>${itm.title}</h2>
                <hr>
                <div class="post-title flex-row align-baseline">
                    <span>${itm.author}</span>
                    <span class="dot"> • </span>
                    <span>${getFormattedTime(itm.pubDate)}</span>
                </div>
            </div>
            <div class="section single-post">
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
