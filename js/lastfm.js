/* Last.FM script by undrscre (tysm!)*/
async function updateLastFM() {
	const template = document.getElementById('lastfm-template');
	const clone = template.content.cloneNode(true);
	
	try {
		let request = await fetch('https://lastfm.nkko.workers.dev/?method=user.getRecentTracks&user=hainesnoids').then(data => data.json());
		let response = request.recenttracks;
		let data = response.track[0]; // fuckup with my implementation

		const legend = clone.querySelector('h2');
		const artImg = clone.querySelector('.listening-art');
		const title = clone.querySelector('.listening-title');
		const album = clone.querySelector('.album-name');
		const artist = clone.querySelector('.artist-name');
		const link = clone.querySelector('.lastfm-link');
		
		legend.textContent = data["@attr"] ? "currently listening to:" : "last listened to:";
		
		const albumArt = data.image?.[2]?.["#text"] || 
			"https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";
		
		artImg.src = albumArt;
		artImg.addEventListener("mouseover",(event) => {hoverEffect(event)});
		artImg.alt = `album art for ${data.album?.["#text"] || data.name}`
		title.textContent = data.name;
		title.setAttribute("data-title", data.name);
		album.textContent = data.album?.["#text"] || data.name;
		artist.textContent = data.artist?.["#text"];
		
		if (data.url) {
			link.innerHTML = `<a href="${data.url}">listen</a> on lastfm - <span class="splash">${response["@attr"].total}</span> total scrobbles`;
		}
		
		document.querySelector('.lastfm').appendChild(clone);
		
	} catch (err) {
		document.querySelector('.lastfm').innerHTML = `
			<div style="display: flex; justify-content:space-evenly; flex-direction:column;">
				<h1>error loading last.fm stats</h1>
				<p>please try again later!</p>
				<span class="subtext">error: ${err.message}</span>
			</div>
		`;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	updateLastFM();
});

// album art hover effect by me (hainesnoids)
function hoverEffect(event) {
	const itm = event.target;
	const angleMultiplier = 0.5;

	if (itm.localName == 'img') {
		const onMouseMove = (mouseEvent) => {
			const rect = itm.getBoundingClientRect();

			const curX = mouseEvent.clientX;
			const curY = mouseEvent.clientY;

			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const x = (curX - centerX) * angleMultiplier;
			const y = (curY - centerY) * angleMultiplier;

			// const scale = Math.max(1.2 - distance / 720, 1); // Scale down to a minimum of 0.5
			itm.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
			itm.parentNode.style.zIndex = "999";
			itm.parentNode.style.transform = 'scale(150%)'
		}
		const onMouseLeave = () => {
			itm.style.transform = ''; // Reset the transform
			itm.parentNode.style.zIndex = '998';
			setTimeout(() => {
				itm.parentNode.style.zIndex = 'unset';
			},500)
			itm.parentNode.style.transform = 'scale(100%)'
			itm.removeEventListener('mousemove', onMouseMove);
			itm.removeEventListener('mouseleave', onMouseLeave);
		};

		itm.addEventListener('mousemove', onMouseMove);
		itm.addEventListener('mouseleave', onMouseLeave);
	}
}