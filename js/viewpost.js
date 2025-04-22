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
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
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
            <fieldset>
                <legend>${getFormattedTime(itm.pubDate)}</legend>
                <a class="title-link">
                    <h2 style="margin-bottom: 2px">${itm.title}</h2>
                </a>
                <span>${itm.author}</span>
            </fieldset>
            <fieldset style="padding: 8px">
                <p>
                    ${itm.description}
                </p>
            </fieldset>
            `
            console.log("parsed feed item" + idx)
        };
        document.getElementById("blog-content").innerHTML = buffer;
    })
    .catch(error => {
        console.error("my balls exploded with style ", error);
    });
