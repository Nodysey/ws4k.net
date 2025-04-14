const LocaleClockType = (lang) => {
    if (!lang) {lang = navigator.language;}
    const hr = new Intl.DateTimeFormat(lang, { hour: "numeric" }).format();
    return Number.isInteger(Number(hr));
};