const twcApiKey = "e1f10a1e78da46f5b10a1e78da96f525";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let loc = urlParams.get('query'); // location query
let units = urlParams.get('units') != null ? urlParams.get('units') : "e"; //
let lang = urlParams.get('lang') != null ? urlParams.get('lang') : "en-US";

async function getWeather() {
    const location = await fetch(`https://api.weather.com/v3/location/search?query=${loc}&locationType=city&language=${lang}&format=json&apiKey=${twcApiKey}`)
        .then(response => response.json())
        .then(data => {return data});
    
    const data = await fetch(`https://api.weather.com/v3/wx/observations/current?placeid=${location.location.placeId[0]}&language=${lang}&format=json&units=${units}&apiKey=${twcApiKey}`)
        .then(response => response.json())
        .then(data => {return data});
    document.getElementById("wx-name").innerText = `${location.location.city[0]}, ${location.location.adminDistrict[0]}, ${location.location.country[0]}`
    document.getElementById("wx-temp").innerText = `${data.temperature}°`;
    document.getElementById("wx-cond").innerText = data.wxPhraseLong;
}

getWeather();