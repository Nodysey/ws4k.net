const songs = [
    {
        "name": "முன்னுதாரணம்",
        "artist": "Tanger (feat. Treb & tiyu)",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 17 that one song (with Treb & tiyu).flac"
    },
    {
        "name": "somewhere, someday,",
        "artist": "Tanger (feat. lorem ipsum)",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 24 somewhere, someday,.flac"
    },
    {
        "name": "do dodo do do do",
        "artist": "lvnafir",
        "album": "do dodo do do do",
        "src": "/songs/do dodo do do do.wav"
    },
    {
        "name": "IMPULSE!",
        "artist": "Tanger (feat. Inferno)",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 03 IMPULSE! (with Inferno).flac"
    },
    {
        "name": "ケーキトップ",
        "artist": "Mere Notilde",
        "album": "Rotti",
        "src": "/songs/song 47.wav"
    },
    {
        "name": "Fooled By Your Love",
        "artist": "Mere Notilde",
        "album": "Fooled By Your Love",
        "src": "/songs/01 Fooled By Your Love.mp3"
    },
    {
        "name": "I LIKE LOUD THINGS",
        "artist": "Tanger",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 05 I LIKE LOUD THINGS.flac"
    },
    {
        "name": "wan!",
        "artist": "Tanger (feat. Glitch Cat)",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 06 wan! (with Glitch Cat).flac"
    },
    {
        "name": "LCDLSD",
        "artist": "Artifyber",
        "album": "SPACED OUT",
        "src": "/songs/LCDLSD.mp3"
    },
    {
        "name": "sludgecrank",
        "artist": "Tanger",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 07 sludgecrank.flac"
    },
    {
        "name": "LOCKED UP FOR EVERY GOOD REASON!",
        "artist": "femtanyl",
        "album": "",
        "src": "/songs/locked up for every good reason!.mp3",
    },
    {
        "name": "head empty (interlude)",
        "artist": "Tanger",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 09 head empty (interlude).flac"
    },
    {
        "name": "GIRL HELL 1999",
        "artist": "femtanyl",
        "album": "CHASER",
        "src": "/songs/GIRL HELL 1999.mp3"
    },
    {
        "name": "BAD NUMBER!",
        "artist": "Tanger (feat. disphing)",
        "album": "Prefer not to say",
        "src": "/songs/Tanger - Prefer not to say - 13 BAD NUMBER! (with disphing).flac"
    },
]

const songTitle = document.querySelector('.music #song-title');
const songArtist = document.querySelector('.music #song-artist');
const musicPlayer = document.querySelector('.music #music-player');
const playbackPrev = document.querySelector('.music #playback-prev');
const playbackPause = document.querySelector('.music #playback-pause');
const playbackNext = document.querySelector('.music #playback-next');
const clock = document.querySelector('.music #clock');
const clockNeg = document.querySelector('.music #clock_neg');
const progress = document.querySelector('.music #pregress');

let idx = 0;

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${String(sec).padStart(2,'0')}`;
}

function loadSong(idx) {
    const song = songs[idx];
    
    songTitle.innerText = song.name;
    songArtist.innerText = song.artist;
    musicPlayer.src = song.src;

    songTitle.alt = "";
    if (song.alt) {
        songTitle.alt = song.alt;
    } else {
        songTitle.alt = "";
    }

    clock.innerText = "-:--";
    clockNeg.innerText = "--:--";
    
    progress.value = 0;
    progress.max = 100;
    
    play();
}

function updateProgress() {
    const currentTime = musicPlayer.currentTime;
    const duration = musicPlayer.duration || 0;
    
    clock.innerText = formatTime(currentTime);
    clockNeg.innerText = `-${formatTime(duration - currentTime)}`;
    
    if (duration) {
        progress.value = (currentTime / duration) * 100;
    }
}

musicPlayer.addEventListener('timeupdate', updateProgress);

musicPlayer.addEventListener('ended', () => {
    idx = (idx + 1) % songs.length;
    loadSong(idx);
});

musicPlayer.addEventListener('pause', () => {
    pause();
});

musicPlayer.addEventListener('play', () => {
    play();
});

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === "MediaTrackNext" || e.key === "MediaFastForward") {
        idx = (idx + 1) % songs.length;
        loadSong(idx);
    } else if (e.key === "MediaTrackPrevious" || e.key === "MediaRewind") {
        idx = (idx - 1 + songs.length) % songs.length;
        loadSong(idx);
    }
})

musicPlayer.addEventListener('loadedmetadata', () => {
    //progress.max = musicPlayer.duration;
});

progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * musicPlayer.duration;
    musicPlayer.currentTime = seekTime;
});

function play() {
    try {
        musicPlayer.play();
    } catch(err) {
        console.log('Browser denied autoplay');
    }
    playbackPause.innerHTML = '<span class="material-symbols-outlined">pause</span>';
}

function pause() {
    musicPlayer.pause();
    playbackPause.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
}

playbackPause.addEventListener('click', () => {
    if (musicPlayer.paused) {
        play();
    } else {
        pause();
    }
});

playbackNext.addEventListener('click', () => {
    idx = (idx + 1) % songs.length;
    loadSong(idx);
});

playbackPrev.addEventListener('click', () => {
    idx = (idx - 1 + songs.length) % songs.length;
    loadSong(idx);
});

loadSong(idx);