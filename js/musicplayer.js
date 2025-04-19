const songs = [
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
        "name": "LCDLSD",
        "artist": "Artifyber",
        "album": "SPACED OUT",
        "src": "/songs/LCDLSD.mp3"
    },
    {
        "name": "My Life is a Lie",
        "artist": "Mere Notilde",
        "album": "Rotti",
        "src": "/songs/song 46.wav"
    },
    {
        "name": "Overreach",
        "artist": "Mere Notilde",
        "album": "Rotti",
        "src": "/songs/song 48.wav"
    },
    {
        "name": "Your Love is a Lie",
        "artist": "Mere Notilde",
        "album": "Rotti",
        "src": "/songs/song 49.wav"
    },
    {
        "name": "Terrific",
        "artist": "Mere Notilde",
        "album": "Terrific",
        "src": "/songs/Terrific.wav"
    },
    {
        "name": "愛でる - グレープフルーツ",
        "artist": "Mere Notilde",
        "album": "Rotti",
        "src": "/songs/song 50.wav"
    },
    {
        "name": "あいこ, あいこ",
        "artist": "Mere Notilde",
        "album": "Rotti",
        "src": "/songs/song 51.wav"
    },
    {
        "name": "GIRL HELL 1999",
        "artist": "femtanyl",
        "album": "CHASER",
        "src": "/songs/GIRL HELL 1999.mp3"
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