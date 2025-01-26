document.getElementById("currentYear").innerText = new Date().getFullYear();

async function fetchGuideData() {
    const guideContainer = document.getElementById('featured');

    const apiUrl = 'https://phonehome.awnetwork.net/api/streams/channels';
    const featuredUrl = 'https://phonehome.awnetwork.net/api/streams/featured';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const response2 = await fetch(featuredUrl);
        const data2 = await response2.json();

        const featuredItems = Object.entries(data2)
            .map(([entry, key]) => ({
                entry,
                key,
            }))

        guideContainer.innerHTML = "";
        for (const channel of featuredItems) {
            const imageName = `${channel.key}.png`;
            const lnk = channel.status === "Online" ? channel.link : "#";

            const guideItem = `
                <a class="channel-ql" href="/watch?v=${channel.key}">
                    <div class="chql" style="background-image: url('/assets/channels/${channel.key}.png');">
                        <div class="chql-cover">
                            <h2 class="chql-label">${data[channel.key].display_name}</h2>
                        </div>
                    </div>
                </a>
            `;
            guideContainer.innerHTML += guideItem;
        };
    } catch (error) {
        console.error('Error fetching guide data:', error);
        guideContainer.innerHTML = '<p>Failed to load featured channels.</p>';
    }
}
fetchGuideData();
