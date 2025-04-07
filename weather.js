const twcApiKey = "e1f10a1e78da46f5b10a1e78da96f525";
const zip = "08053:US";

async function getWeather() {
    const data = await fetch(`https://api.weather.com/v3/wx/observations/current?postalKey=${zip}&language=en-US&format=json&units=e&apiKey=${twcApiKey}`)
        .then(response => response.json())
        .then(data => {return data});
    document.getElementById("wx-temp").innerText = `${data.temperature}°`;
    document.getElementById("wx-cond").innerText = data.wxPhraseLong;
}

getWeather();