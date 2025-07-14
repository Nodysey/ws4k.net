const selector = document.querySelector('#accent-select');
const changeEvent = new Event("changedElsewhere");

let accent = localStorage.getItem('accentColor');
if (accent !== null) {
    for (let idx = 0; idx < 11; idx++) {
        document.body.classList.remove('accent-' + idx);
    }
    document.body.classList.add('accent-' + accent);
    b.childNodes[accent].click();
}

selector.addEventListener('changedElsewhere', (e) => {
    for (let idx = 0; idx < 11; idx++) {
        document.body.classList.remove('accent-' + idx);
    }
    document.body.classList.add('accent-' + e.target.value);
    localStorage.setItem('accentColor', e.target.value);
}, false)