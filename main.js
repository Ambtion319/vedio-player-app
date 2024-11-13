// Main JavaScript for handling silence skipping, speed control, volume control, and fullscreen control
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("videoPlayer");
    const toggleButton = document.getElementById("toggleSilenceSkip");
    const speedUpButton = document.getElementById("speedUp");
    const speedDownButton = document.getElementById("speedDown");
    const volumeControl = document.getElementById("volumeControl");
    const fullscreenButton = document.getElementById("fullscreenButton");
    
    let isSilenceSkippingEnabled = false;

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
            video.webkitRequestFullscreen(); // For Safari compatibility
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen(); // For Microsoft Edge
        }
        console.log("Fullscreen mode activated");
    });

    // Check for silence in video playback
    video.addEventListener("play", function() {
        console.log("Video started");
        setInterval(skipSilence, 5000);
    });
});
