function createVideo(src, wrapper) {
    const video = document.createElement('video');

    video.setAttribute('id', 'my-video')
    video.setAttribute('class', 'video-js vjs-big-play-centered vjs-paused my-video-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-user-active')
    video.setAttribute('controls', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('preload', 'auto');
    video.setAttribute('poster', 'about:blank');
    video.setAttribute('width', '100%');
    video.setAttribute('height', '100%');
    video.setAttribute('data-setup', '{"liveui": true}');

    const source = document.createElement('source');
    source.src = src;
    // source.type = 'application/vnd.apple.mpegurl'; Does not work on Webkit (wtf?)
    source.type = 'application/x-mpegURL';

    video.appendChild(source);
    wrapper.appendChild(video);
    videojs(video);
};