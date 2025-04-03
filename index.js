const extensions = {
    "no-direct-ip": "chrome-extension://hacaeeoapmdgmhifjcgbblcobgnmceff/icons/block.png",
    "Securly (4th ID)": "chrome-extension://lcgajdcbmhepemmlpemkkpgagieehmjp/fonts/Metropolis.css",
    "Securly (3rd ID)": "chrome-extension://ckecmkbnoanpgplccmnoikfmpcdladkc/fonts/Metropolis.css",
    "Securly (2nd ID)": "chrome-extension://joflmkccibkooplaeoinecjbmdebglab/fonts/Metropolis.css",
    "Securly (1st ID)": "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/fonts/Metropolis.css",
    "GoGuardian": "chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/youtube_injection.js",
    "LANSchool": "chrome-extension://baleiojnjpgeojohhhfbichcodgljmnj/blocked.html",
    "Linewize": "chrome-extension://ddfbkhpmcdbciejenfcolaaiebnjcbfc/background/assets/pages/default-blocked.html",
    "Blocksi": "chrome-extension://ghlpmldmjjhmdgmneoaibbegkjjbonbk/pages/blockPage.html",
    "FortiGuard": "chrome-extension://igbgpehnbmhgdgjbhkkpedommgmfbeao/youtube_injection.js",
    "Cisco Umbrella": "chrome-extension://jcdhmojfecjfmbdpchihbeilohgnbdci/blocked.html",
    "ContentKeeper": "chrome-extension://jdogphakondfdmcanpapfahkdomaicfa/img/ckauth19x.png",
    "CK-Authenticator G3": "chrome-extension://odoanpnonilogofggaohhkdkdgbhdljp/img/ckauth19x.png",
    "Securly Classroom (2nd ID)": "chrome-extension://hkobaiihndnbfhbkmjjfbdimfbdcppdh/notfound.html",
    "Securly Classroom (1st ID)": "chrome-extension://jfbecfmiegcjddenjhlbhlikcbfmnafd/notfound.html",
    "Hapara (2nd ID)": "chrome-extension://kbohafcopfpigkjdimdcdgenlhkmhbnc/blocked.html",
    "Hapara (1st ID)": "chrome-extension://aceopacgaepdcelohobicpffbbejnfac/blocked.html",
    "iboss": "chrome-extension://kmffehbidlalibfeklaefnckpidbodff/restricted.html",
    "Lightspeed Digital Insight Agent": "chrome-extension://njdniclgegijdcdliklgieicanpmcngj/js/wasm_exec.js",
    "Lightspeed Filter Agent": "chrome-extension://adkcpkpghahmbopkjchobieckeoaoeem/icon-128.png",
    "Lightspeed Classroom": "chrome-extension://kkbmdgjggcdajckdlbngdjonpchpaiea/assets/icon-classroom-128.png",
    "InterCLASS Filtering Service": "chrome-extension://jbddgjglgkkneonnineaohdhabjbgopi/pages/message-page.html",
    "InterSafe GatewayConnection Agent": "chrome-extension://ecjoghccnjlodjlmkgmnbnkdcbnjgden/resources/options.js",
    "LoiLo Web Filters": "chrome-extension://pabjlbjcgldndnpjnokjakbdofjgnfia/image/allow_icon/shield_green_128x128.png",
    "Gopher Buddy": "chrome-extension://cgbbbjmgdpnifijconhamggjehlamcif/images/gopher-buddy_128x128_color.png",
    "LanSchool Web Helper": "chrome-extension://honjcnefekfnompampcpmcdadibmjhlk/blocked.html",
    "IMTLazarus": "chrome-extension://cgigopjakkeclhggchgnhmpmhghcbnaf/models/model.json",
    "Impero Backdrop": "chrome-extension://jjpmjccpemllnmgiaojaocgnakpmfgjg/licenses.html",
    "Mobile Guardian": "chrome-extension://fgmafhdohjkdhfaacgbgclmfgkgokgmb/block.html",
    "NetSupport School Student": "chrome-extension://gcjpefhffmcgplgklffgbebganmhffje/_locales/lt/messages.json",
    "classroom.cloud Student": "chrome-extension://mpkdoimpgkhjcicmhmlmgboelebflpla/_locales/lt/messages.json",
    "Lockdown Browser": "chrome-extension://fogjeanjfbiombghnmkmmophfeccjdki/manifest.json",
    "Linewize Filter": "chrome-extension://ifinpabiejbjobcphhaomiifjibpkjlf/chat/assets/imgs/pendo.png",
    "Borderless Classroom Student": "chrome-extension://kdpgkligilplaanoablcpjahjjeghcl/pages/blockPage.html",
    "LockDown Browser AP Classroom Edition": "chrome-extension://djpknfecbncogekjnjppojlaipeobkmo/assets/images/icon_128.png",
    "Lugus School": "chrome-extension://eoobggamkobbcpiojefejfglbfcacgca/assets/images/icon_128.png",
};

var detected = [];

for (const itm in extensions) {
    if (Object.prototype.hasOwnProperty.call(itm, itm)) {
        const url = extensions[itm];
        fetch(url)
        .then(() => {
            console.log("Found" + itm);
            detected.push(itm);
        })
        .catch(() => {
            // do jack shit
        });
    };
}

if (detected.length <= 0) {
    console.log("No blockers detected. Have fun!");
}