async function createAudio() {
    const audioElement = document.createElement('audio');
    audioElement.src = "/media/sfx/ps1.ogg";
    audioElement.id = "windows93audio";
    audioElement.volume = 0.5;
    // audioElement.playbackRate = 1;

    const imageElement = document.createElement('img');
    imageElement.src = "/media/93logo.png";
    imageElement.style.zIndex = 151;

    const CONTAINER = document.createElement('div');
    CONTAINER.style.zIndex = 150;
    CONTAINER.style.width = "100vw";
    CONTAINER.style.height = "100vh";
    CONTAINER.style.position = "absolute";
    CONTAINER.style.left = 0;
    CONTAINER.style.top = 0;
    CONTAINER.style.display = "flex";
    CONTAINER.style.justifyContent = "center";
    CONTAINER.style.alignItems = "center";
    CONTAINER.style.backgroundColor = "#000";
    CONTAINER.style.opacity = "0";
    CONTAINER.style.transition = "opacity 7s ease-in-out";

    CONTAINER.appendChild(imageElement);
    document.body.appendChild(CONTAINER);
    document.body.appendChild(audioElement);

    // Force a reflow before setting opacity to 1
    void CONTAINER.offsetHeight; // this line ensures the opacity transition is triggered

    // Now trigger the fade-in
    requestAnimationFrame(() => {
        CONTAINER.style.opacity = "1";
    });

    // Wait for audio to start
    try {
        await audioElement.play();
    } catch (err) {
        console.error("Audio playback failed:", err);
    }

    // Cleanup after audio ends
    audioElement.addEventListener('ended', () => {
        audioElement.remove();
        CONTAINER.remove();
        window.open('https://www.windows93.net/', '_blank');
    });
}

document.getElementById("windows93").addEventListener("click", (event) => {
    event.preventDefault();
    if (!document.getElementById("windows93audio")) {
        createAudio();
    }
});
