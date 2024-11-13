// Main JavaScript for handling silence skipping, speed control, volume control, fullscreen control, rewind/forward control, auto-rotate, playlist control, auto-repeat, skip invalid videos, and timed transitions
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("videoPlayer");
    const toggleButton = document.getElementById("toggleSilenceSkip");
    const speedUpButton = document.getElementById("speedUp");
    const speedDownButton = document.getElementById("speedDown");
    const volumeControl = document.getElementById("volumeControl");
    const fullscreenButton = document.getElementById("fullscreenButton");
    const rewindButton = document.getElementById("rewindButton");
    const forwardButton = document.getElementById("forwardButton");
    const videoList = document.getElementById("videoList");
    const videoItems = videoList.getElementsByTagName("li");
    const transitionTimeInput = document.getElementById("transitionTime");
    
    let isSilenceSkippingEnabled = false;
    let transitionTimeout;

    // Placeholder for silence detection function
    function skipSilence() {
        if (isSilenceSkippingEnabled) {
            console.log("Silence detected, skipping...");
            // Implement silence skipping logic here
        }
    }

    // Toggle silence skipping feature
    toggleButton.addEventListener("click", function() {
        isSilenceSkippingEnabled = !isSilenceSkippingEnabled;
        toggleButton.textContent = isSilenceSkippingEnabled ? "Disable Silence Skipping" : "Enable Silence Skipping";
        console.log("Silence skipping is now", isSilenceSkippingEnabled ? "enabled" : "disabled");
    });

    // Control playback speed
    speedUpButton.addEventListener("click", function() {
        video.playbackRate += 0.25;
        console.log("Speed increased to", video.playbackRate);
    });

    speedDownButton.addEventListener("click", function() {
        video.playbackRate = Math.max(0.25, video.playbackRate - 0.25);
        console.log("Speed decreased to", video.playbackRate);
    });

    // Control volume
    volumeControl.addEventListener("input", function() {
        video.volume = volumeControl.value;
        console.log("Volume set to", video.volume);
    });

    // Fullscreen mode
    fullscreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
        console.log("Fullscreen mode activated");
    });

    // Rewind and forward controls
    rewindButton.addEventListener("click", function() {
        video.currentTime = Math.max(0, video.currentTime - 10);
        console.log("Rewinded 10 seconds. Current time:", video.currentTime);
    });

    forwardButton.addEventListener("click", function() {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        console.log("Forwarded 10 seconds. Current time:", video.currentTime);
    });

    // Auto-rotate for portrait videos
    function rotateVideoIfNeeded() {
        if (video.videoWidth < video.videoHeight) {
            video.style.transform = "rotate(90deg)";
            video.style.width = "100vh";
            video.style.height = "100vw";
            console.log("Video rotated to landscape mode for optimal view.");
        } else {
            video.style.transform = "none";
            console.log("Video is already in landscape mode.");
        }
    }

    video.addEventListener("loadedmetadata", rotateVideoIfNeeded);

    // Playlist functionality
    Array.from(videoItems).forEach(item => {
        item.addEventListener("click", function() {
            video.src = item.getAttribute("data-video-src");
            video.play();
            startTransitionTimer();
            console.log("Playing:", item.textContent);
        });
    });

    // Auto-repeat and skip invalid videos
    video.addEventListener("error", function() {
        console.log("Error loading video:", video.src);
        playNextVideo();
    });

    video.addEventListener("ended", playNextVideo);

    function playNextVideo() {
        const currentIndex = Array.from(videoItems).findIndex(item => item.getAttribute("data-video-src") === video.src);
        const nextIndex = (currentIndex + 1) % videoItems.length;

        if (nextIndex === 0) {
            console.log("Restarting playlist from the beginning.");
        }

        video.src = videoItems[nextIndex].getAttribute("data-video-src");
        video.play();
        startTransitionTimer();
        console.log("Playing:", videoItems[nextIndex].textContent);
    }

    // Timed transitions between videos
    function startTransitionTimer() {
        clearTimeout(transitionTimeout);
        const transitionTime = parseInt(transitionTimeInput.value, 10) * 1000; // Convert seconds to milliseconds
        transitionTimeout = setTimeout(playNextVideo, transitionTime);
        console.log("Transition timer set for", transitionTime / 1000, "seconds");
    }

    // Check for silence in video playback
    video.addEventListener("play", function() {
        console.log("Video started");
        setInterval(skipSilence, 5000);
        startTransitionTimer();
    });
});
