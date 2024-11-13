// Main JavaScript for handling silence skipping and speed control
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("videoPlayer");
    const toggleButton = document.getElementById("toggleSilenceSkip");
    const speedUpButton = document.getElementById("speedUp");
    const speedDownButton = document.getElementById("speedDown");
    
    let isSilenceSkippingEnabled = false;

    // Placeholder for silence detection function
    function skipSilence() {
        if (isSilenceSkippingEnabled) {
            console.log("Silence detected, skipping...");
            // Here, you would implement logic to skip forward
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
        video.playbackRate += 0.25; // Increase speed by 0.25
        console.log("Speed increased to", video.playbackRate);
    });

    speedDownButton.addEventListener("click", function() {
        video.playbackRate = Math.max(0.25, video.playbackRate - 0.25); // Decrease speed, minimum 0.25
        console.log("Speed decreased to", video.playbackRate);
    });

    // Listen for video play event and periodically check for silence
    video.addEventListener("play", function() {
        console.log("Video started");
        setInterval(skipSilence, 5000); // Adjust timing as needed
    });
});
