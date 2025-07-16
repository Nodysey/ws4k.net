document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            document.getElementById('alerts-form-submit').click();
        }
    } else if (e.key === "Enter") {
        switch (tab) {
            case 0: {
                if (document.activeElement === document.querySelector("#zip2fips-zip")) {
                    document.querySelector('#zip2fips-form-submit').click();
                }
                break;
            }
            case 1: {
                if (document.activeElement === document.querySelector("#alerts-fips")) {
                    document.querySelector('#alerts-form-submit').click();
                }
                break;
            }
            case 2: {
                document.querySelector('#allalerts-form-submit').click();
                break;
            }
        }
    }
});

let params = new URLSearchParams(document.location.search);
var fipsUrl = params.get('fips');
document.getElementById('alerts-fips').value = fipsUrl
document.getElementById('alerts-form-submit').click()
document.getElementById('alerts-form-submit').onclick = function(){
    var textBox = document.getElementById('alerts-fips')
    var resultBox = document.getElementById('alerts-results')
    fetch(`https://easip-client.ccp.xcal.tv/eas/api/alert/active/fipscode/${textBox.value}?format=json`)
        .then((response) => response.json())
        .then((data) => {
            resultBox.innerHTML = `
            <tr>
                <th>Event</th>
                <th>Header</th>
                <th>Description</th>
                <th>Instructions</th>
                <th>Urgency</th>
                <th>Severity</th>
                <th>Certainty</th>
                <th>Issued</th>
                <th>Effective</th>
                <th>Expires</th>
                <th>Video</th>
            </tr>
            `
            for (const item of data.alerts) {
                resultBox.innerHTML += `
            <tr>
                <td>${item.info[0].event}</td>
                <td>${item.identifier + item.info[0].senderName}</td>
                <td>${item.info[0].description}</td>
                <td>${item.info[0].instruction}</td>
                <td>${item.info[0].urgency}</td>
                <td>${item.info[0].severity}</td>
                <td>${item.info[0].certainty}</td>
                <td>${new Date(item.sent).getFullYear()} / ${String(new Date(item.sent).getMonth() + 1).padStart(2,'0')} / ${String(new Date(item.sent).getDate()).padStart(2,'0')} ${String(new Date(item.sent).getHours()).padStart(2,'0')}:${String(new Date(item.sent).getMinutes() + 1).padStart(2,'0')}:${String(new Date(item.info[0].effective).getSeconds()).padStart(2,'0')}</td>
                <td>${new Date(item.info[0].effective).getFullYear()} / ${String(new Date(item.info[0].effective).getMonth() + 1).padStart(2,'0')} / ${String(new Date(item.info[0].effective).getDate()).padStart(2,'0')} ${String(new Date(item.info[0].effective).getHours()).padStart(2,'0')}:${String(new Date(item.info[0].effective).getMinutes() + 1).padStart(2,'0')}:${String(new Date(item.info[0].effective).getSeconds()).padStart(2,'0')}</td>
                <td>${new Date(item.info[0].expires).getFullYear()} / ${String(new Date(item.info[0].expires).getMonth() + 1).padStart(2,'0')} / ${String(new Date(item.info[0].expires).getDate()).padStart(2,'0')} ${String(new Date(item.info[0].expires).getHours()).padStart(2,'0')}:${String(new Date(item.info[0].expires).getMinutes() + 1).padStart(2,'0')}:${String(new Date(item.info[0].expires).getSeconds()).padStart(2,'0')}</tzd>
                <td><button onclick="createWindow( '${item.info[0].event}', '${item.info[0].resource[0].uri}', {x: 120, y: 120, w: 854, h: 480}, true )"><span>Play Video</span></button></td>
            </tr>
            `;
            }
        })
        .catch(resultBox.innerHTML = '<tr><td>Waiting for alerts...</td></tr>');
}